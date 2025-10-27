// main.js
// ===============================
// -------------------------------
// بيانات المستخدم (محاكاة backend)
// -------------------------------
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let books = JSON.parse(localStorage.getItem("books")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// -------------------------------
// دالة حفظ البيانات في localStorage
// -------------------------------
function saveData() {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("books", JSON.stringify(books));
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("orders", JSON.stringify(orders));
}

// -------------------------------
// بيع كتاب (sell-book.html)
// -------------------------------
const sellForm = document.getElementById("sellForm");
if (sellForm) {
    sellForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("bookName").value;
        const author = document.getElementById("bookAuthor").value;
        const condition = document.getElementById("bookCondition").value;
        const price = document.getElementById("bookPrice").value;
        const image = document.getElementById("bookImage").value;

        const newBook = {
            id: Date.now(),
            name,
            author,
            condition,
            price,
            image,
            seller: currentUser ? currentUser.email : "unknown"
        };

        books.push(newBook);
        saveData();
        alert("Book was sent succesfully!");
        sellForm.reset();
    });
}

// -------------------------------
// سلة المشتريات (cart.html)
// -------------------------------
const cartContainer = document.getElementById("cartContainer");
if (cartContainer) {
    renderCart();

    function renderCart() {
        cartContainer.innerHTML = "";
        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>The cart is empty.</p>";
            return;
        }
        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: ${item.price} EGP</p>
                <button onclick="removeFromCart(${index})">Delete</button>
            `;
            cartContainer.appendChild(div);
        });
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        saveData();
        renderCart();
    };
}

// -------------------------------
// إتمام الشراء (checkout.html)
// -------------------------------
const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function() {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const newOrder = {
            id: Date.now(),
            user: currentUser ? currentUser.email : "guest",
            items: [...cart],
            status: "In Progress"
        };

        orders.push(newOrder);
        cart = [];
        saveData();

        alert("Ordered Successfully!");
        window.location.href = "my-orders.html";
    });
}

// -------------------------------
// صفحة الطلبات (my-orders.html)
// -------------------------------
const ordersContainer = document.getElementById("ordersContainer");
if (ordersContainer) {
    renderOrders();

    function renderOrders() {
        ordersContainer.innerHTML = "";
        if (orders.length === 0) {
            ordersContainer.innerHTML = "<p>There are no orders at the moment.</p>";
            return;
        }

        orders.forEach(order => {
                    const div = document.createElement("div");
                    div.className = "order";
                    div.innerHTML = `
                <h3>Order Number: ${order.id}</h3>
                <p>Condition: ${order.status}</p>
                <ul>
                    ${order.items.map(item => `<li>${item.name} - ${item.price} EGP</li>`).join("")}
                </ul>
            `;
            ordersContainer.appendChild(div);
        });
    }
}

// -------------------------------
// الملف الشخصي (profile.html)
// -------------------------------
const profileContainer = document.getElementById("profileContainer");
if (profileContainer && currentUser) {
    document.getElementById("profileName").value = currentUser.name || "";
    document.getElementById("profileEmail").value = currentUser.email || "";
    document.getElementById("profilePhone").value = currentUser.phone || "";

    const profileForm = document.getElementById("profileForm");
    profileForm.addEventListener("submit", function (e) {
        e.preventDefault();
        currentUser.name = document.getElementById("profileName").value;
        currentUser.phone = document.getElementById("profilePhone").value;
        saveData();
        alert("Profile was updated successfully!");
    });
}
