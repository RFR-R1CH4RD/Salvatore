const express = require('express');
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // UUID könyvtár a kulcsokhoz

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // JSON adatok fogadása

// Endpoint a kulcs generálásához
app.post('/generate-key', (req, res) => {
    try {
        const key = uuidv4().replace(/-/g, '').slice(0, 27); // 27 karakter hosszú kulcs
        const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 órás lejárat
        res.json({ key, expiration });
    } catch (error) {
        console.error('Error generating key:', error);
        res.status(500).json({ message: 'Hiba történt a kulcs generálása közben' });
    }
});

// Statikus fájlok kiszolgálása
app.use(express.static('public'));

// Alapértelmezett válasz
app.get('/', (req, res) => {
    res.send('API működik!');
});

// Server indítása
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
