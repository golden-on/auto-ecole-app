const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

app.post('/save-user', (req, res) => {
    const userData = req.body;

    fs.writeFile('user-data.json', JSON.stringify(userData, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send('User data saved successfully');
    });
});

app.post('/logIn', (req, res) => {
    const { username, password } = req.body;

    fs.readFile('user-data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal Server Error');
        }

        const savedUserData = JSON.parse(data);

        if (savedUserData.username === username && savedUserData.password === password) {
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});