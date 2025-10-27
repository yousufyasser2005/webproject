// === حماية الصفحات (Route Protection) ===

// الصفحات التي لا تحتاج لتسجيل دخول
const publicPages = ["index.html", "about.html", "contact.html", "login.html", "register.html"];

// الحصول على اسم الصفحة الحالية
const currentPage = window.location.pathname.split("/").pop();

// التحقق من حالة تسجيل الدخول
const loggedInUser = localStorage.getItem("loggedInUser");

// لو المستخدم مش مسجل دخول والصفحة مش عامة → تحويله للـ login
if (!loggedInUser && !publicPages.includes(currentPage)) {
    window.location.href = "login.html";
}

// === تسجيل الدخول (مثال) ===
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (email && password) {
                // حفظ بيانات المستخدم (مؤقتاً)
                localStorage.setItem("loggedInUser", JSON.stringify({ email }));
                alert("تم تسجيل الدخول بنجاح!");
                window.location.href = "index.html"; // رجوع للرئيسية
            } else {
                alert("من فضلك أدخل البريد وكلمة المرور.");
            }
        });
    }

    // === تسجيل الخروج ===
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            alert("تم تسجيل الخروج.");
            window.location.href = "login.html";
        });
    }
});
