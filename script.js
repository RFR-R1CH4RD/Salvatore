let expirationTime;  // A kulcs lejárati ideje
let startTime;
let intervalId;

function generateKey() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 27; i++) {
        let char = characters.charAt(Math.floor(Math.random() * characters.length));
        key += char;
    }
    return key;
}

function updateKey() {
    const keyBox = document.querySelector('.key-box');
    const expirationText = document.querySelector('.expiration-text');

    // API hívás a kulcs lekérésére
    fetch('/api/generate-key')
        .then(response => response.json())
        .then(data => {
            const key = data.key;
            const expirationDate = data.expirationDate;

            keyBox.textContent = key;
            expirationTime = expirationDate - Date.now();  // Frissítjük a lejárati időt

            // Frissítjük az időzítőt
            function updateTimer() {
                const remainingTime = expirationDate - Date.now();

                if (remainingTime <= 0) {
                    expirationText.textContent = "Key expired";
                    resetTimer();  // Új kulcsot generálunk, ha lejárt
                } else {
                    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
                    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                    expirationText.textContent = `Key valid for: ${hours} hours ${minutes} minutes ${seconds} seconds`;
                }

                requestAnimationFrame(updateTimer); // Frissítés
            }
            updateTimer();  // Indítjuk az időzítőt
        });
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

// Az oldal betöltődésekor frissítjük a kulcsot
window.onload = () => {
    updateKey();
};
