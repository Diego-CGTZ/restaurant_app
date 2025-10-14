import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE || 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
});

export const sendEmail = async ({ to, subject, name, message }) => {
    try {
        if (!to || !subject || !name || !message) {
            throw new Error('Todos los campos son requeridos: to, subject, name, message');
        }

        const mailOptions = {
            from: `"${name}" <${process.env.USER}>`,
            to: to,
            subject: subject,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Mensaje de: ${name}</h2>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
                        <p style="font-size: 16px; line-height: 1.6; color: #555;">
                            ${message}
                        </p>
                    </div>
                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
                    <p style="font-size: 12px; color: #888;">
                        Este email fue enviado desde Restaurant API
                    </p>
                </div>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        
        console.log('Email enviado exitosamente:', result.messageId);
        return {
            success: true,
            messageId: result.messageId,
            message: 'Email enviado correctamente'
        };

    } catch (error) {
        console.error('Error al enviar email:', error.message);
        throw new Error(`Error al enviar email: ${error.message}`);
    }
};
