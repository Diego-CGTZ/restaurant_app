import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD
    }
});

export const sendEmail = async ({ to, subject, name, message }) => {
    try {
        console.log('Configurando transporter con:', {
            user: process.env.USER_EMAIL,
            hasPassword: !!process.env.PASSWORD
        });
        
        const htmlTemplate = `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
                .container { background: #fff; max-width: 600px; margin: 40px auto; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
                h1 { color: #333; }
                p { color: #555; }
                .footer { margin-top: 30px; font-size: 12px; color: #aaa; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>¡Hola ${name}!</h1>
                <p>${message}</p>
                <div class="footer">
                    Restaurante API &copy; 2025
                </div>
            </div>
        </body>
        </html>
        `;
        
        console.log('Enviando correo a:', to);
        const result = await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to,
            subject,
            html: htmlTemplate
        });
        
        console.log('Correo enviado exitosamente:', result.messageId);
        return result;
    } catch (error) {
        console.error('Error enviando correo:', error);
        throw error;
    }
};