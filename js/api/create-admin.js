document.getElementById('admin-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const id = document.getElementById('id').value.trim();

    const errorMsg = document.getElementById('error-msg');
    errorMsg.textContent = '';
    errorMsg.style.display = 'none';

    // Validate email format
    const emailRegex = /^[^\s@]+@MintLib\.com$/i;
    if (!emailRegex.test(email)) {
        errorMsg.textContent = 'Admin email must end with @MintLib.com';
        errorMsg.style.display = 'block';
        return;
    }

    // Call API to create admin
    const result = await apiCall('/auth/create-admin', 'POST', { name, email, id });

    if (result.success) {
        // Show success message
        document.getElementById('form-container').classList.add('hidden');
        document.getElementById('success-container').classList.remove('hidden');
    } else {
        // Show error message
        errorMsg.textContent = result.message || 'Failed to create admin';
        errorMsg.style.display = 'block';
    }
});
