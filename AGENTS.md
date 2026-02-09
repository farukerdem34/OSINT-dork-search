# AGENTS.md - OSINT Dork Tool Developer Guide

## Project Overview

This is a **client-side only OSINT (Open Source Intelligence) tool** built with vanilla HTML, CSS, and JavaScript. The application generates Google dorks for security research, features EXIF metadata extraction, emoji steganography, and educational content.

**Tech Stack:**
- Pure HTML5, CSS3, and vanilla JavaScript (no frameworks)
- External libraries: Font Awesome, Google Fonts, Leaflet.js, EXIF.js
- Deployment: GitHub Pages with custom domain
- Architecture: 100% frontend, privacy-focused design

## Build/Test/Lint Commands

**No build system or package.json exists** - this is a static website project.

### Development Setup
```bash
# Serve locally (use any static server)
python3 -m http.server 8000
# or
npx live-server .
# or
php -S localhost:8000
```

### Testing
**No formal test framework** - testing is manual through browser:
1. Open `index.html` in browser
2. Test core features:
   - Google Dorks generator (both Security and Media modes)
   - EXIF metadata extractor (`meta-extractor.html`)
   - Emoji steganography tool (`emoji-crypt.html`)
   - Academy pages navigation
3. Test responsive design on mobile/tablet
4. Verify all external CDN resources load correctly

### Validation
```bash
# HTML validation (install globally: npm install -g html-validate)
html-validate *.html academy/*.html

# CSS validation (manual via W3C validator)
# JS syntax check (use any JS linter manually)
eslint script.js --no-eslintrc --env browser
```

### Deployment
```bash
# Deployment is automatic via GitHub Pages
git add .
git commit -m "feat: your changes"
git push origin main
```

## Code Style Guidelines

### HTML Structure
- **HTML5 semantic elements** - use `<main>`, `<section>`, `<article>`, `<aside>`
- **Accessibility first** - include `alt`, `aria-*`, `role` attributes
- **Meta tags complete** - SEO, OG, Twitter cards for all pages
- **External resources** - use CDN links with integrity/crossorigin when possible
- **UTF-8 encoding** - always declare charset in `<head>`

### CSS Standards
- **CSS Custom Properties (Variables)** - defined in `:root`
- **Cyberpunk theme consistency** - use existing color scheme:
  ```css
  --bg-color: #050505;
  --neon-green: #00ff41;
  --text-main: #e0e0e0;
  --tech-font: 'Share Tech Mono', monospace;
  ```
- **Mobile-first responsive** - use CSS Grid and Flexbox
- **BEM-like naming** - descriptive class names (e.g., `.dork-category`, `.search-results`)
- **Performance** - minimize CSS, avoid deep nesting
- **Grid overlay effect** - maintain cyberpunk aesthetic consistency

### JavaScript Conventions
- **Vanilla JS only** - no frameworks or build tools
- **ES6+ features** - use const/let, arrow functions, template literals
- **Strict mode** - include `'use strict';` in functions if needed
- **Constants** - define data structures as const (like `dorksData`)
- **Camel case** - variables and functions (`generateDork`, `currentMode`)
- **Descriptive names** - avoid abbreviations (`searchResults` not `sRes`)

### Variable Naming
```javascript
// ✅ Good
const dorksData = [...];
const currentMode = 'sec';
const searchResults = document.querySelector('.results');

// ❌ Avoid
const dd = [...];
const m = 'sec';  
const sr = document.querySelector('.results');
```

### Function Structure
```javascript
// ✅ Preferred pattern
function generateGoogleDork(category, query) {
    if (!category || !query) {
        console.error('Missing required parameters');
        return null;
    }
    
    const baseUrl = 'https://google.com/search?q=';
    return `${baseUrl}${encodeURIComponent(query)}`;
}

// Event listeners - use arrow functions for brevity
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});
```

### Data Structures
- **Object arrays for categories** - follow `dorksData` pattern
- **Type indicators** - use `type: "sec"` or `type: "media"` consistently
- **Icon consistency** - Font Awesome classes (e.g., `"fa-file-alt"`)
- **Label/dork pairs** - maintain `{ label: "Description", dork: "query" }` structure

### Error Handling
```javascript
// ✅ Handle errors gracefully
function processImageFile(file) {
    try {
        if (!file || !file.type.startsWith('image/')) {
            throw new Error('Invalid file type');
        }
        
        // Process file...
        return result;
    } catch (error) {
        console.error('Image processing failed:', error.message);
        showUserMessage('Error processing image. Please try again.');
        return null;
    }
}
```

### Comments Style
```javascript
/* =========================================
   SECTION: MAJOR FUNCTIONALITY
   ========================================= */

// Single-line comments for code explanation
const searchMode = 'advanced'; // Current search mode

/**
 * Multi-line JSDoc for functions
 * @param {string} query - The search query
 * @param {Object} options - Configuration options
 * @returns {string} - Formatted Google dork URL
 */
function buildDorkQuery(query, options) {
    // Implementation...
}
```

### DOM Manipulation
- **Query selectors** - prefer specific selectors over generic ones
- **Event delegation** - use when appropriate for dynamic content
- **Performance** - cache DOM references, batch DOM updates
```javascript
// ✅ Cache frequently used elements
const resultsContainer = document.querySelector('.search-results');
const modeSelector = document.querySelector('#mode-toggle');

// ✅ Batch DOM updates
const fragment = document.createDocumentFragment();
results.forEach(item => {
    const element = createResultElement(item);
    fragment.appendChild(element);
});
resultsContainer.appendChild(fragment);
```

## File Organization

### Directory Structure
```
/
├── index.html              # Main application
├── script.js               # Core application logic  
├── style.css               # Cyberpunk theme styles
├── meta-extractor.html     # EXIF tool
├── emoji-crypt.html        # Steganography tool
├── privacy.html            # Privacy policy
├── sitemap.xml             # SEO sitemap
├── CNAME                   # GitHub Pages domain
├── favicon.png             # Site icon
└── academy/                # Educational content
    ├── index.html          # Academy hub
    ├── what-is-osint.html  # OSINT introduction
    ├── top-10-dorks.html   # Popular dorks guide
    ├── defensive-dorking.html  # Security awareness
    └── glossary.html       # Technical terms
```

### Adding New Features
1. **New tools** - create separate HTML files (e.g., `new-tool.html`)
2. **Shared styles** - extend `style.css` with new CSS variables
3. **Shared logic** - add functions to `script.js` or create new JS files
4. **Academy content** - add new files to `academy/` directory
5. **Update navigation** - modify main menu in `index.html`

### Assets Management
- **Icons** - use Font Awesome CDN, maintain cyberpunk aesthetic
- **Fonts** - Share Tech Mono via Google Fonts CDN
- **Images** - optimize for web, use WebP when possible
- **External libraries** - prefer CDN over local files

## Performance Guidelines

### Optimization
- **Minimize HTTP requests** - combine files when possible
- **CDN resources** - use established CDNs for external libraries
- **Image optimization** - compress images, use appropriate formats
- **CSS/JS minification** - for production deployments
- **Lazy loading** - implement for large datasets or images

### Browser Compatibility
- **Modern browsers** - ES6+ support required
- **Mobile responsive** - test on various device sizes
- **Progressive enhancement** - ensure basic functionality without JS

## Security Considerations

### Client-Side Security
- **Input validation** - sanitize all user inputs
- **XSS prevention** - escape HTML content, use textContent vs innerHTML
- **CSP headers** - consider Content Security Policy for deployment
- **HTTPS enforcement** - ensure all external resources use HTTPS

### Privacy Focus
- **No data collection** - maintain client-side only architecture
- **No tracking pixels** - beyond essential analytics
- **Local storage** - clearly document any data stored locally

## Git Workflow

### Commit Messages
Follow conventional commits:
```bash
feat: add new Google dork category
fix: resolve EXIF parsing issue
docs: update README with new features
style: improve mobile responsiveness
refactor: optimize dork generation logic
```

### Branch Strategy
- **Main branch** - production-ready code
- **Feature branches** - for significant new features
- **Hotfix branches** - for critical bug fixes

## Deployment

### GitHub Pages
- **Automatic deployment** - pushes to main trigger deployment  
- **Custom domain** - configured via CNAME file
- **SSL certificate** - automatically provided by GitHub

### Pre-deployment Checklist
- [ ] Test all functionality in multiple browsers
- [ ] Validate HTML/CSS syntax
- [ ] Check mobile responsiveness  
- [ ] Verify external CDN resources load
- [ ] Test Google Analytics integration
- [ ] Review privacy policy compliance

## Resources

### External Dependencies
- Font Awesome 6.0 - Icons
- Google Fonts - Share Tech Mono
- Leaflet.js - Maps for EXIF tool
- EXIF.js - Image metadata extraction
- Google Analytics - Usage tracking

### Documentation
- [Google Search Operators](https://ahrefs.com/blog/google-advanced-search-operators/)
- [OSINT Framework](https://osintframework.com/)
- [EXIF.js Documentation](https://github.com/exif-js/exif-js)

---

*This guide ensures consistency and maintainability for all AI agents working on the OSINT Dork Tool project.*