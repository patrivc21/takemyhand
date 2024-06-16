import configEnv from "../config/config"
import { createTransport } from "nodemailer"
import { Usuarios } from "../entities/Usuarios"

const emailConf = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: configEnv.EMAIL_USER,
      pass: configEnv.SECRET_KEY_EMAIL,
    },
}

const transporter = createTransport(emailConf)

export const sendLoginEmail = async (user: Usuarios) => {
    try {
        const info = await transporter.sendMail({
            from: configEnv.EMAIL_USER,
            to: user.email,
            subject: "🎉 Registro en TakeMyHand 🎉",
            text: `¡Bienvenido ${user.nombre} ${user.apellidos}!\n Su cuenta ha sido creada con éxito.\n`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #167496;">
                    <h2 style="color: #4CAF50;"> Registro en TakeMyHand ✅ </h2>
                    <p>Querido/a <strong>${user.nombre}</strong>,</p>
                    <p>Nos complace informarle que su cuenta ha sido creada con éxito. 🎊</p>
                    <p>Su contraseña es: <strong>${user.password}</strong></p>
                    <p>Gracias por unirse a nosotros. 😊</p>
                    <p>Atentamente,</p>
                    <p><strong>El equipo de TakeMyHand</strong> 🤝💙</p>
                </div>
            `,
        })
        
    } catch (error) {
        console.log(error)
        return false;
    }
    return true;
}

export const sendEmail = async (to: string, subject: string, text: string) => {
    try {
        const info = await transporter.sendMail({
            from: "takemyhand@server.com",
            to,
            subject,
            text,
        })
    } catch (error) {
        console.log(error)
        return false;
    }
    return true;
}