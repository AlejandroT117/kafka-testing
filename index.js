const app = require("express")();
const PORT = process.env.PORT || 8080;

const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  brokers: ["kafka1: 9092"],
});
const producer = kafka.producer();

app.use("/", (req, res) => {
  res.send("Hola Mundo");
});

app.use("/connection", async (req, res) => {
  await producer.connect();
  console.log("Kafka conectado")
});

app.use("/produceMessage", (req, res) => {
  
  await producer.send({
    topic: "test-topic",
    messages: [{ value: "Hello KafkaJS user!" }],
  });
});

app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}`);
});
