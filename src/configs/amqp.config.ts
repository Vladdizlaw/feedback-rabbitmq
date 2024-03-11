import dotenv from "dotenv";
dotenv.config();

export const amqpConfig = {
    host: process.env.AMQP_HOST,
    connection: `amqp://${process.env.AMQP_USER}:${process.env.AMQP_PASSWORD}@${process.env.AMQP_HOST}`,
    queue: process.env.AMQP_QUEUE
}
