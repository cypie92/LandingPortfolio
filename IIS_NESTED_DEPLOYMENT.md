# IIS Deployment Guide (happprint.io-mech.com/site)

This guide explains how to deploy the HardwarePro app directly to the `/Site` folder on your server.

## Architecture
**URL**: `https://happprint.io-mech.com/site`
**IIS Path**: `happprint` -> `Site`
**Technology**: IISNode (Node.js hosted by IIS).

## Step 1: Prepare the Code
1.  I have updated `next.config.ts` to `basePath: "/site"`.
2.  Open **Command Prompt** (on your local machine or server) and run:
    ```bash
    npm run build
    ```

## Step 2: Deploy to Server
1.  Navigate to your IIS folder for the `Site` (e.g., `C:\inetpub\wwwroot\happprint\Site` or similar).
2.  **Clear existing files** (Backup if needed).
3.  Copy **ALL** your project files (`hardware-pro` folder content) into this `Site` folder.
    *   **Exclude**: Do NOT copy `node_modules` or `.next` folders.
    *   **Include**: `package.json`, `server.js`, `web.config`, `.env.local`, `next.config.ts`, `public`, `app`, etc.

## Step 3: Install Dependencies
1.  Open PowerShell/CMD on Server.
2.  Navigate to the folder:
    ```powershell
    cd C:\inetpub\wwwroot\happprint\Site
    ```
    *(Adjust path to match your actual folder)*
3.  Install and Build:
    ```powershell
    npm install
    npm run build
    ```

## Step 4: Configure IIS
1.  Open **IIS Manager**.
2.  Expand `happprint`.
3.  Right-click the `Site` folder (or whatever folder mapped to `/site`).
4.  Select **Convert to Application**.
    *   Click OK.
5.  **Done!**
    *   The `web.config` I created handles the IISNode setup.
    *   Previously created `server.js` handles the startup.

## Verification
1.  Go to `https://happprint.io-mech.com/site`.
2.  The app should load!
