// Az API URL a Render.com-on futó backendhez
const API_URL = 'https://salvatore.onrender.com/generate-key';

// Kulcs lekérése a backendről
async function fetchKey() {
    try {
        const response = await fetch(API_URL, { method: 'POST' });
        const data = await response.json();
        if (response.ok) {
            displayKey(data.key, data.expiration);
        } else {
            console.error('Hiba történt:', data.message);
        }
    } catch (error) {
        console.error('Szerver elérhetetlen:', error);
    }
}

// Kulcs megjelenítése
function displayKey(key, expiration) {
    const keyBox = document.querySelector('.key-box');
    const expirationText = document.querySelector('.expiration-text');
    keyBox.textContent = key;

    const expirationDate = new Date(expiration);
    expirationText.textContent = `Key valid until: ${expirationDate.toLocaleString()}`;
}

// Kulcs másolása
function copyKey() {
    const keyBox = document.querySelector('.key-box');
    const range = document.createRange();
    range.selectNodeContents(keyBox);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');

    const button = document.querySelector('.copy-button');
    button.textContent = 'Key Copied!';
    setTimeout(() => {
        button.textContent = 'Copy Key';
    }, 1500);
}

window.onload = fetchKey;
