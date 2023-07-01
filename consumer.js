const amqp = require("amqplib");

const QueueName = "myQueue";

async function reciveMessage() {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    channel.assertQueue(QueueName, { durable: true });
    let index = 0;
    await channel.consume(QueueName, (msg) => {
        const random = Math.floor(Math.random() * 10);
        const timeOut = 1000 * random;
        setTimeout(() => {
            console.log(msg.content.toString());
            index++;
            channel.ack(msg);
        }, timeOut);
    });
}

reciveMessage();
