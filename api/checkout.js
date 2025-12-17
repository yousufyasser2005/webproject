document.getElementById('checkoutForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const shippingAddress = {
        street: document.getElementById('street').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zipCode: document.getElementById('zipCode').value,
        country: document.getElementById('country').value || 'Egypt'
    };
    
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'cash';
    
    const result = await apiCall('/orders', 'POST', {
        shippingAddress,
        paymentMethod
    });
    
    if (result.success) {
        alert('Order placed successfully!');
        window.location.href = 'my-orders.html';
    } else {
        alert('Failed to place order: ' + result.message);
    }
});
