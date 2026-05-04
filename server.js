const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

// Call C program
app.get('/run-c', (req, res) => {
    exec('parking.exe', (error, stdout, stderr) => {
        if (error) {
            return res.send("Error running C program");
        }
        res.send(`<pre>${stdout}</pre>`);
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
