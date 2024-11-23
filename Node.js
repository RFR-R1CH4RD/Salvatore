const express = require('express');
const app = express();
const port = 3000;
let startTime = Date.now(); // Kezdési idő (24 órás időszak elindítása)
let expirationTime = 24 * 60 * 60 * 1000; // 24 óra
let currentKey = generateKey();

function generateKey() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 27; i++) {
        let char = characters.charAt(Math.floor(Math.random() * characters.length));
        key += char;
    }
    return key;
}

// API endpoint a kulcs és az idő lekérdezésére
app.get('/getKey', (req, res) => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const remainingTime = expirationTime - elapsedTime;

    if (remainingTime <= 0) {
        // Ha lejárt az idő, új kulcs generálása
        currentKey = generateKey();
        startTime = Date.now(); // Kezdési idő újraindítása
    }

    res.json({
        key: currentKey,
        remainingTime: remainingTime
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
