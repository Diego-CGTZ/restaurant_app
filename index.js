import express from 'express';
import { sendEmail } from './email.service.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.get('/api', (req, res) => {
    res.json({
        message: 'Restaurant API',
        version: '1.0.0',
        endpoints: {
            'GET /': 'Mensaje de bienvenida',
            'GET /api': 'Información de la API',
            'POST /api/email': 'Enviar email'
        }
    });
});

app.post('/api/email', async (req, res) => {
    const { to, subject, name, message } = req.body;
    
    // Validaciones básicas
    if (!to || !subject || !name || !message) {
        return res.status(400).json({ 
            ok: false, 
            error: 'Todos los campos son requeridos',
            required: ['to', 'subject', 'name', 'message'],
            received: { to: !!to, subject: !!subject, name: !!name, message: !!message }
        });
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
        return res.status(400).json({ 
            ok: false, 
            error: 'El campo "to" debe ser un email válido' 
        });
    }
    
    try {
        const result = await sendEmail({ to, subject, name, message });
        res.json({ 
            ok: true, 
            message: 'Correo enviado correctamente',
            details: result
        });
    } catch (error) {
        console.error('Error en /api/email:', error.message);
        res.status(500).json({ 
            ok: false, 
            error: 'Error interno del servidor al enviar el email',
            details: error.message 
        });
    }
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});