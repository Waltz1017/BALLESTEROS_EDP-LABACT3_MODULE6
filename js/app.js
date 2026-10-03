function isValidPassword(value) {
    return value.length >= 8 &&
        /[A-Z]/.test(value) &&
        /[0-9]/.test(value) &&
        /[@$!]/.test(value);
};

function isValidStudentNumber(value) {
    return /^\d{2}-\d{4}-\d{3}$/.test(value.trim());
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { isValidStudentNumber, isValidPassword };
}

const fullName = document.getElementById('fullName');
const studentNumber = document.getElementById('studentNumber');
const email = document.getElementById('email');
const mobileNumber = document.getElementById('mobileNumber');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const course = document.getElementById('course');
const terms = document.getElementById('terms');
const registerBtn = document.getElementById('registerBtn');
const resetBtn = document.getElementById('resetBtn');

const fullNameError = document.getElementById('fullNameError');
const studentNumberError = document.getElementById('studentNumberError');
const emailError = document.getElementById('emailError');
const mobileNumberError = document.getElementById('mobileNumberError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const courseError = document.getElementById('courseError');
const termsError = document.getElementById('termsError');

function validateName(name) {
    if (name.trim() === "") {
        fullNameError.textContent = "Fullname cannot be empty.";
        return false;
    } else if (name.trim().length < 2) {
        fullNameError.textContent = "Fullname must be at least 2 characters.";
        return false;
    }
    fullNameError.textContent = "";
    return true;
}

fullName.addEventListener("blur", () => {
    validateName(fullName.value);
});

function validateStudentNumber(studentNumber) {
    if (studentNumber.trim() === "") {
        studentNumberError.textContent = "Student Number cannot be empty.";
        return false;
    } else if (!/^\d{2}-\d{4}-\d{3}$/.test(studentNumber.trim())) {
        studentNumberError.textContent = "Enter a student number in the format 24-1234-123.";
        return false;
    }
    studentNumberError.textContent = "";
    return true;
};

function validateEmail(email) {
    if (email.trim() === "") {
        emailError.textContent = "Email cannot be empty.";
        return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = "Please insert a valid email and follow the required format.";
        return false;
    }
    emailError.textContent = "";
    return true;
};

function validateMobileNumber(contactNumber) {
    if (contactNumber.trim() === "") {
        mobileNumberError.textContent = "Contact Number cannot be empty.";
        return false;
    } else if (!/^(?:09|\+639)\d{9}$/.test(contactNumber.trim())) {
        mobileNumberError.textContent = "Invalid. Please use Philippine Number.";
        return false;
    }
    mobileNumberError.textContent = "";
    return true;
};

password.addEventListener('input', function () {
    validatePassword(password.value);
});

function validatePassword(password) {
    if (password === "") {
        passwordError.textContent = "Please insert your password here.";
        return false;
    } else if (password.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters.";
        return false;
    } else if (!/[A-Z]/.test(password)) {
        passwordError.textContent = "Add at least one uppercase letter.";
        return false;
    } else if (!/[0-9]/.test(password)) {
        passwordError.textContent = "Add at least one number.";
        return false;
    } else if (!/[@$!]/.test(password)) {
        passwordError.textContent = "Add at least one of @, $, or !.";
        return false;
    } else if (/\s/.test(password)) {
        passwordError.textContent = "Password must not contain spaces.";
        return false;
    }
    passwordError.textContent = "";
    return true;
};

function validateConfirmPassword(confirmPassword) {
    if (confirmPassword.trim() === "") {
        confirmPasswordError.textContent = "Please insert your password here.";
        return false;
    } else if (password.value !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords does not match.";
        return false;
    }
    confirmPasswordError.textContent = "";
    return true;
}
confirmPassword.addEventListener("input", () => validateConfirmPassword(confirmPassword.value));
password.addEventListener("input", () => {
    if (confirmPassword.value !== "") validateConfirmPassword(confirmPassword.value);
});

function validateCourse() {
    if (course.value === "") {
        courseError.textContent = "Please select your course.";
        return false;
    }
    courseError.textContent = "";
    return true;
}

course.addEventListener("change", () => {
    validateCourse(course.value);
});

function validateTerms() {
    if (!terms.checked) {
        termsError.textContent = "You must agree to the terms.";
        return false;
    }
    termsError.textContent = "";
    return true;
}
terms.addEventListener("change", () => {
    validateTerms(terms.checked);
});

resetBtn.addEventListener('click', function () {
    document.querySelectorAll('.input').forEach(function (input) {
        input.value = "";
    });

    document.querySelectorAll('.errorMessage').forEach(function (elements) {
        elements.textContent = "";
    });

    course.selectedIndex = 0;
    terms.checked = false;
});



document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Run every validator so ALL errors show at once
    const results = [
        validateName(fullName.value),
        validateStudentNumber(studentNumber.value),
        validateEmail(email.value),
        validateMobileNumber(mobileNumber.value),
        validatePassword(password.value),
        validateConfirmPassword(confirmPassword.value),
        validateCourse(),
        validateTerms()
    ];

    // Stop here if anything failed: no success message, no summary
    if (results.includes(false)) {
        document.getElementById("successMessage").hidden = true;
        document.getElementById("registrationSummary").hidden = true;
        return;
    }

    // Everything is valid: show the summary using textContent
    document.getElementById("summaryName").textContent = fullName.value.trim();
    document.getElementById("summaryStudentNumber").textContent = studentNumber.value.trim();
    document.getElementById("summaryEmail").textContent = email.value.trim();
    document.getElementById("summaryMobileNumber").textContent = mobileNumber.value.trim();
    document.getElementById("summaryCourse").textContent = course.value;

    const success = document.getElementById("successMessage");
    success.textContent = "Registration details validated successfully!";
    success.hidden = false;

    document.getElementById("registrationSummary").hidden = false;
});