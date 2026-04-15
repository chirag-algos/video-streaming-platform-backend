## 🚀 COMPLETE RAILWAY DEPLOYMENT GUIDE - BACKEND ONLY

**Your GitHub Username:** `chirag-algos`  
**Backend Repository:** `video-streaming-backend`  
**Backend Path:** `d:\project\backend`  
**Deployment Time:** ~20 minutes
**Scope:** Backend only (No frontend files)

---

## ⚠️ IMPORTANT: Backend-Only Deployment

**What we're doing:**
- ✅ Uploading ONLY backend code to GitHub
- ✅ Creating backend-only repository: `video-streaming-backend`
- ✅ Deploying backend to Railway
- ❌ NOT uploading frontend (AKfrontend folder stays local)
- ❌ NOT uploading frontend to this GitHub repo

**Why separate?**
- Clean separation of concerns
- Backend can be reused by multiple frontends
- Easy to scale each independently
- Deploy backend without worrying about frontend code

---

## ℹ️ ABOUT TEMP FILES IN .gitignore

```
.gitignore ignores: public/temp/
(These files are NOT pushed to GitHub)

When code runs on Railway:
1. Code is deployed WITHOUT temp folder
2. First video upload creates temp folder automatically
3. Video is processed, uploaded to Cloudinary
4. Temp file deleted after upload
5. Everything works! ✅

This is CORRECT behavior because:
- Temp files are not needed in Git
- They're generated during runtime
- They're cleaned up after use
- Saves storage space
```

---

## 📋 STEP-BY-STEP DEPLOYMENT (Follow in Order)

---

## **STEP 1: Verify Your Code Works Locally**

**Time: 5 minutes**

```bash
# Open PowerShell/Terminal
cd d:\project\backend

# Start your backend
npm run dev

# You should see:
# ✅ Environment variables validated
# ✅ Nodemailer is ready to send emails
# ✅ Successfully connected to MongoDB
# 🚀 Server running on port 5000

# Press Ctrl+C to stop
```

**✅ If you see these messages → Move to Step 2**

---

## **STEP 2: Initialize Git (Backend Only)**

**Time: 2 minutes**

```bash
# Go to BACKEND folder ONLY
cd d:\project\backend

# Check if Git is already initialized
git status

# If error "not a git repository", run this:
git init

# Configure Git with your details
git config user.email "devsingh09072004@gmail.com"
git config user.name "Deepak Singh"

# Verify configuration
git config --list
```

**✅ Git initialized → Move to Step 3**

---

## **STEP 3: Create .gitignore to Protect Secrets (Backend Only)**

**Time: 1 minute**

```bash
# Make sure you're in backend folder
cd d:\project\backend

# Check if .gitignore exists
ls -la | grep gitignore

# If it exists, good! If not, create it below
```

**Create file: `d:\project\backend\.gitignore`**

```text
# Environment Variables (NEVER commit these!)
.env
.env.local
.env.development.local
.env.production.local
.env.production

# Dependencies
node_modules/
npm-debug.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Logs
logs
*.log

# Temporary files and uploads (auto-created during runtime)
public/temp/
*.tmp
*.temp

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Build outputs
dist/
build/

# Testing
coverage/
.nyc_output/
```

**✅ .gitignore created → Move to Step 4**

---

## **STEP 4: Add Backend Files to Git (Except Secrets)**

**Time: 2 minutes**

```bash
# Make sure you're in backend folder
cd d:\project\backend

# Add all backend files
git add .

# Check what will be committed
git status

# IMPORTANT: Look for these and make sure they DON'T appear:
# ❌ .env
# ❌ .env.production
# ❌ node_modules/
# ❌ public/temp/

# If you see these, they should show as "ignored by .gitignore"
# This is correct!

# Commit the code
git commit -m "Initial commit: Backend API ready for deployment"

# You should see something like:
# create mode 100644 app.js
# create mode 100644 package.json
# create mode 100644 config/security.js
# ... etc
```

**✅ Code committed → Move to Step 5**

---

## **STEP 5: Create Backend-Only GitHub Repository**

**Time: 3 minutes**

```bash
# Go to https://github.com/new

# Fill in these details:
# Repository name: video-streaming-backend
# Description: YouTube Clone Backend API (Node.js/Express)
# Visibility: Public
# Initialize repository: NO (don't check - you have code)

# Click "Create Repository"
```

**GitHub shows you these commands after creation:**

```bash
# Copy the commands from GitHub (they'll look like this):
git branch -M main
git remote add origin https://github.com/chirag-algos/video-streaming-backend.git
git push -u origin main

# Run them in your terminal:
git branch -M main
git remote add origin https://github.com/chirag-algos/video-streaming-backend.git
git push -u origin main

# Wait for upload... you'll see:
# Counting objects: ...
# Writing objects: ...
# Total ... (delta ...), reused ...
# To https://github.com/chirag-algos/video-streaming-backend.git
#  * [new branch]      main -> main
```

**✅ Backend on GitHub → Move to Step 6**

**Verify on GitHub:**
1. Go to https://github.com/chirag-algos/video-streaming-backend
2. You should see only backend files (app.js, package.json, controllers/, models/, routes/, etc.)
3. NO `.env` file should appear
4. NO frontend files should appear

---

## **STEP 6: Create Railway Account**

**Time: 2 minutes**

```bash
# Go to https://railway.app
# Click "Create Account"
# Sign up with GitHub (click GitHub icon)
# Authorize Railway
# Click "Start for free"
```

**✅ Railway account ready → Move to Step 7**

---

## **STEP 7: Connect Backend GitHub to Railway & Deploy**

**Time: 3 minutes**

1. On Railway dashboard, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Click **"Authorize"** to connect GitHub
4. Select your username: `chirag-algos`
5. Find repository: `video-streaming-backend` (Backend only!)
6. Click to deploy

**Railway starts building automatically!**

---

## **STEP 8: Add Environment Variables to Railway**

**Time: 5 minutes**

While Railway is building:

1. In Railway dashboard, find your service (called `backend` or similar)
2. Click **"Variables"** tab
3. Click **"Add Variable"** button
4. Paste each variable one by one:

```
NODE_ENV
production

PORT
5000

mongooseKey
mongodb+srv://streamingApp:stream%40123@cluster0.u3wb7fm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&family=4

JWT_SECRET
thisisbrutalitysecretkey

JWT_EXPIRES_IN
7d

EMAIL_USER
devsingh09072004@gmail.com

EMAIL_PASS
isqphsxweaeoghtw

EMAIL_CHECK
chirag66new@gmail.com

cloudinaryName
dtadnapue

cloudinarykey
342544229524642

cloudinarySecret
r6Lh-OfxwNl5RkCtg-selY1xaDc

ai_key
AIzaSyDjBA_2HUzUMbXXLqlI7AJ4olQ9A2iyonI

corsOrigin
http://localhost:5173,https://YOUR-FRONTEND-URL.railway.app
```

**Note:** For `corsOrigin`, use your frontend URL after you deploy it. For now, you can update it later.

**After adding all variables:**
- Click **"Save"** or **"Deploy"** if prompted
- Railway will restart with new variables

**✅ Variables added → Move to Step 9**

---

## **STEP 9: Wait for Deployment to Complete**

**Time: 2-3 minutes**

1. Go to **"Deployments"** tab
2. Watch status change from "Building" → "Success"

**When it says "Success" ✅:**

1. Click on the deployment
2. Go to **"Logs"** tab
3. Look for these success messages:

```
✅ Environment variables validated
✅ Nodemailer is ready to send emails
✅ Successfully connected to MongoDB
🚀 Server running on port 5000
📍 Environment: production
💾 Database: Connected
```

**✅ If you see these → Deployment successful!**

---

## **STEP 10: Get Your Public URL**

**Time: 1 minute**

1. Go to **"Settings"** tab
2. Find **"Railway Domains"** section
3. Copy your URL (looks like: `https://videostreamingapp-prod.railway.app`)

This is your live backend URL! 🎉

---

## **STEP 11: Test Your Live API**

**Time: 2 minutes**

**Option A: Using Terminal**

```bash
# Replace URL with your actual Railway URL
curl https://videostreamingapp-prod.railway.app/health

# Expected response:
# {"status":"ok","timestamp":"2026-04-15T...","environment":"production"}
```

**Option B: Using Browser**

```
Go to: https://videostreamingapp-prod.railway.app/health
You should see: {"status":"ok"...}
```

**Option C: Using Postman**

```
GET https://videostreamingapp-prod.railway.app/health
Click "Send"
Should see: 200 OK with JSON response
```

✅ If you get a response → API is live!

---

## **STEP 12: Test User Registration (Optional)**

**Time: 2 minutes**

```bash
# Replace URL with your actual Railway URL
curl -X POST https://videostreamingapp-prod.railway.app/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "TestPassword123"
  }'

# Expected response:
# {"success":true,"message":"OTP sent to email!"}

# Check your email (test@example.com) for OTP
# Then call verify-otp endpoint to complete verification
```

✅ If registration works → Email system works!

---

## **STEP 13: Update Deployment for Future Changes**

**Time: Whenever you make changes**

```bash
# Make changes to your backend code
# Test locally: npm run dev

# Then in backend folder:
cd d:\project\backend
git add .
git commit -m "Updated: Description of changes"
git push

# Railway automatically detects changes and redeploys!
# Check Railway dashboard for "Deployments" to see progress
```

---

## ✅ DEPLOYMENT COMPLETE!

Your backend is now LIVE! 🎉

**Your public URL:**
```
https://videostreamingapp-prod.railway.app
```

**What you can do now:**

1. ✅ Call API endpoints from anywhere
2. ✅ Deploy frontend to Railway
3. ✅ Connect frontend to this backend
4. ✅ Share your app with others
5. ✅ Make updates (git push → auto-redeploy)

---

## 🔄 ABOUT TEMP FILES - DETAILED EXPLANATION

### **Why public/temp/ is in .gitignore:**

```
Local Development:
├─ public/
│  └─ temp/  ← Files created during uploads
│     └─ video-12345.mp4 (temporary, removed after processing)

When pushed to Git:
├─ .gitignore blocks: public/temp/
└─ Result: temp folder NOT in GitHub ✅
```

### **What happens on Railway:**

```
Railway deploys code WITHOUT temp folder
    ↓
User uploads video
    ↓
Code creates: public/temp/ folder (automatic!)
    ↓
Video temporarily stored there
    ↓
Code uploads to Cloudinary
    ↓
Temp file deleted
    ↓
public/temp/ becomes empty (ready for next upload)
```

### **Why this is GOOD:**

✅ Temp files don't need version control  
✅ Saves GitHub storage space  
✅ Avoids "large file" warnings  
✅ Keeps repository clean  
✅ Railway creates it automatically  
✅ Works perfectly! ✅

### **If temp folder doesn't auto-create:**

Railway will create it on first upload. If not:

Add this to app.js to auto-create it:

```javascript
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const tempDir = path.join(__dirname, 'public', 'temp');

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
    console.log("✅ Temp directory created");
}
```

---

## 🆘 TROUBLESHOOTING

### **Problem: Deployment fails**

```
Check: Railway > Deployments > Failed deployment > Logs
Look for error message
Common issues:
- Missing environment variable → Add to Railway Variables
- Wrong PORT number → Remove, let Railway assign it
- MongoDB connection → Check credentials in mongooseKey
```

### **Problem: Can't push to GitHub**

```bash
# Error: "permission denied"
# Solution: Generate GitHub token

git remote set-url origin https://TOKEN@github.com/chirag-algos/video-streaming-app.git
git push -u origin main
```

### **Problem: .env file appeared in GitHub**

```bash
# Delete it immediately!
git rm --cached .env .env.production
git commit -m "Remove env files"
git push

# Then regenerate all passwords (they're now public!)
```

### **Problem: Email not sending on Railway**

```
Check in Railway logs:
- EMAIL_USER set correctly?
- EMAIL_PASS is 16-char app password (not Gmail password)?
- Try: https://myaccount.google.com/apppasswords to regenerate
```

---

## 📊 DEPLOYMENT CHECKLIST (Final Verification)

- [ ] Code runs locally with `npm run dev`
- [ ] Git initialized in backend folder
- [ ] .gitignore created (no .env files committed)
- [ ] Code pushed to GitHub at: https://github.com/chirag-algos/video-streaming-backend
- [ ] Railway account created
- [ ] GitHub connected to Railway
- [ ] All environment variables added to Railway
- [ ] Deployment shows "Success" status
- [ ] Logs show all ✅ messages
- [ ] Health endpoint returns 200
- [ ] Public URL accessible
- [ ] Backend only (no frontend files) ✅
- [ ] temp files won't cause problems ✅

---

## 🎉 YOU'RE DONE!

Your backend is now:
- ✅ Deployed to Railway
- ✅ Accessible via public URL  
- ✅ Auto-redeploys on code changes
- ✅ Ready for frontend connection
- ✅ Ready for production use

**Next Step:** Deploy frontend similarly and connect to this backend!

---

**Questions during deployment? Refer back to relevant section or ask for help!**

**Total Deployment Time: ~20 minutes** ⏱️
