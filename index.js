import express from "express";

const app = express();

app.get('/api', (req, res) => {
    res.send("Bienvenido a mi API");
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});