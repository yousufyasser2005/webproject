// Load all orders (admin)
async function loadAllOrders() {
    const result = await apiCall('/orders/admin/all', 'GET');
    
    if (result.success) {
        displayAdminOrders(result.data);
    } else {
        console.error('Failed to load orders:', result.message);
        alert('Failed to load orders: ' + result.message);
    }
}

function displayAdminOrders(orders) {
    const ordersGrid = document.querySelector('.orders-grid');
    
    if (!orders || orders.length === 0) {
        ordersGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No orders found</p>';
        return;
    }
    
    ordersGrid.innerHTML = '';
    
    orders.forEach(order => {
        const bookNames = order.items.map(item => item.productName).join(', ');
        const customerName = order.userId ? order.userId.name : 'Unknown';
        
        let statusClass = order.status;
        
        const card = document.createElement('div');
        card.className = 'order-card';
        card.innerHTML = `
            <h3>Order #${order._id.slice(-6)}</h3>
            <p><strong>Customer:</strong> ${customerName}</p>
            <p><strong>Books:</strong> ${bookNames}</p>
            <p><strong>Total:</strong> ${order.totalAmount} EGP</p>
            <p><strong>Status:</strong> <span class="status ${statusClass}">${order.status}</span></p>
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <select id="status-${order._id}" class="status-select">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                    <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
                <button onclick="updateOrderStatus('${order._id}')" class="btn btn-primary">Update</button>
            </div>
        `;
        ordersGrid.appendChild(card);
    });
}

async function updateOrderStatus(orderId) {
    const selectElement = document.getElementById(`status-${orderId}`);
    const newStatus = selectElement.value;
    
    const result = await apiCall(`/orders/${orderId}/status`, 'PUT', { status: newStatus });
    
    if (result.success) {
        alert('Order status updated successfully!');
        loadAllOrders(); // Reload orders
    } else {
        alert('Failed to update order: ' + result.message);
    }
}

// Load orders when page loads
if (document.querySelector('.orders-grid') && window.location.pathname.includes('manage-orders')) {
    document.addEventListener('DOMContentLoaded', () => {
        const userData = JSON.parse(localStorage.getItem('user'));
        
        if (!userData || userData.role !== 'administrator') {
            window.location.href = 'login.html';
            return;
        }
        
        loadAllOrders();
    });
}
