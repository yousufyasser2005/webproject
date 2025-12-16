document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const selectedRole = document.querySelector('input[name="login_role"]:checked').value;
    const message = document.getElementById("message");

    // Clear previous messages
    message.textContent = "";
    message.className = "error-message";

    console.log("Attempting login with:", { email, role: selectedRole });

    // Call API to login
    const result = await apiCall('/auth/login', 'POST', {
        email,
        password,
        login_role: selectedRole
    });

    console.log("Login result:", result);

    if (result.success) {
        // Store token and user data in localStorage
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data));

        console.log("Token stored:", localStorage.getItem('token'));
        console.log("User stored:", localStorage.getItem('user'));

        message.className = "success-message";
        message.textContent = "✅ Login successful! Redirecting...";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    } else {
        message.textContent = "❌ " + (result.message || "Login failed");
        console.error("Login failed:", result);
    }
});
