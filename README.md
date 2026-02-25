# NEOLUX 
# LANGUAGES # NeoLux – Programming Languages Used

## Overview

The NeoLux website is built using **three core web technologies**. No additional frameworks or complex back-end languages are required – it's a pure front-end application that runs entirely in the browser.

---

## Primary Languages

| Language | Purpose | File Extension |
|----------|---------|----------------|
| **HTML5** | Structure & Content | `.html` |
| **CSS3** | Styling & Animations | `.css` |
| **JavaScript (ES6)** | Interactivity & Logic | `.js` |

---


# NeoLux – Software & Hardware Requirements

## System Requirements for Installation and Operation

---

## For End Users (Website Visitors)

### Minimum Hardware Requirements

| Component | Requirement |
|-----------|-------------|
| **Processor** | Any modern processor (Intel Celeron or equivalent) |
| **RAM** | 1 GB minimum |
| **Storage** | No installation required – runs in browser |
| **Screen Resolution** | 320px or higher (mobile compatible) |
| **Internet Connection** | 5 Mbps or faster |
| **Graphics** | Any graphics card supporting standard web rendering |

### Recommended Hardware Requirements

| Component | Recommendation |
|-----------|----------------|
| **Processor** | Intel Core i3 / AMD Ryzen 3 or better |
| **RAM** | 4 GB or more |
| **Screen Resolution** | 1920 x 1080 (Full HD) or higher |
| **Internet Connection** | 10 Mbps or faster (fiber recommended) |
| **Graphics** | Dedicated graphics optional – integrated works fine |

### Supported Devices

- **Desktop Computers** (Windows, macOS, Linux)
- **Laptops** (all major brands)
- **Tablets** (iPad, Android tablets, Surface)
- **Smartphones** (iPhone, Android phones)
- **Smart TVs** (with web browsing capability)
- **Gaming Consoles** (PS5, Xbox Series X/S – via browser)

---

## Software Requirements – End Users

### Operating Systems

| OS | Minimum Version | Browser Support |
|----|-----------------|-----------------|
| **Windows** | Windows 7 or later | Chrome, Firefox, Edge |
| **macOS** | macOS 10.12 (Sierra) or later | Safari, Chrome, Firefox |
| **Linux** | Any modern distribution | Chrome, Firefox |
| **iOS** | iOS 12 or later | Safari, Chrome |
| **Android** | Android 8.0 (Oreo) or later | Chrome, Firefox |
| **ChromeOS** | Any version | Chrome |

### Browser Requirements

| Browser | Minimum Version | JavaScript | CSS Support |
|---------|-----------------|------------|-------------|
| **Google Chrome** | Version 90+ | Required | Full CSS3 |
| **Mozilla Firefox** | Version 88+ | Required | Full CSS3 |
| **Apple Safari** | Version 15+ | Required | Full CSS3 |
| **Microsoft Edge** | Version 90+ | Required | Full CSS3 |
| **Opera** | Version 76+ | Required | Full CSS3 |
| **Samsung Internet** | Version 15+ | Required | Full CSS3 |

### Browser Settings Required

- **JavaScript:** Must be enabled
- **Cookies:** Optional (for future features)
- **Pop-ups:** Should be allowed for pop-up ads feature
- **Fonts:** Allow external font loading (Google Fonts)
- **Images:** Enable image loading
- **Local Storage:** Optional for cart persistence (future feature)

### Internet Connection

| Connection Type | Performance |
|-----------------|-------------|
| **Broadband (10+ Mbps)** | Optimal – instant loading |
| **4G/LTE Mobile** | Good – 2-3 second load time |
| **3G Mobile** | Acceptable – 5-7 second load time |
| **2G/Edge** | Not recommended – may timeout |
| **Satellite** | Usable – expect higher latency |
| **Wi-Fi** | Recommended for best experience |

---

## For Developers (Self-Hosting)

### Server Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **CPU** | 1 core @ 1.5 GHz | 2+ cores @ 2.5+ GHz |
| **RAM** | 512 MB | 2 GB or more |
| **Storage** | 100 MB free space | 1 GB free space |
| **Bandwidth** | 10 GB/month | 100 GB/month |
| **Uptime** | 99% | 99.9% |

### Server Software Requirements

| Component | Requirement | Notes |
|-----------|-------------|-------|
| **Web Server** | Apache 2.4+, Nginx 1.18+, or any static host | Can use GitHub Pages, Netlify, Vercel |
| **Operating System** | Linux (Ubuntu 20.04+, CentOS 7+), Windows Server 2016+, or macOS Server | Any OS with web server |
| **SSL Certificate** | Recommended for production | Let's Encrypt free option |
| **FTP/SFTP** | For file uploads | Optional with modern deployment |
| **Node.js** | Not required | Pure static site |
| **Database** | Not required | All data client-side |
| **PHP** | Not required | No server-side processing |
| **Python** | Not required | Static only |

### Supported Hosting Platforms

| Platform | Free Tier | Paid Options | Ease of Setup |
|----------|-----------|--------------|---------------|
| **GitHub Pages** | ✅ Yes | ❌ No | Very Easy |
| **Netlify** | ✅ Yes | ✅ Yes | Very Easy |
| **Vercel** | ✅ Yes | ✅ Yes | Very Easy |
| **Cloudflare Pages** | ✅ Yes | ✅ Yes | Very Easy |
| **Firebase Hosting** | ✅ Yes | ✅ Yes | Easy |
| **AWS S3** | ❌ No | ✅ Yes | Moderate |
| **Google Cloud Storage** | ❌ No | ✅ Yes | Moderate |
| **Azure Static Web Apps** | ✅ Yes | ✅ Yes | Moderate |
| **Shared Hosting (cPanel)** | ❌ No | ✅ Yes | Easy |
| **VPS (DigitalOcean, Linode)** | ❌ No | ✅ Yes | Advanced |

---

## Development Environment Requirements

### For Coding and Customization

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **Code Editor** | Any text editor | VS Code, Sublime Text, Atom |
| **RAM** | 4 GB | 8 GB or more |
| **CPU** | Intel Core i3 | Intel Core i5/i7 or equivalent |
| **Storage** | 5 GB free space | 20 GB free space |
| **Screen** | 1366 x 768 | 1920 x 1080 or higher |

### Recommended Development Tools

| Tool | Purpose | Free Version |
|------|---------|--------------|
| **Visual Studio Code** | Code editing | ✅ Yes |
| **Git** | Version control | ✅ Yes |
| **Chrome DevTools** | Debugging | ✅ Yes |
| **Firefox Developer Edition** | Testing | ✅ Yes |
| **Postman** | API testing (future) | ✅ Yes |
| **Figma** | Design reference | ✅ Yes (limited) |
| **FileZilla** | FTP uploads | ✅ Yes |

---

## Network Requirements

### Firewall Settings (Outbound)

| Protocol | Port | Purpose |
|----------|------|---------|
| **HTTP** | 80 | Website access |
| **HTTPS** | 443 | Secure website access |
| **FTP** | 21 | File uploads (optional) |
| **SFTP** | 22 | Secure file uploads (optional) |

### Firewall Settings (Inbound) – For Self-Hosted Servers

| Protocol | Port | Purpose | Restrict To |
|----------|------|---------|-------------|
| **HTTP** | 80 | Web traffic | All |
| **HTTPS** | 443 | Secure web traffic | All |
| **SSH** | 22 | Server management | Your IP only |
| **FTP** | 21 | File uploads | Your IP only |

### CDN Requirements (Optional)

| CDN Provider | Free Tier | Setup Difficulty |
|--------------|-----------|------------------|
| **Cloudflare** | ✅ Yes | Easy |
| **Fastly** | ❌ No | Moderate |
| **Akamai** | ❌ No | Advanced |

---

## Mobile App Requirements (Future Development)

If NeoLux develops native mobile apps in the future:

### iOS App Requirements

| Component | Requirement |
|-----------|-------------|
| **iOS Version** | iOS 13.0 or later |
| **Device** | iPhone 6s or newer |
| **Storage** | 50 MB free space |
| **RAM** | 2 GB minimum |

### Android App Requirements

| Component | Requirement |
|-----------|-------------|
| **Android Version** | Android 8.0 (Oreo) or later |
| **Device** | Most modern Android phones |
| **Storage** | 50 MB free space |
| **RAM** | 2 GB minimum |

---

## Performance Benchmarks

| Metric | Target |
|--------|--------|
| **Page Load Time** | < 2 seconds |
| **Time to Interactive** | < 3 seconds |
| **First Contentful Paint** | < 1.5 seconds |
| **Largest Contentful Paint** | < 2.5 seconds |
| **Cumulative Layout Shift** | < 0.1 |
| **First Input Delay** | < 100ms |

---

## Scalability Requirements

| User Load | Server Specs | Bandwidth |
|-----------|--------------|-----------|
| **1-100 concurrent** | 1 vCPU, 1 GB RAM | 10 Mbps |
| **100-1,000 concurrent** | 2 vCPU, 4 GB RAM | 100 Mbps |
| **1,000-10,000 concurrent** | 4+ vCPU, 8+ GB RAM | 1 Gbps + CDN |
| **10,000+ concurrent** | Load balanced, auto-scaling | Multiple Gbps + CDN |

---

## Accessibility Requirements

NeoLux aims to meet WCAG 2.1 AA standards:

| Requirement | Implementation |
|-------------|----------------|
| **Screen Reader Compatible** | Semantic HTML |
| **Keyboard Navigation** | Tab-index support |
| **Color Contrast** | Minimum 4.5:1 ratio |
| **Text Resizing** | Responsive design |
| **Alt Text** | Product images include alt attributes |

---

## Summary Checklist

### For Users:
- [ ] Modern browser (Chrome 90+, Firefox 88+, Safari 15+, Edge 90+)
- [ ] JavaScript enabled
- [ ] Internet connection (5 Mbps+ recommended)
- [ ] Any device with screen resolution 320px+

### For Developers (Self-Hosting):
- [ ] Web server (Apache/Nginx) or static hosting service
- [ ] Domain name (optional)
- [ ] SSL certificate (recommended)
- [ ] 100 MB storage space
- [ ] Git for version control (optional)

### For Production Deployment:
- [ ] CDN for global performance
- [ ] Monitoring tools
- [ ] Analytics integration
- [ ] Backup strategy
- [ ] SSL certificate installed

---

**NeoLux is designed to be lightweight, accessible, and easy to deploy anywhere – from a simple Raspberry Pi to enterprise cloud infrastructure.**

*Last updated: February 2026*
