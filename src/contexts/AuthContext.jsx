import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const checkAdminRole = async (userId) => {
    try {
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Admin role check timeout')), 3000)
      )

      const queryPromise = supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single()
        .then(result => result)

      const result = await Promise.race([queryPromise, timeoutPromise])
      const { data, error } = result

      if (error) {
        console.error('Error checking admin role:', error)
        return false
      }

      return data?.role === 'admin'
    } catch (error) {
      console.error('Error checking admin role:', error)
      return false
    }
  }

  useEffect(() => {
    let mounted = true

    // Check active session with error handling
    supabase.auth.getSession()
      .then(async ({ data: { session }, error }) => {
        if (!mounted) return
        
        if (error) {
          console.error('Error getting session:', error)
          setUser(null)
          setIsAdmin(false)
          setLoading(false)
          return
        }

        if (session?.user) {
          setUser(session.user)
          const adminStatus = await checkAdminRole(session.user.id)
          if (mounted) {
            setIsAdmin(adminStatus)
            setLoading(false)
          }
        } else {
          setUser(null)
          setIsAdmin(false)
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error('Error in getSession:', error)
        if (mounted) {
          setUser(null)
          setIsAdmin(false)
          setLoading(false)
        }
      })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return
      
      if (session?.user) {
        setUser(session.user)
        const adminStatus = await checkAdminRole(session.user.id)
        if (mounted) {
          setIsAdmin(adminStatus)
          setLoading(false)
        }
      } else {
        setUser(null)
        setIsAdmin(false)
        setLoading(false)
      }
    })

    // Fallback timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (mounted) {
        console.warn('Auth check timeout - setting loading to false')
        setLoading(false)
      }
    }, 5000)

    return () => {
      mounted = false
      clearTimeout(timeout)
      subscription?.unsubscribe()
    }
  }, [])

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    
    // Check if user is admin after login
    if (data.user) {
      const adminStatus = await checkAdminRole(data.user.id)
      setIsAdmin(adminStatus)
      if (!adminStatus) {
        await supabase.auth.signOut()
        throw new Error('Access denied. Admin role required.')
      }
    }
    
    return data
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setUser(null)
    setIsAdmin(false)
  }

  const value = {
    user,
    isAdmin,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

