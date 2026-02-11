const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Landing page
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Venture ⚡️</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, sans-serif; background: #0f0f23; color: #fff; min-height: 100vh; }
        .container { max-width: 600px; margin: 0 auto; padding: 60px 20px; text-align: center; }
        h1 { font-size: 2rem; margin-bottom: 20px; }
        .emoji { font-size: 3rem; margin-bottom: 20px; }
        p { color: #888; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="emoji">⚡️</div>
        <h1>Coming Soon</h1>
        <p>This venture is being built by Catalyst.</p>
    </div>
</body>
</html>
    `);
});

app.listen(PORT, () => {
    console.log(`⚡️ $NAME running on port ${PORT}`);
});
