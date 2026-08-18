# Deploy: GitHub → Render (backend) → Vercel (frontend)

I've already made the code deploy-ready:
- Backend CORS origin and port now read from env vars (`FRONTEND_URL`, `PORT`) instead of being hardcoded to `localhost`.
- Frontend API calls now use `VITE_API_URL` in production, falling back to the local Vite proxy in dev.
- Added `render.yaml` (Render blueprint) and `vercel.json`.

**Important — H2 database**: this project uses H2, an **in-memory** database. Every time the Render service restarts (including free-tier spin-down after inactivity), all data resets to the 4 seeded employees. That's fine for a demo; if you need persistent data, swap in a real Postgres/MySQL DB later (the `application.properties` file has a commented-out MySQL block to start from).

---

## 1. Push to GitHub

```bash
cd employee-management-system
git init
git add .
git commit -m "Initial commit: employee management system"
git branch -M main
```

Create a new empty repo on GitHub (via github.com → New repository — don't initialize with a README), then:

```bash
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

---

## 2. Deploy the backend on Render

1. Go to [render.com](https://render.com) → **New +** → **Blueprint**.
2. Connect your GitHub account and select this repo. Render will detect `render.yaml` and configure the service automatically (root dir `backend`, Java runtime, build/start commands).
   - If you'd rather set it up manually instead of using the blueprint: **New +** → **Web Service** → select the repo → Root Directory: `backend` → Runtime: `Java` → Build Command: `mvn clean package -DskipTests` → Start Command: `java -jar target/*.jar`.
3. Deploy. Once live, copy the service URL, e.g. `https://employee-management-backend.onrender.com`.
4. **Don't set `FRONTEND_URL` yet** — you don't have the Vercel URL until step 3. Come back and set it after.

Note: Render's free tier spins down after inactivity, so the first request after idle can take ~30–60s to wake up.

---

## 3. Deploy the frontend on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → import the same GitHub repo.
2. Set **Root Directory** to `frontend`.
3. Vercel should auto-detect Vite (build command `npm run build`, output `dist`) via `vercel.json`.
4. Add an environment variable:
   - `VITE_API_URL` = `https://employee-management-backend.onrender.com` (your Render URL from step 2, **no trailing slash**)
5. Deploy. Copy the resulting URL, e.g. `https://your-app.vercel.app`.

---

## 4. Connect them: allow the frontend origin on the backend

Back on Render → your backend service → **Environment**:
- Add `FRONTEND_URL` = `https://your-app.vercel.app` (your Vercel URL, no trailing slash)
- Save → Render will redeploy automatically.

---

## 5. Verify

- Open `https://your-app.vercel.app` — you should see the 4 seeded employees load.
- Try adding/editing/deleting an employee to confirm the frontend can reach the backend (check the browser Network tab if something 404s or gets blocked by CORS — usually means `VITE_API_URL` or `FRONTEND_URL` has a typo or trailing slash).

Any future `git push` to `main` will auto-redeploy both Render and Vercel.
