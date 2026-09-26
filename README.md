# Luxe Bracelets - Online Store

A beautiful, responsive e-commerce website for selling handcrafted bracelets.

## Features

✨ **Modern Design** - Clean, elegant interface with luxury styling

🛒 **Shopping Cart** - Add/remove products, adjust quantities

📱 **Responsive** - Works perfectly on desktop, tablet, and mobile

💾 **Local Storage** - Cart persists across page refreshes

🎯 **Easy to Customize** - Simple structure, easy to modify products and colors

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start shopping!

## Customization

### Adding New Products
Edit the `products` array in `script.js`:

```javascript
const products = [
    {
        id: 1,
        name: 'Your Bracelet Name',
        price: 29.99,
        emoji: '💎',
        description: 'Your description here',
        rating: '⭐⭐⭐⭐⭐ (X reviews)'
    },
    // Add more products...
];
```

### Changing Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #d4af37;  /* Change this to your brand color */
    --dark-bg: #1a1a1a;
    --light-bg: #f5f5f5;
    /* ... more variables */
}
```

### Updating Contact Info
Edit the contact section in `index.html`:

```html
<p>📧 Email: your-email@example.com</p>
<p>📱 Phone: (555) 123-4567</p>
<p>📍 Follow us on Instagram @yourhandle</p>
```

## File Structure

- `index.html` - Main HTML structure
- `styles.css` - All styling and responsive design
- `script.js` - Cart functionality and interactivity
- `README.md` - This file

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## License

Free to use and modify for your business!

---

Enjoy your bracelet store! 💎✨