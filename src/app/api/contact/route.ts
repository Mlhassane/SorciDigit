import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { firstName, lastName, email, phone, company, service, project } = data;

        // Build the transporter using SMTP settings
        // Defaulting to Gmail as an example. You'll need to set these in your .env.local file
        // Configuration SMTP pour Hostinger
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true, // true for port 465, false for port 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'contact@sorcidigit.com', // Change this to the email where you want to receive notifications
            subject: `Nouveau lead : ${service} - ${firstName} ${lastName}`,
            html: `
        <h2>Nouvelle demande de projet : ${service}</h2>
        <p><strong>Nom complet:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone || 'Non renseigné'}</p>
        <p><strong>Entreprise:</strong> ${company || 'Non renseignée'}</p>
        <p><strong>Service souhaité:</strong> ${service}</p>
        <br/>
        <h3>Description du projet :</h3>
        <p>${project}</p>
      `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Email envoyé avec succès' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erreur lors de l\'envois de l\'email:', error);
        return NextResponse.json(
            { message: 'Erreur Serveur: Impossible d\'envoyer le message.' },
            { status: 500 }
        );
    }
}
