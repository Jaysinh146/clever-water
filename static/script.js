// script.js

// Function to validate login form
function validateLogin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return false;
    }

    return true;
}

// Function to validate registration form
function validateRegister() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (!email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    if (password.length < 8) {
        alert("Password should be at least 8 characters long.");
        return false;
    }

    return true;
}

// Function to validate forgot password form
function validateForgotPassword() {
    var email = document.getElementById("email").value;

    if (!email) {
        alert("Please enter your email address.");
        return false;
    }

    return true;
}
