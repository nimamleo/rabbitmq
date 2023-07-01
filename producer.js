const amqp = require("amqplib");

const QueueName = "myQueue";

async function connectToService() {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertQueue(QueueName, { durable: true });
    channel.sendToQueue(QueueName, Buffer.from("test message"), {
        persistent: true,
    });
    console.log("message sent");
    setTimeout(() => {
        connection.close();
        process.exit(0);
    },1000);
}

for (let index = 0; index < 10; index++) {
    connectToService();
    
}

