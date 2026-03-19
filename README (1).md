# Sage Ossuary Arts — Website

Gothic · Witchy · Fantasy · Bone

---

## File Structure

```
sage-ossuary-arts/
├── index.html       ← Main page
├── style.css        ← All styles
├── script.js        ← Interactivity
├── images/          ← Create this folder and add your images here
│   ├── canvas-01.jpg
│   ├── canvas-02.jpg
│   ├── canvas-03.jpg
│   ├── digital-01.jpg
│   ├── digital-02.jpg
│   ├── bone-01.jpg
│   ├── bone-02.jpg
│   ├── other-01.jpg
│   └── artist-portrait.jpg
└── README.md
```

---

## Setup

### 1. Add Your Images

Create an `images/` folder next to `index.html`.  
Add your artwork images and name them to match the `src=""` paths in `index.html`, or update the paths to match your own filenames.

**Recommended image sizes:**
- Gallery cards: **800 × 1000px** minimum (portrait or square works great)
- Featured gallery cards (larger): **1400 × 900px** landscape
- Artist portrait: **600 × 800px** portrait

### 2. Customize Your Content

Open `index.html` and find these sections to update:

- **Hero tagline** — change "Canvas · Digital · Bone & Beyond" to whatever fits
- **About / Artist bio** — replace the placeholder text with your real bio
- **Gallery card titles** — replace "Title Here" with your actual artwork names
- **Commission status** — change `open` / `limited` / `ask` classes as needed
- **Contact links** — replace the `href="#"` links with your Instagram, email, Etsy, etc.

### 3. Adding More Gallery Items

Copy a gallery card block from `index.html` and adjust:

```html
<div class="gallery-card" data-category="canvas">
  <div class="gallery-card-img-wrap">
    <img src="images/your-image.jpg" alt="Description of your artwork" loading="lazy" 
         onerror="this.parentElement.classList.add('img-placeholder')" />
    <div class="gallery-card-overlay">
      <span class="gallery-card-type">Canvas</span>
      <p class="gallery-card-title">Your Title</p>
    </div>
  </div>
</div>
```

Valid `data-category` values: `canvas`, `digital`, `bone`, `other`

Add `class="gallery-card featured"` to make a card span two columns (good for landscape pieces).

### 4. Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g., `sage-ossuary-arts`)
2. Push all your files to the `main` branch
3. Go to **Settings → Pages**
4. Set source to **Deploy from a branch** → `main` → `/ (root)`
5. Your site will be live at `https://yourusername.github.io/sage-ossuary-arts/`

**Custom domain** (optional): Add a `CNAME` file to your repo containing just your domain, e.g. `sageossuaryarts.com`, then configure your DNS.

---

## Customization Tips

- **Colors** — all defined as CSS variables at the top of `style.css` under `:root { }`. Change `--bone`, `--amber`, `--sage` etc. to shift the palette.
- **Fonts** — loaded from Google Fonts. Change the import URL in `index.html` and update the `--font-display`, `--font-heading`, `--font-body` variables in `style.css`.
- **Commission section** — if you're not taking commissions, you can delete or comment out the `<section class="section commission-section">` block entirely.
- **Social links** — the contact section has placeholders for Instagram, Email, Etsy, and YouTube. Remove or swap any you don't need.

---

*Built with reverence & dark intent.*
