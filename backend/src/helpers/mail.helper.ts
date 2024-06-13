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
            subject: "Registro en TakeMyHand ✔",
            text: `Buenas ${user.nombre}, su cuenta ha sido creada con éxito.\nSu contraseña es: ${user.password}`,
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