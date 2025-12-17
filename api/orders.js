async function loadMyOrders() {
    console.log('Loading orders...');
    const result = await apiCall('/orders', 'GET');
    console.log('Orders result:', result);
    
    if (result.success) {
        displayOrders(result.data);
    } else {
        console.error('Failed to load orders:', result.message);
        const ordersTable = document.getElementById('ordersList');
        if (ordersTable) {
            ordersTable.innerHTML = 
                '<tr><td colspan="5" style="text-align: center; color: red;">Failed to load orders</td></tr>';
        }
    }
}

function displayOrders(orders) {
    const ordersTable = document.getElementById('ordersList');
    
    if (!ordersTable) {
        console.error('ordersList element not found');
        return;
    }
    
    if (!orders || orders.length === 0) {
        ordersTable.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem;">No orders found</td></tr>';
        return;
    }
    
    console.log('Displaying', orders.length, 'orders');
    ordersTable.innerHTML = '';
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        
        const bookTitles = order.items.map(item => item.productName).join(', ');
        
        // Handle date safely
        let orderDate = 'N/A';
        try {
            if (order.createdAt) {
                orderDate = new Date(order.createdAt).toLocaleDateString();
            } else if (order.orderDate) {
                orderDate = new Date(order.orderDate).toLocaleDateString();
            }
        } catch (e) {
            console.error('Error parsing date:', e);
        }
        
        let statusClass = 'status-' + order.status;
        
        row.innerHTML = `
            <td><strong>#${order._id.slice(-6)}</strong></td>
            <td>${bookTitles}</td>
            <td><strong>${order.totalAmount} EGP</strong></td>
            <td><span class="${statusClass}">${order.status.toUpperCase()}</span></td>
            <td>${orderDate}</td>
        `;
        ordersTable.appendChild(row);
    });
}

if (document.getElementById('ordersList')) {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Orders page loaded');
        const token = localStorage.getItem('token');
        console.log('Token exists:', !!token);
        
        if (!token) {
            console.log('No token, redirecting to login');
            window.location.href = 'login.html';
            return;
        }
        loadMyOrders();
    });
}
