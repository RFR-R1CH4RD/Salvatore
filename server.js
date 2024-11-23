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

// Endpoint a kulcs ellenőrzésére
app.get('/api/check-key/:key', (req, res) => {
    const key = req.params.key;
    const expirationDate = keys[key];
    
    if (expirationDate) {
        const remainingTime = expirationDate - Date.now();
        if (remainingTime > 0) {
            const hours = Math.floor(remainingTime / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            res.json({ valid: true, expirationTime: `${hours} hours ${minutes} minutes ${seconds} seconds` });
        } else {
            res.json({ valid: false, message: "Key expired" });
        }
    } else {
        res.json({ valid: false, message: "Invalid key" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
