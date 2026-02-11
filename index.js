const express = require('express');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 3005;

// In-memory storage (use Redis in production)
const urlMap = new Map();
const clickStats = new Map();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Create short URL
app.post('/api/shorten', (req, res) => {
    const { longUrl, code } = req.body;
    
    if (!longUrl) {
        return res.status(400).json({ error: 'URL is required' });
    }
    
    const shortCode = code || crypto.randomBytes(3).toString('hex');
    
    if (urlMap.has(shortCode)) {
        return res.status(400).json({ error: 'Code already exists' });
    }
    
    urlMap.set(shortCode, longUrl);
    clickStats.set(shortCode, 0);
    
    res.json({ code: shortCode, longUrl, clicks: 0 });
});

// Redirect short URL
app.get('/:code', (req, res) => {
    const { code } = req.params;
    const longUrl = urlMap.get(code);
    
    if (longUrl) {
        clickStats.set(code, clickStats.get(code) + 1);
        res.redirect(longUrl);
    } else {
        res.redirect('/');
    }
});

// Get stats
app.get('/api/stats/:code', (req, res) => {
    const { code } = req.params;
    res.json({ code, clicks: clickStats.get(code) || 0 });
});

// Start server
app.listen(PORT, () => {
    console.log(`⚡️ LinkLite running on http://localhost:${PORT}`);
});
