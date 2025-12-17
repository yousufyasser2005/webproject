async function loadCart() {
    console.log('Loading cart...');
    const result = await apiCall('/cart', 'GET');
    console.log('Cart result:', result);
    
    if (result.success) {
        displayCart(result.data);
    } else {
        console.error('Failed to load cart:', result.message);
        document.getElementById('cartItems').innerHTML = 
            '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: red;">Failed to load cart</td></tr>';
    }
}

function displayCart(cart) {
    console.log('Displaying cart:', cart);
    const cartItemsTable = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    if (!cart || !cart.items || cart.items.length === 0) {
        cartItemsTable.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem;">Your cart is empty</td></tr>';
        if (cartTotalElement) {
            cartTotalElement.textContent = '0';
        }
        return;
    }
    
    cartItemsTable.innerHTML = '';
    
    cart.items.forEach(item => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        
        row.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    ${item.image ? `<img src="${item.image}" alt="${item.title || 'Product'}" style="width: 50px; height: 70px; object-fit: cover; border-radius: 4px;">` : '<div style="width: 50px; height: 70px; background: #e2e8f0; border-radius: 4px; display: flex; align-items: center; justify-content: center;">📚</div>'}
                    <div>
                        <strong>${item.title || `Product #${item.productId}`}</strong>
                        ${item.author ? `<br><small>by ${item.author}</small>` : ''}
                    </div>
                </div>
            </td>
            <td>${item.quantity}</td>
            <td>${item.price} EGP</td>
            <td><strong>${itemTotal} EGP</strong></td>
            <td>
                <button onclick="removeFromCart('${item._id}')" class="btn" style="background: #ef4444; padding: 0.5rem 1rem;">Remove</button>
            </td>
        `;
        cartItemsTable.appendChild(row);
    });
    
    if (cartTotalElement) {
        cartTotalElement.textContent = cart.totalAmount.toFixed(2);
    }
}

async function removeFromCart(itemId) {
    if (confirm('Remove this item from cart?')) {
        const result = await apiCall(`/cart/remove/${itemId}`, 'DELETE');
        
        if (result.success) {
            loadCart();
        } else {
            alert('Failed to remove item: ' + result.message);
        }
    }
}

if (document.getElementById('cartItems')) {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Cart page loaded');
        const token = localStorage.getItem('token');
        console.log('Token:', token ? 'exists' : 'missing');
        
        if (!token) {
            console.log('No token, redirecting to login');
            window.location.href = 'login.html';
            return;
        }
        loadCart();
    });
}
