// Cart functionality for MintLib

// Function to add book to cart
function addToCart(bookName, bookPrice, bookCondition, bookAuthor) {
  // Get existing cart from memory or create new array
  let cart = getCart();
  
  // Create book object
  const book = {
    id: Date.now(), // Simple unique ID
    name: bookName,
    price: parseFloat(bookPrice),
    condition: bookCondition,
    author: bookAuthor
  };
  
  // Add book to cart
  cart.push(book);
  
  // Save cart
  saveCart(cart);
  
  // Show confirmation (optional)
  alert(`"${bookName}" has been added to your cart!`);
  
  // Redirect to cart page
  window.location.href = 'cart.html';
}

// Function to get cart from memory
function getCart() {
  if (!window.cartData) {
    window.cartData = [];
  }
  return window.cartData;
}

// Function to save cart to memory
function saveCart(cart) {
  window.cartData = cart;
}

// Function to remove item from cart
function removeFromCart(bookId) {
  let cart = getCart();
  cart = cart.filter(book => book.id !== bookId);
  saveCart(cart);
  displayCart();
}

// Function to display cart items
function displayCart() {
  const cart = getCart();
  const cartItemsTable = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  
  if (!cartItemsTable) return;
  
  // Clear current items
  cartItemsTable.innerHTML = '';
  
  if (cart.length === 0) {
    cartItemsTable.innerHTML = `
      <tr>
        <td colspan="3" style="text-align: center; padding: 2rem;">Your cart is empty</td>
      </tr>
    `;
    cartTotal.textContent = '0';
    return;
  }
  
  // Display each cart item
  let total = 0;
  cart.forEach(book => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <strong>${book.name}</strong><br>
        <small style="color: #666;">by ${book.author}</small><br>
        <span class="badge" style="background: ${book.condition === 'New' ? '#10b981' : '#f59e0b'}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; margin-top: 4px; display: inline-block;">${book.condition}</span>
      </td>
      <td>${book.price} EGP</td>
      <td><button onclick="removeFromCart(${book.id})" class="btn-remove">Remove</button></td>
    `;
    cartItemsTable.appendChild(row);
    total += book.price;
  });
  
  cartTotal.textContent = total.toFixed(0);
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    });
  }
}
// Handle book cover images for consistent sizing
function handleBookCovers() {
  const bookCovers = document.querySelectorAll('.book-cover img');
  
  bookCovers.forEach(img => {
    // Force consistent sizing
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';
    
    img.addEventListener('error', function() {
      this.style.display = 'none';
      const placeholder = this.parentElement.querySelector('.book-cover-placeholder');
      if (placeholder) {
        placeholder.style.display = 'flex';
      }
    });
    
    // Check if image loaded successfully
    if (img.complete && img.naturalHeight === 0) {
      img.style.display = 'none';
      const placeholder = img.parentElement.querySelector('.book-cover-placeholder');
      if (placeholder) {
        placeholder.style.display = 'flex';
      }
    }
  });
}
// Contact form handler
function handleContact(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const msgEl = document.getElementById('formMsg');
  if(!name || !email || !message){
    msgEl.style.color = 'var(--error)';
    msgEl.textContent = 'Please fill all the fields.';
    return false;
  }
  // Success message
  msgEl.style.color = 'var(--success)';
  msgEl.textContent = 'We received your message! Expect a response soon.';
  
  // Reset form
  document.getElementById('contactForm').reset();
  // Remove message after 4 seconds
  setTimeout(() => { 
    msgEl.textContent = ''; 
  }, 4000);
  return false;
}
// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  initHeaderScroll();
  handleBookCovers();
  
  // Initialize cart display on cart page
  if (window.location.pathname.includes('cart.html')) {
    displayCart();
  }
  
  // Add app wrapper to all pages
  const appWrapper = document.createElement('div');
  appWrapper.className = 'app';
  while (document.body.firstChild) {
    appWrapper.appendChild(document.body.firstChild);
  }
  document.body.appendChild(appWrapper);
  
  // Add active class to current page navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});
