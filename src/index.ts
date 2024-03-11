import amqp from "amqplib";
import { amqpConfig } from "./configs/amqp.config";
import emailService from './services/email.service'
import renderService from './services/render.service'
import { randomUUID } from "crypto";


(async () => {
    try {
        const connection = await amqp.connect(amqpConfig.connection);
        const channel = await connection.createChannel();
        process.once("SIGINT", async () => {
            await channel.close();
            await connection.close();
        });
        await channel.assertQueue(amqpConfig.queue, { durable: true })
        channel.prefetch(1);
        await channel.consume(
            amqpConfig.queue,
            async (message) => {
                if (message) {
                    const label = randomUUID()
                    console.time(label)
                    try {
                        const { to, subject, template, data } = JSON.parse(message.content.toString())
                        const html = await renderService.ejsToHtml(data, template)
                        const result: Record<string, string> = await emailService.sendEmail({ to, subject, html })
                        channel.ack(message);
                        console.log(`Message sent : ${result?.accepted}`)
                    } catch (err) {
                        console.log(err)
                    }
                    console.timeEnd(label)
                }
            },
            { noAck: false }
        )
        console.log(" [*] Waiting for messages. To exit press CTRL+C");
    } catch (err) {
        console.log(err);
    }
})()


