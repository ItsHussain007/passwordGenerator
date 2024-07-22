const lowerCase = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];

const numbers = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
];

const specialChar = [
    "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?"
];

const capitalChar = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

let filters = [];

function updateFilters() {
    const checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]');
    filters = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            filters.push(checkbox.value);
        }
    });
    console.log('Selected filters:', filters);
}

function passwordbtn() {
    let charset = [...lowerCase, ...numbers, ...specialChar, ...capitalChar];
    
    if (filters.includes("noNumbers")) {
        charset = charset.filter(char => !numbers.includes(char));
    }
    if (filters.includes("noSpecialChar")) {
        charset = charset.filter(char => !specialChar.includes(char));
    }
    if (filters.includes("noCapitalChar")) {
        charset = charset.filter(char => !capitalChar.includes(char));
    }
    
    const password1 = generatePassword(15, charset);
    const password2 = generatePassword(15, charset);
    
    document.getElementById("pass-El1").innerText = password1;
    document.getElementById("pass-El2").innerText = password2;
}

function generatePassword(length, charset) {
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        console.log("Copied to clipboard: " + text);
        showNotification("Password copied!"); // Show the notification
    }).catch(function(err) {
        console.error("Failed to copy: ", err);
    });
}

function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = "notification show";

    setTimeout(function() {
        notification.className = notification.className.replace("show", "hide");
    }, 3000); // Notification disappears after 3 seconds
}
