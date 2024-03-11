import nodemailer from 'nodemailer'
import { emailConfig } from '../configs/email.config'


interface IEmailDto {
    to: string
    subject: string
    html: string
}
const sendEmail = async ({ to, subject, html }: IEmailDto): Promise<Record<string, string>> => {
    try {
        const transporter = nodemailer.createTransport(emailConfig)
        const result = await transporter.sendMail({
            from: 'Фидбэк <noreply@feedback24.ru>',
            to,
            subject,
            html
        }) as Record<string, string>
        return result

    } catch (e) {
        console.log(e)
        throw new Error('Failed to send email')
    }
}

export default {
    sendEmail
}
