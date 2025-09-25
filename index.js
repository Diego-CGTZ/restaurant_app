import express from 'express';
import { sendEmail } from './email.service.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.post('/api/email', async (req, res) => {
    const { to, subject, name, message } = req.body;
    try {
        await sendEmail({ to, subject, name, message });
        res.json({ ok: true, message: 'Correo enviado correctamente' });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});