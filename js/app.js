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
    return;
};

function validateStudentNumber(studentNumber) {
    if (studentNumber.trim() === "") {
        studentNumberError.textContent = "Student Number cannot be empty.";
        return false;
    } else if (!/^\d{2}-\d{4}-\d{3}$/.test(studentNumber.trim())) {
        studentNumberError.textContent = "Invalid Student Number.";
        return false;
    }
    studentNumberError.textContent = "";
    return;
};

function isValidStudentNumber(value) {
    return /^\d{2}-\d{4}-\d{3}$/.test(value.trim());
};

function isValidPassword(value) {
    return value.length >= 8 &&
           /[A-Z]/.test(value) &&
           /[0-9]/.test(value);
};

function validateEmail(email) {
    if (email.trim() === "") {
        emailError.textContent = "Email cannot be empty.";
        return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = "Please insert a valid email.";
        return false;
    }
    emailError.textContent = "";
    return true;
};

function validateMobileNumber(contactNumber) {
    if (contactNumber.trim() === "") {
        mobileNumberError.textContent = "Contact Number cannot be empty.";
        return false;
    } else if (!/^(?:\+63|63|0)9\d{9}$/.test(contactNumber)) {
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

function validateCourse() {
    if (course.value === "") {
        courseError.textContent = "Please select your course.";
        return false;
    }
    courseError.textContent = "";
    return true;
};

function validateTerms() {
    if (!terms.checked) {
        termsError.textContent = "You must agree to the terms.";
        return false;
    }
    termsError.textContent = "";
    return true;
};


registerBtn.addEventListener('click', function () {
    validateName(fullName.value);
    validateStudentNumber(studentNumber.value);
    validateEmail(email.value);
    validateMobileNumber(mobileNumber.value);
    validatePassword(password.value);
    validateConfirmPassword(confirmPassword.value);
    validateCourse(course.value);
    validateTerms(terms.value);
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { isValidStudentNumber, isValidPassword };
}

document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    
    document.getElementById("summaryName").textContent = data.get("fullName");
    document.getElementById("summaryStudentNumber").textContent = data.get("studentNumber");
    document.getElementById("summaryEmail").textContent = data.get("email");
    document.getElementById("summaryMobileNumber").textContent = data.get("mobileNumber");

    const selectedCourse = form.elements["course"];
    const label = selectedCourse.options[selectedCourse.selectedIndex].text;
    document.getElementById("summaryCourse").textContent = label;
    
    document.getElementById("registrationSummary").hidden = false;
    form.reset();
});