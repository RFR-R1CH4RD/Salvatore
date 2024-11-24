// Az API URL a Render.com-on futó backendhez
const API_URL = 'https://salvatore.onrender.com/generate-key';

// Kulcs lekérése a backendről
async function fetchKey() {
    try {
        const response = await fetch(API_URL, { method: 'POST' });

        // Ellenőrizzük, hogy a válasz JSON
        if (!response.ok) {
            throw new Error(`Szerver hiba: ${response.status}`);
        }

        const data = await response.json();

        // Ellenőrizzük, hogy a válasz tartalmazza a várt adatokat
        if (!data.key || !data.expiration) {
            throw new Error('Érvénytelen válaszformátum.');
        }

        displayKey(data.key, data.expiration);
    } catch (error) {
        console.error('Hiba történt a kulcs lekérésekor:', error.message);
        alert('Hiba történt a kulcs lekérésekor! Kérlek próbáld újra később.');
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
