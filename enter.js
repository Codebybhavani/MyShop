document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const userDetailsForm = document.getElementById("userDetailsForm");
    
    

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("loginUsername").value;
            localStorage.setItem("loggedInUser", username);
            alert("Login Successful!");
            window.location.href = "index.html";
        });
    }

    // Handle Signup
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("signupUsername").value;
            localStorage.setItem("registeredUser", username);
            alert("Signup Successful!");
            window.location.href = "index.html";
        });
    }

    // Handle Cosmetic Recommendation Form
    if (userDetailsForm) {
        userDetailsForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Your recommendations will be shown soon!");
        });
    }
});
