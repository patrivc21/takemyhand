"use strict";
// import configEnv from "../config/config"
// import { createTransport } from "nodemailer"
// import { User } from "../entities/toprx/User"
// const emailConf = {
//     host: 'mail.topdigital.es',
//     port: 465,
//     secure: true,
//     auth: {
//         user: configEnv.EMAIL_ADMIN,
//         pass: configEnv.EMAIL_ADMIN_PASSWORD
//     },
// }
// const transporter = createTransport(emailConf)
// export const sendLoginEmail = async (user: User) => {
//     try {
//         const info = await transporter.sendMail({
//             from: `"ADMIN TOP RX" <${configEnv.EMAIL_ADMIN}>`,
//             to: user.email,
//             subject: "Registro en TOP RX ✔",
//             text: `Buenas ${user.usuario}, su cuenta ha sido creada con éxito.\nSu contraseña es: ${user.password}`,
//         })
//     } catch (error) {
//         console.log(error)
//         return false;
//     }
//     return true;
// }
// export const sendEmail = async (to: string, subject: string, text: string) => {
//     try {
//         const info = await transporter.sendMail({
//             from: `"ADMIN TOP RX" <${configEnv.EMAIL_ADMIN}>`,
//             to,
//             subject,
//             text,
//         })
//     } catch (error) {
//         console.log(error)
//         return false;
//     }
//     return true;
// }
//# sourceMappingURL=mail.helper.js.map