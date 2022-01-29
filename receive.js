const amqp = require("amqplib/callback_api");

// creating a connection
amqp.connect("amqp://localhost", (err0, connection) => {
  if (err0) {
    throw err0;
  }

  // creating a channel
  connection.createChannel((err1, channel) => {
    if (err1) {
      throw err1;
    }

    // declaring queue and listening to this queue
    const queue = "hello";
    channel.assertQueue(queue, {
      durable: false,
    });
    // we declare the queue here, as well. Because we might start the consumer before the publisher, we want to make sure the queue exists before we try to consume messages from it.

    // tell the server to deliver us the messages from the queue. Since it will push us messages asynchronously, we provide a callback that will be executed when RabbitMQ pushes messages to our consumer.
    console.log(`[*] Waiting for message in ${queue}. To exit press CTRL + c`);

    channel.consume(
      queue,
      (msg) => {
        console.log(`[<=] Received: ${msg.content.toString()}`);
      },
      {
        noAck: true,
      }
    );
  });
});
