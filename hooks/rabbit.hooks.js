var amqp = require("amqplib");

const { RABBITMQ } = process.env;
var conn = amqp.connect("amqp://guest:guest@" + RABBITMQ);

const up = async () => {
    conn.then(function (conn) {
        console.log("channel createdd")
        return conn.createChannel().then(function (ch) {
          var q = "sms";
          ch.assertExchange("app", "direct");
          ch.assertQueue(q, { durable: true });
          ch.bindQueue(q, "app", "");
        });
      });
}

const getConn = () => {
    return conn;
}
module.exports = { up, getConn }