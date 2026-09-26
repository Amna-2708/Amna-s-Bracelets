// Bracelet products - Pakistani Store
const products = [
    {
        id: 1,
        name: 'Cute Crystal Bracelet',
        price: 250,
        currency: 'PKR',
        emoji: '💎',
        description: 'A cute handmade crystal bracelet in blue and red colors.',
        rating: '⭐⭐⭐⭐⭐',
        color: 'Blue & Red',
        images: [
            'https://i.imgur.com/OJqL8Z7.jpg',
            'https://i.imgur.com/OJqL8Z7.jpg',
            'https://i.imgur.com/OJqL8Z7.jpg',
            'https://i.imgur.com/OJqL8Z7.jpg'
        ]
    },
    {
        id: 2,
        name: 'Cute Flower Crystal Bracelet',
        price: 250,
        currency: 'PKR',
        emoji: '🌸',
        description: 'A beautiful handmade flower-style crystal bracelet with pink and white beads.',
        rating: '⭐⭐⭐⭐⭐',
        color: 'Pink & White',
        images: [
            'https://i.imgur.com/kL9m5pF.jpg',
            'https://i.imgur.com/kL9m5pF.jpg',
            'https://i.imgur.com/kL9m5pF.jpg'
        ]
    }
];

let cart = [];
let favorites = [];
let currentImageIndex = {};

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    loadCartFromLocalStorage();
    loadFavoritesFromLocalStorage();
});

function formatPrice(product) {
    return `${product.currency} ${product.price}`;
}

function displayProducts() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        currentImageIndex[product.id] = 0;
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        const hasImages = product.images && product.images.length > 0;
        const isFavorite = favorites.includes(product.id);
        
        let imageHTML = '';
        if (hasImages) {
            imageHTML = `
                <div class="product-image-gallery">
                    <img id="product-img-${product.id}" src="${product.images[0]}" alt="${product.name}" class="product-image-img">
                    <div class="gallery-controls">
                        <button class="nav-btn prev-btn" onclick="previousImage(${product.id})">❮</button>
                        <span class="image-counter"><span id="current-${product.id}">1</span>/<span id="total-${product.id}">${product.images.length}</span></span>
                        <button class="nav-btn next-btn" onclick="nextImage(${product.id})">❯</button>
                    </div>
                </div>
            `;
        } else {
            imageHTML = `<div class="product-image">${product.emoji}</div>`;
        }
        
        productCard.innerHTML = `
            ${imageHTML}
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                ${product.color ? `<p><strong>Color:</strong> ${product.color}</p>` : ''}
                <div class="product-rating">${product.rating}</div>
                <div class="product-price">${formatPrice(product)}</div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">🛒 Add to Cart</button>
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${product.id})" title="Add to Favorites">
                        ${isFavorite ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Image gallery navigation
function nextImage(productId) {
    const product = products.find(p => p.id === productId);
    if (product.images.length > 0) {
        currentImageIndex[productId] = (currentImageIndex[productId] + 1) % product.images.length;
        updateProductImage(productId);
    }
}

function previousImage(productId) {
    const product = products.find(p => p.id === productId);
    if (product.images.length > 0) {
        currentImageIndex[productId] = (currentImageIndex[productId] - 1 + product.images.length) % product.images.length;
        updateProductImage(productId);
    }
}

function updateProductImage(productId) {
    const product = products.find(p => p.id === productId);
    const img = document.getElementById(`product-img-${productId}`);
    const counter = document.getElementById(`current-${productId}`);
    if (img) {
        img.src = product.images[currentImageIndex[productId]];
        counter.textContent = currentImageIndex[productId] + 1;
    }
}

// Favorite functionality
function toggleFavorite(productId) {
    if (favorites.includes(productId)) {
        favorites = favorites.filter(id => id !== productId);
    } else {
        favorites.push(productId);
    }
    saveFavoritesToLocalStorage();
    displayProducts();
    showNotification(favorites.includes(productId) ? 'Added to favorites!' : 'Removed from favorites!');
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
        cartTotal.textContent = 'PKR 0';
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
    cartTotal.textContent = `PKR ${total}`;
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Thank you for your order! Total: PKR ${total}\n\nWe will contact you soon with shipping details.`);
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

function saveFavoritesToLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function loadFavoritesFromLocalStorage() {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = 'position:fixed;top:80px;right:20px;background:#4caf50;color:white;padding:1rem 1.5rem;border-radius:6px;z-index:1000;';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}