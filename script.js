let expirationTime = 24 * 60 * 60 * 1000; // 24 óra
let startTime;
let lastUpdateTime;
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

    function resetTimer() {
        const key = generateKey();
        keyBox.textContent = key;
        startTime = Date.now();
        lastUpdateTime = startTime;

        if (intervalId) {
            cancelAnimationFrame(intervalId);
        }

        function updateTimer() {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            const remainingTime = expirationTime - elapsedTime;

            if (remainingTime <= 0) {
                resetTimer(); // Új kulcs és időzítő, ha lejár az idő
            } else {
                const hours = Math.floor(remainingTime / (1000 * 60 * 60));
                const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                expirationText.textContent = `Key valid for: ${hours} hours ${minutes} minutes ${seconds} seconds`;
            }

            // Tovább hívjuk az updateTimer-t a következő frame-ben
            intervalId = requestAnimationFrame(updateTimer);
        }

        updateTimer(); // Indítjuk az időzítést
    }

    resetTimer();
}

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

window.onload = () => {
    updateKey();
};
