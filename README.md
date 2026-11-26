# ELEV8vx — Official Website & Platform

**Elevate Your Digital Presence.**  
*Web Development · Software · AI Solutions*

---

## 🌟 Overview & Key Features

This repository contains the complete production-ready source code for **ELEV8vx**, designed to help businesses build credibility, scale their online presence, and convert visitors into paying clients with clean, high-performance web engineering.

### Included Features & Architecture:
1. **Interactive Team 3D Flip Cards:**
   - Featuring **Langston Owens** (Founder & Principal Developer — *Engineering & Design*) and **Dimitry Gioldasis** (Sales & Client Management).
   - Smooth 3D card flip transitions with keyboard accessibility and mobile-optimized responsive layout.

2. **Project Intake Architecture & Form Submission:**
   - Multi-step intake flow routing directly via Resend to `lowensweb@gmail.com`.
   - Client and business requirements capture with automated prompt generation for rapid prototyping.

3. **Multi-Channel Contact Suite:**
   - One-click copy email button.
   - Direct Gmail compose CTA button with pre-filled inquiry prompts.
   - Mobile and default mail client fallbacks.

4. **Multi-Page Architecture:**
   - `index.html`: Main landing page, interactive team grid, process roadmap, intake form, and contact section.
   - `about.html`: Detailed team background, company mission, and client collaboration philosophy.
   - `work.html`: Portfolio showcase featuring customized industry builds.

5. **Backend & Deployment Ready:**
   - Node.js Express server (`server.js`) with Resend API route (`/api/send`).
   - Seamlessly deployable to Vercel, Netlify, or custom VPS.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your [Resend API Key](https://resend.com/api-keys):
```env
RESEND_API_KEY=re_your_api_key_here
PORT=8000
```

### 3. Run Locally
```bash
npm run dev
```
Visit `http://localhost:8000` (or your local IP for mobile testing, e.g. `http://10.0.0.4:8000`).

---

## 📄 License
© 2026 ELEV8vx. All rights reserved.
