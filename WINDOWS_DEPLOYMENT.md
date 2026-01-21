# Windows Server Deployment Guide (io-mech.com)

Since you already have `io-mech.com` setup on your Windows Server 2012, we will deploy **HardwarePro** as a new **Subdomain** (e.g., `hardware.io-mech.com`). This isolates the Next.js app from your other projects (`inventory`, `forizon`).

## Prerequisites (Verified)
-   **Node.js 18+**: Installed.
-   **IIS + URL Rewrite**: Installed.
-   **Application Request Routing (ARR)**: **REQUIRED** for the proxy to work.
    *   *Check*: Open IIS Manager -> Click Server Node -> "Application Request Routing Cache" -> Server Proxy Settings (on right) -> **Enable proxy**.

---

## Step 1: DNS Setup
1.  Go to your Domain Registrar (where you bought `io-mech.com`).
2.  Add a new **A Record**:
    *   **Host**: `hardware`
    *   **Value**: [Your Server's Public IP]
    *   *(This enables `hardware.io-mech.com`)*

---

## Step 2: Prepare the Application
1.  On your local machine, ensuring `next.config.ts` has `output: "standalone"`.
2.  Run build:
    ```powershell
    npm run build
    ```
3.  **Prepare the Deployment Folder** (`standalone`):
    *   Go to `.next/standalone`.
    *   **Copy** `.next/static` folder -> Paste into `.next/standalone/.next/static`.
    *   **Copy** `public` folder -> Paste into `.next/standalone/public`.
    *   **Copy** `.env.local` -> Paste into `.next/standalone/.env.local`.
    *   **Copy** `web.config` -> Paste into `.next/standalone/web.config`.

---

## Step 3: Deploy to Server
1.  **Transfer Files**: Copy the entire contents of the prepared `standalone` folder to your server, e.g.:
    *   `C:\inetpub\wwwroot\hardware.io-mech.com`
2.  **Install Dependencies** (Process Manager):
    ```powershell
    npm install -g pm2
    ```
3.  **Start the App** (Port 3001 to avoid conflicts):
    ```powershell
    cd C:\inetpub\wwwroot\hardware.io-mech.com
    pm2 start server.js --name "hardware-pro" -- -p 3001
    ```
    *(Note: We use port 3001 just in case 3000 is used by another app. If 3000 is free, you can use that).*

---

## Step 4: Configure IIS (Reverse Proxy)
1.  **Open IIS Manager**.
2.  **Add Website**:
    *   **Site name**: `hardware.io-mech.com`
    *   **Physical path**: `C:\inetpub\wwwroot\hardware.io-mech.com`
    *   **Binding**:
        *   Type: `http`
        *   Host name: `hardware.io-mech.com`
        *   Port: `80`
3.  **Configure Proxy Rule** (web.config):
    *   Since I provided a `web.config`, IIS should pick it up.
    *   **Important**: If you changed the port to **3001** in Step 3, you must update `web.config` to match:
        ```xml
        <action type="Rewrite" url="http://localhost:3001/{R:1}" />
        ```

---

## Step 5: HTTPS / SSL (Optional but Recommended)
Since your other sites are HTTPS (`https://inventory...`), you likely use **Win-ACME** or a similar tool.
1.  Run your Certificate Manager (e.g., `wacs.exe`).
2.  Create a fresh certificate for `hardware.io-mech.com`.
3.  IIS Binding will update to port 443 automatically.

---

## Step 6: Connect Portfolio
I have updated your `index.html` locally to point to:
`https://hardware.io-mech.com`

Upload this updated `index.html` to your main website location (e.g., the folder serving `www.io-mech.com` or root).

## Summary
1.  **DNS**: `hardware.io-mech.com` -> Server IP.
2.  **Node**: Run app on Port 3001.
3.  **IIS**: New Site `hardware.io-mech.com` -> Reverse Proxy to `localhost:3001`.
