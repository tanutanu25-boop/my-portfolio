# Tanu Thakur Portfolio

React + Vite portfolio.

## Setup
1. Copy your resume to `public/Tanu_Thakur_Resume.pdf` (both Download Resume buttons serve it as `Tanu_Thakur_Resume.pdf`).
2. `npm install`, then `npm run dev`.

## Adding images
Images are static files in `public/images/`, listed in `public/images/manifest.json`. Until a file exists, a neutral placeholder is shown (never a fake screenshot).

**Easiest: use the built-in uploader (local dev only).**
- Run `npm run dev`. A "Profile photograph" control appears under the hero photo.
- Open any project card; a "Manage images" panel appears with a main screenshot slot and four gallery slots.
- Pick a JPG, JPEG, PNG or WebP (max 8 MB), check the preview, then press Save image. Replace and Remove work the same way.
- Files are written to `public/images/` as `profile-tanu.<ext>`, `glow-and-grace.<ext>`, `colab-sphere.<ext>`, `student-feedback.<ext>`, `thinkspark.<ext>`, `interntrack.<ext>`, `parakh.<ext>` (gallery images add `-2` to `-5`). The extension matches the file type you upload.
- Commit `public/images/` (including `manifest.json`) and redeploy.

**Manual alternative:** drop files with those names into `public/images/` and add an entry per file to `manifest.json`, e.g. `"glow-and-grace": { "file": "glow-and-grace.png", "v": 1 }`.

The uploader exists only in `npm run dev`. The deployed site has no upload endpoint, so visitors cannot change images. To edit images from the live site you would need a real backend or storage service (S3, Cloudinary, etc.), which this project does not include.

## Content
Text, links and projects live in `src/data.js`.

## Contact form
No backend. The form opens the visitor's email app with the message prefilled. To send directly, connect EmailJS, Formspree or your own API in `src/sections/Contact.jsx`.
