# 富士 Zen - Seasonal Vegetarian Fine Dining Website

A stunning, immersive restaurant website inspired by the eternal beauty of Mount Fuji, featuring seasonal transformations and interactive design elements.

## 🌸 Features

### Core Experience
- **Seasonal Transformation System**: Dynamic website themes that change with Mount Fuji's seasons
- **Interactive Navigation**: Glassmorphic navigation with smooth scrolling and seasonal toggles
- **Immersive Hero Section**: Full-screen experience with floating particles and gradient animations
- **Custom Cursor Effects**: Elegant cursor interactions with blend modes
- **Parallax Scrolling**: Smooth parallax effects for depth and engagement

### Design Elements
- **Japanese Aesthetic**: Minimalist design inspired by Japanese zen principles
- **Responsive Layout**: Mobile-first design that works across all devices
- **Glassmorphic UI**: Modern glass-like UI components with backdrop blur effects
- **Scroll Animations**: Reveal animations triggered by scroll position
- **3D Hover Effects**: Cards with 3D transforms and shadow effects

### Interactive Features
- **Season Toggle**: Manual season switching with visual transformations
- **Audio Controls**: Ambient sound toggle (framework ready)
- **Booking System**: Beautiful contact form with glassmorphic styling
- **Menu Cards**: Interactive course cards with hover animations
- **Smooth Navigation**: Seamless scrolling between sections

## 🛠 Technology Stack

- **HTML5**: Semantic markup and accessibility features
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Vanilla JavaScript**: Interactive functionality and animations
- **Framer Motion**: Animation library integration ready
- **Google Fonts**: Zen Maru Gothic typography
- **CSS Animations**: Custom keyframe animations for particles and gradients

## 🚀 Quick Start

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd fuji-zen-restaurant
```

2. Open `index.html` in your web browser:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Or simply open index.html in your browser
```

3. Visit `http://localhost:8000` to view the website

### GitHub Pages Deployment

1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Set build command: (leave empty)
3. Set publish directory: (leave empty or set to `/`)
4. Deploy automatically on every push

## 🎨 Customization

### Seasonal Colors
The website uses CSS custom properties for easy theming:

```css
.season-spring {
    --primary: #E8F5E8;
    --accent: #90EE90;
    --text: #2D5016;
}
```

### Adding New Menu Items
Menu items are structured as cards in the menu section:

```html
<div class="menu-card glassmorphic rounded-2xl p-8 scroll-reveal">
    <div class="text-4xl mb-4">🌱</div>
    <h3 class="text-2xl font-medium mb-4">Dish Name</h3>
    <p class="text-gray-600 mb-6">Description</p>
    <div class="text-lg font-medium text-blue-600">Course Type</div>
</div>
```

### Modifying Seasonal Gradients
Update the gradient arrays in the JavaScript section:

```javascript
const seasonGradients = [
    'linear-gradient(135deg, #E8F5E8 0%, #90EE90 50%, #98FB98 100%)', // Spring
    'linear-gradient(135deg, #6DAEDB 0%, #E0E4E8 50%, #87CEEB 100%)', // Summer  
    'linear-gradient(135deg, #FFC857 0%, #FFE4B5 50%, #DEB887 100%)', // Autumn
    'linear-gradient(135deg, #E0E4E8 0%, #F0F8FF 50%, #B0C4DE 100%)'  // Winter
];
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎯 Performance Features

- **Lazy Loading**: Images and animations load as needed
- **Efficient CSS**: Tailwind CSS for optimized stylesheets
- **Minimal JavaScript**: Vanilla JS for fast execution
- **Optimized Animations**: GPU-accelerated transforms
- **Compressed Assets**: Optimized fonts and external resources

## 🌟 Key Sections

### 1. Hero Section
- Full-screen immersive experience
- Floating particle animations
- Dynamic seasonal gradients
- Call-to-action button

### 2. Seasons Showcase
- Four season cards with hover effects
- Interactive season switching
- Seasonal descriptions and imagery

### 3. Menu Presentation
- Six-course tasting menu
- Glassmorphic card design
- 3D hover animations
- Course categorization

### 4. Experience Story
- Restaurant philosophy
- Parallax background effects
- Engaging content layout

### 5. Booking System
- Beautiful contact form
- Glassmorphic styling
- Input validation ready
- Seasonal preferences

## 🔧 Future Enhancements

- **Real Audio Integration**: Seasonal ambient sounds
- **Image Gallery**: High-quality food photography
- **Reservation API**: Backend integration for real bookings
- **Multi-language Support**: Japanese/English toggle
- **Advanced Animations**: GSAP integration for complex animations
- **Progressive Web App**: Offline functionality and app-like experience

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or support, please contact:
- Email: hello@fujizen.jp
- GitHub Issues: [Create an issue](../../issues)

---

*Crafted with respect for nature and tradition* 🗻