// Bracelet products
const products = [
    {
        id: 1,
        name: 'Cute Crystal Bracelet',
        price: 250,
        currency: 'PKR',
        emoji: '💎',
        description: 'A cute handmade crystal bracelet in blue and red colors.',
        rating: '⭐⭐⭐⭐⭐',
        color: 'Blue & Red'
    },
    {
        id: 2,
        name: 'Golden Elegance',
        price: 34.99,
        currency: '$',
        emoji: '✨',
        description: 'Luxurious golden chain bracelet',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        id: 3,
        name: 'Pearl Essence',
        price: 39.99,
        currency: '$',
        emoji: '🌸',
        description: 'Classic pearl bracelet for every occasion',
        rating: '⭐⭐⭐⭐'
    },
    {
        id: 4,
        name: 'Bohemian Vibe',
        price: 24.99,
        currency: '$',
        emoji: '🎨',
        description: 'Colorful beaded bohemian style bracelet',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        id: 5,
        name: 'Minimalist Gold',
        price: 27.99,
        currency: '$',
        emoji: '👑',
        description: 'Simple and elegant minimalist design',
        rating: '⭐⭐⭐⭐'
    },
    {
        id: 6,
        name: 'Rainbow Sparkle',
        price: 31.99,
        currency: '$',
        emoji: '🌈',
        description: 'Multicolor gemstone bracelet',
        rating: '⭐⭐⭐⭐⭐'
    }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    loadCartFromLocalStorage();
});

function formatPrice(product) {
    return `${product.currency}${product.price.toFixed(2)}`;
}

function displayProducts() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                ${product.color ? `<p><strong>Color:</strong> ${product.color}</p>` : ''}
                <div class="product-rating">${product.rating}</div>
                <div class="product-price">${formatPrice(product)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">🛒 Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    saveCartToLocalStorage();
    showNotification('Added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCartToLocalStorage();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) removeFromCart(productId);
    else {
        updateCart();
        saveCartToLocalStorage();
    }
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }

    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${formatPrice(item)} × ${item.quantity}</p>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const currencies = [...new Set(cart.map(item => item.currency))];
    cartTotal.textContent = currencies.length === 1 ? `${currencies[0]}${total.toFixed(2)}` : `${total.toFixed(2)} (mixed currencies)`;
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    alert('Thank you for your order! We will contact you soon with shipping details.');
    cart = [];
    updateCart();
    saveCartToLocalStorage();
    toggleCart();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = 'position:fixed;top:80px;right:20px;background:#4caf50;color:white;padding:1rem 1.5rem;border-radius:6px;z-index:1000;';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}