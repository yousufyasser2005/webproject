async function addToCartFromDetails(bookId, bookPrice) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        alert('Please login to add items to cart');
        window.location.href = 'login.html';
        return;
    }
    
    const result = await apiCall('/cart/add', 'POST', {
        productId: bookId,
        quantity: 1,
        price: parseFloat(bookPrice)
    });
    
    if (result.success) {
        alert('Book added to cart!');
        // Optionally redirect to cart
        // window.location.href = 'cart.html';
    } else {
        alert('Failed to add to cart: ' + result.message);
    }
}
