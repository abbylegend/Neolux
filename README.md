# NEOLUX 
# LANGUAGES USED
 NeoLux – Programming Languages Used

Overview

The NeoLux website is built using three core web technologies. No additional frameworks or complex back-end languages are required – it's a pure front-end application that runs entirely in the browser.

---

Primary Languages

Language Purpose File Extension
HTML5 Structure & Content .html
CSS3 Styling & Animations .css
JavaScript (ES6) Interactivity & Logic .js

---

1. HTML5 (HyperText Markup Language)

Version: HTML5
File: index.html
Lines: ~250

What HTML Does in NeoLux

· Creates the document structure
· Defines all page sections (header, hero, store, earnings, etc.)
· Embeds external resources (fonts, icons, stylesheets)
· Provides the skeleton for dynamic content injection
· Sets up meta tags for responsive design

Key HTML Features Used

· Semantic elements: <header>, <section>, <nav>, <footer>
· Custom data attributes for JavaScript interaction
· Responsive viewport meta tag
· External font integration (Google Fonts)
· Icon library integration (Font Awesome)

Example from NeoLux

```html
<section id="products" class="products">
  <h2 class="section-title">✦ MEGA STORE (700+ ITEMS) ✦</h2>
  <div class="store-tabs">
    <button class="tab-btn active" onclick="switchStoreTab('perfumes')">PERFUMES (500+)</button>
  </div>
  <div id="store-grid" class="product-grid"></div>
</section>
```

---

2. CSS3 (Cascading Style Sheets)

Version: CSS3
File: style.css
Lines: ~500

What CSS Does in NeoLux

· Creates the futuristic visual theme
· Handles all colors, gradients, and neon effects
· Manages responsive layout for mobile/tablet/desktop
· Animates elements (wheel spin, pop-up ads, hover effects)
· Implements glassmorphism (backdrop filters)
· Controls grid layouts for product display

Key CSS Features Used

· Flexbox & Grid – For responsive layouts
· CSS Variables – For consistent color theming
· Gradients – For text and background effects
· Animations & Transitions – For smooth interactions
· Media Queries – For mobile responsiveness
· Backdrop-filter – For glassmorphism effect
· Conic gradients – For the spin wheel
· Custom fonts – Orbitron (futuristic) and Inter (readable)

Example from NeoLux

```css
.hero h2 {
  font-size: 4rem;
  font-weight: 600;
  background: linear-gradient(135deg, #fff 0%, #a0f0ff 60%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px cyan;
}

.wheel {
  background: conic-gradient(#ffa0ff 0deg 120deg, #a0f0ff 120deg 240deg, gold 240deg 360deg);
  transition: transform 3s ease-out;
}
```

---

3. JavaScript (ECMAScript 6)

Version: ES6+
File: script.js
Lines: ~400

What JavaScript Does in NeoLux

· Generates 700+ product items dynamically
· Manages shopping cart state and operations
· Handles tab switching between categories
· Powers the interactive spin wheel game
· Controls chatbot conversations with decision trees
· Manages pop-up advertisement timing
· Handles delivery confirmation and rating
· Processes referral code copying
· Manages all user interactions and UI updates

Key JavaScript Features Used

· Arrays & Objects – For product data storage
· Functions & Arrow functions – For modular code
· Event handling – For clicks, keypresses
· DOM manipulation – For dynamic content updates
· setInterval & setTimeout – For timed ads and animations
· Template literals – For HTML generation
· Array methods – map, filter, find for cart operations
· Local state management – Cart and user choices
· Conditional logic – For decision tree responses

Example from NeoLux

```javascript
// Product generation
for (let i = 1; i <= 500; i++) {
  categories.perfumes.push({
    id: `p${i}`,
    name: base + ' ' + i,
    price: (50 + Math.floor(Math.random() * 50)).toFixed(0)
  });
}

// Cart functionality
window.addToCart = (id, name, price, img) => {
  const existing = cart.find(i => i.id === id);
  if (existing) existing.quantity++;
  else cart.push({ id, name, price, img, quantity: 1 });
  updateCartUI();
};

// Spin wheel
window.spinWheel = () => {
  const spinDeg = 720 + Math.floor(Math.random() * 360);
  wheel.style.transform = `rotate(${spinDeg}deg)`;
};
```

---

Supporting Technologies

4. Font Awesome (Icon Library)

Version: 6.0+
Purpose: Provides all icons used throughout the site

· Shopping cart icon
· Robot chat icon
· Earnings icons (users, bullhorn, wallet)
· Close buttons and UI elements
· FedEx box icon

5. Google Fonts

Fonts Used:

· Orbitron – Futuristic headings and logos
· Inter – Clean, readable body text

6. Unsplash (Image CDN)

Purpose: Product placeholder images
All product images are sourced from Unsplash's CDN for demonstration purposes.

---

Technical Specifications

Specification Details
Total Files 3 (HTML, CSS, JS)
Total Lines ~1150
Dependencies None (pure vanilla)
Browser Support Chrome, Firefox, Safari, Edge (latest 2 versions)
Mobile Support Fully responsive
Load Time < 2 seconds on broadband
Offline Support Limited (requires internet for fonts/images)

---

Language Distribution

```
HTML5   22%  (structure)
CSS3    43%  (styling)
JavaScript 35%  (interactivity)
```

---

Why These Languages?

Reason Explanation
Simplicity Pure HTML/CSS/JS requires no build tools or compilation
Speed Runs directly in browser – no server processing needed
Compatibility Works on all devices and browsers
Maintainability Easy to modify and update
Performance Lightweight and fast loading
Cost Free to host anywhere (GitHub Pages, Netlify, etc.)

---

No Back-End Languages Used

The NeoLux website currently operates without:

· PHP
· Python
· Ruby
· Node.js
· Java
· SQL
· Any database

All data is generated client-side. For production use, you would need to add:

· Back-end language (PHP, Node.js, Python) for user accounts
· Database (MySQL, MongoDB) for storing user data
· Payment processing (Stripe API, PayPal)
i
# INSTALLATION GUIDE
 # NeoLux – Complete Installation Guide

## System Requirements

### For Users (Website Visitors)
- **Browser:** Chrome 90+, Firefox 88+, Safari 15+, Edge 90+
- **Internet:** Stable connection (minimum 5 Mbps)
- **Device:** Desktop, tablet, or mobile with screen resolution 320px or higher
- **JavaScript:** Must be enabled
- **Storage:** No installation needed – runs in browser

### For Developers (Self-Hosting)
- **Web Server:** Apache 2.4+, Nginx 1.18+, or any static hosting
- **Domain Name:** Optional – can run locally
- **SSL Certificate:** Recommended for production
- **Storage:** 50MB for website files
- **Node.js:** Not required (pure HTML/CSS/JS)

---

## Installation Methods

Choose the method that works best for you:

## Method 1: Quick Local Installation (No Server Needed)

### Step 1: Create Project Folder
```bash
mkdir neolux-website
cd neolux-website

# USER MANUAL