import type { TransportOptions} from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


export const emailConfig = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS
    }
} as TransportOptions