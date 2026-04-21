# orzz5 Portfolio Website

A stunning, modern portfolio website for frontend developer and Discord bot creator **orzz5**. Built with React, Vite, and TailwindCSS, featuring a purple and dark theme with smooth animations and interactive elements.

## Features

- **Modern Design**: Purple and dark color scheme with glass morphism effects
- **Smooth Animations**: Framer Motion powered animations and micro-interactions
- **Responsive Layout**: Fully responsive design that works on all devices
- **Interactive Components**: Hover effects, animated text, and dynamic content
- **Performance Optimized**: Fast loading times and smooth scrolling
- **SEO Friendly**: Optimized meta tags and semantic HTML

## Sections

1. **Hero Section**: Animated welcome with typing effect and call-to-action
2. **About Section**: Developer profile, skills, and expertise showcase
3. **Projects Gallery**: Interactive project cards with filtering
4. **Discord Services**: Dedicated section for Discord bot development services
5. **Contact Form**: Functional contact form with validation
6. **Footer**: Social links and newsletter subscription

## Technologies Used

- **Frontend**: React 18, Vite
- **Styling**: TailwindCSS with custom purple theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Inter & Space Grotesk fonts
- **Type Animation**: React Type Animation
- **Intersection Observer**: React Intersection Observer

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/orzz5/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Customization

### Colors

The color scheme is defined in `tailwind.config.js`. You can customize the purple theme by modifying these values:

```javascript
colors: {
  'purple-dark': '#1a0b2e',
  'purple-medium': '#2d1b69',
  'purple-light': '#6b46c1',
  'purple-accent': '#a855f7',
  'purple-glow': '#c084fc',
  // ...
}
```

### Fonts

The project uses Inter and Space Grotesk fonts from Google Fonts. You can change them in `index.html`.

### Animations

Custom animations are defined in `tailwind.config.js` under the `animation` and `keyframes` properties.

## Project Structure

```
src/
|-- components/
|   |-- Hero.jsx
|   |-- About.jsx
|   |-- Projects.jsx
|   |-- DiscordServices.jsx
|   |-- Contact.jsx
|   |-- Footer.jsx
|   |-- Navbar.jsx
|   |-- BackgroundAnimation.jsx
|-- App.jsx
|-- main.jsx
|-- index.css
```

## Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: Optimized with code splitting and lazy loading
- **Animations**: Hardware accelerated with CSS transforms
- **Images**: Optimized with proper sizing and formats

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Email**: hello@orzz5.dev
- **Discord**: orzz5#1234
- **Website**: https://orzz5.dev

---

Made with <3 and lots of coffee by orzz5
