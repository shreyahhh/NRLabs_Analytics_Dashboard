# NeuRazor Analytics Dashboard

A separate Analytics Dashboard application for viewing aggregate candidate performance by Base Game, regardless of Assessment or Variant.

## Features

- **Admin Authentication**: Secure login with Supabase authentication and admin role verification
- **Base Game Selection**: Choose from 9 different cognitive games to analyze
- **Real-time Statistics**: Dynamic calculation of Mean and Standard Deviation based on active filters
- **Advanced Filtering**: 
  - Time Threshold filter to exclude outliers (e.g., attempts under 30 seconds)
  - Score Range filter (Min/Max)
  - Toggle to show/hide statistical outliers
- **Data Visualization**: Score distribution histogram/area chart using Recharts
- **Candidate Data Table**: Detailed listing with outlier highlighting

## Tech Stack

- **React 19** + **Vite** - Modern frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Composable charting library
- **Supabase Client** - Authentication only (uses same project as neurazor-mvp)
- **React Router** - Client-side routing

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   
   These should match the same Supabase project used in `neurazor-mvp`.

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── AnalyticsView.jsx    # Main analytics view with filters, stats, graph, table
│   ├── GameSelector.jsx     # Base game selection component
│   └── ProtectedRoute.jsx  # Route protection with admin check
├── contexts/
│   └── AuthContext.jsx      # Authentication context with admin role checking
├── data/
│   └── mockData.ts         # Mock data generator (50+ candidates per game)
├── lib/
│   └── supabase.js         # Supabase client configuration
├── pages/
│   ├── Dashboard.jsx        # Main dashboard page
│   └── Login.jsx           # Login page
├── App.jsx                  # Main app component with routing
└── main.jsx                # Entry point
```

## Available Base Games

1. **Stroop Test** - Cognitive flexibility test
2. **Mental Math Sprint** - Mental arithmetic speed test
3. **Creative Uses** - Creativity and originality assessment
4. **Scenario Challenge** - Leadership scenario responses
5. **Card Flip Challenge** - Memory and pattern recognition
6. **Sign Sudoku** - Pattern logic puzzle
7. **Debate Mode** - Argumentation skills
8. **Interview Mode** - Behavioral interview responses
9. **BART Test** - Risk-taking behavior assessment

## Authentication

The application uses Supabase authentication and checks for admin role in the `users` table. Only users with `role = 'admin'` can access the dashboard.

## Mock Data

Currently, the application uses mock data generated in `src/data/mockData.ts`. Each game type has 40-58 candidate records with realistic performance metrics including:
- Candidate name
- Score (0-100)
- Time taken (seconds)
- Completion date
- Game-specific metadata (accuracy rate, attempts, etc.)

## Future Enhancements

- Connect to real Supabase data from `game_results` table
- Export data to CSV/Excel
- Additional visualization types
- Date range filtering
- Candidate detail modal
- Comparison between games

## License

Private - NeuRazor Labs
