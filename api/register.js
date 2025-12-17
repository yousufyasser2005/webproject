document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const selectedRole = document.querySelector('input[name="role"]:checked');
    const message = document.getElementById("message");

    // Clear previous messages
    message.textContent = "";
    message.className = "error-message";

    // Validate role
    if (!selectedRole) {
        message.textContent = "❌ Please select a role.";
        return;
    }

    const role = selectedRole.value;

    // Validate phone number
    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(phone)) {
        message.textContent = "❌ Phone number must be 11 digits and contain numbers only.";
        return;
    }

    // Validate password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        message.textContent = "❌ Password must be at least 8 characters and include both letters and numbers.";
        return;
    }

    // Validate confirm password
    if (confirmPassword !== password) {
        message.textContent = "❌ Passwords do not match.";
        return;
    }

    // Call API to register user
    const result = await apiCall('/auth/register', 'POST', {
        name,
        email,
        phone,
        password,
        role
    });

    if (result.success) {
        message.className = "success-message";
        message.textContent = "✅ Account created successfully! Redirecting...";
        
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    } else {
        message.textContent = "❌ " + (result.message || "Registration failed");
    }
});
