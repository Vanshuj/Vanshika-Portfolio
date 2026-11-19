# Vanshika-Portfolio

> **VANSHiKA JAIN — Full-Stack Developer & Software Engineer Portfolio**  
> 3D Liquid Crystal Glass UI × Clean Architecture × Systems Engineering  
> Specializing in MERN Stack, Enterprise Java Backend (Spring Boot), RESTful APIs, and distributed systems.

---

## 🎨 Visual Identity & Architecture Highlights

- **Aesthetic**: Soft pastel environment (`#DCD5F5` Lavender, `#D5E8F5` Powder Blue, `#D7EBDD` Mint, `#F6DFD2` Soft Peach, `#F5EDCE` Butter Yellow, `#252831` Deep Ink).
- **Materiality**: Liquid glass panels with backdrop blur, specular highlights, and ambient light refractions.
- **Visual Anchor**: Real-time 3D Liquid Glass Refractive Sculpture built with Three.js (interactive mouse tracking & responsive canvas fallback).
- **Typography**: Space Grotesk (Editorial Display), Inter (Clean Body), IBM Plex Mono (Technical Code & Monospace Data).
- **Data Architecture**: Centralized, single-source data in `src/data/` (`profile.js`, `projects.js`, `skills.js`, `experience.js`, `certificates.js`, `codingPractice.js`, `developmentJournal.js`).
- **Privacy Protection**: Personal phone numbers and private addresses are strictly excluded from public display. Direct inquiries are handled securely via protected email copying and interactive contact dispatch.
- **ATS Resume**: Built-in digital resume viewer with one-click print and PDF export styled for ATS parsing.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📦 One-Click Deployment to GitHub Pages

This portfolio is pre-configured with relative base paths (`./`) and an automated **GitHub Actions** deployment pipeline.

### Option A: Automatic Deployment via GitHub Actions (Recommended)

1. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "feat: complete pastel liquid glass portfolio"
   ```
2. Connect to your GitHub repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/Vanshuj/portfolio.git
   git push -u origin main
   ```
3. In your GitHub repository settings:
   - Navigate to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
   - Your site will automatically build and deploy within 1–2 minutes!

### Option B: Manual Static Build

```bash
npm run build
```
The output will be placed in the `dist/` directory, ready to deploy to GitHub Pages, Vercel, Render, or Netlify.

---

## 🖼️ Media & Live Website Links

All project content is maintained in `src/data/projects.js`.

1. **Add Screenshots / Demos**:
   - Place media files in `public/assets/projects/` or `public/videos/`.
   - Update `screenshot` or `videoUrl` in `src/data/projects.js`.

2. **Add Live Website Links**:
   - In `src/data/projects.js`, locate `demoUrl` and insert your live URL:
     ```javascript
     demoUrl: "https://pixel-arena-1.onrender.com",
     ```

---

## 🔒 Privacy & Personal Details

- The portfolio defaults to **high privacy**. Phone numbers are never exposed publicly.
- All contact information can be updated or toggled in `src/data/profile.js`.

---

## 📄 License

MIT © [VANSHiKA JAIN](https://github.com/Vanshuj)
