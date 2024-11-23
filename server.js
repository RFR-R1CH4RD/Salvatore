const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let keys = {};  // Tároljuk a kulcsokat és azok lejárati idejét

// Kulcs generálása
function generateKey() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 27; i++) {
        let char = characters.charAt(Math.floor(Math.random() * characters.length));
        key += char;
    }
    return key;
}

// Endpoint a kulcs kérésére
app.get('/api/generate-key', (req, res) => {
    const newKey = generateKey();
    const expirationTime = 24 * 60 * 60 * 1000;  // 24 óra
    const expirationDate = Date.now() + expirationTime;
    keys[newKey] = expirationDate;  // A kulcs és lejárati idő tárolása
    res.json({ key: newKey, expirationDate });
});

// A szerver indítása
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
