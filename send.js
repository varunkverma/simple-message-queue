const amqp = require("amqplib/callback_api");

// connect to rabbitMQ server
amqp.connect("amqp://localhost", (err0, connection) => {
  if (err0) {
    throw err0;
  }

  // creating a channel, most of the API for getting things done resides here
  connection.createChannel((err1, channel) => {
    if (err1) {
      throw err1;
    }

    //  declaring a queue to use
    const queue = "hello";

    // message to send over
    const msg = "Hello World";

    // attaching queue to the channel
    channel.assertQueue(queue, {
      durable: false,
    });

    // sending msg
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(`[=>] Send ${msg}`);
  });

  // closing the connection and exiting
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});
