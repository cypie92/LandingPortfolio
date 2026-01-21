# Deployment Guide

Your project consists of two parts:
1.  **The Portfolio** (`index.html` and related files) - Static HTML, CSS.
2.  **HardwarePro App** (`hardware-pro` folder) - A dynamic Next.js Application with Supabase Auth and Database.

## ⚠️ Important Note
Because **HardwarePro** uses secure Server Actions (for Login, Registration, Profile updates) and Server Components (for fetching data securely), it **cannot** be hosted on GitHub Pages directly (which only supports static files).

## Recommended Deployment Strategy

### Step 1: Deploy "HardwarePro" to Vercel
Vercel is the creators of Next.js and offers free hosting that supports all the features we built.

1.  Push your code to a GitHub Repository.
2.  Go to [Vercel.com](https://vercel.com) and Sign Up/Login.
3.  Click **"Add New..."** -> **"Project"**.
4.  Import your GitHub Repository.
5.  **Important**: In the configuration settings:
    *   **Root Directory**: Click "Edit" and select `hardware-pro`.
    *   **Environment Variables**: Copy the variables from your `.env.local` file:
        *   `NEXT_PUBLIC_SUPABASE_URL`
        *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
        *   `SUPABASE_SERVICE_ROLE_KEY`
6.  Click **Deploy**.
7.  Once finished, copy the **Domain** (e.g., `https://your-project.vercel.app`).

### Step 2: Update your Portfolio Link
1.  Open `d:\Project\Demo\index.html` in your editor.
2.  Find the **HardwarePro** card (around line 229).
3.  Change the `href` to your new Vercel URL:
    ```html
    <!-- Old -->
    <a href="hardware.html" class="card">
    
    <!-- New -->
    <a href="https://your-project.vercel.app" class="card">
    ```

### Step 3: Hosting the Portfolio
Now you can host the root folder (`d:\Project\Demo`) on GitHub Pages:
1.  Go to your GitHub Repo settings -> **Pages**.
2.  Select `main` branch and `/` (root) folder.
3.  Your portfolio will be live at `https://your-username.github.io/repo-name`.
4.  The "HardwarePro" card will allow users to launch the full app!
