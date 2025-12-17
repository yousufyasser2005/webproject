document.addEventListener("DOMContentLoaded", async () => {
    console.log("Profile page loaded");
    
    const token = localStorage.getItem('token');
    const userDataString = localStorage.getItem("user");
    
    console.log("Token from localStorage:", token);
    console.log("User data from localStorage:", userDataString);

    // If no token or user data, redirect to login
    if (!token || !userDataString) {
        console.log("No token or user data found, redirecting to login");
        window.location.href = "login.html";
        return;
    }

    const userData = JSON.parse(userDataString);
    console.log("Parsed user data:", userData);

    // Display user info
    document.getElementById("displayName").textContent = userData.name || "Not specified";
    document.getElementById("displayEmail").textContent = userData.email || "Not specified";
    document.getElementById("displayPhone").textContent = userData.phone || "Not specified";

    // Update nav based on role
    if (userData.role === "administrator") {
        const nav = document.querySelector(".main-nav");
        nav.innerHTML = `
            <a href="manage book.html" class="nav-link">Manage Books</a>
            <a href="index.html" class="nav-link">Home</a>
            <a href="manage-orders.html" class="nav-link">Manage Orders</a>
            <a href="manage user.html" class="nav-link">Manage Users</a>
            <a href="profile.html" class="nav-link active">Profile</a>
        `;
    }

    // Logout button logic
    document.getElementById("logoutBtn").addEventListener("click", async () => {
        const confirmLogout = confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            console.log("Logging out...");
            
            // Call API to logout
            const result = await apiCall('/auth/logout', 'POST');
            console.log("Logout result:", result);

            // Clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            console.log("LocalStorage cleared");
            
            window.location.href = "login.html";
        }
    });
});
