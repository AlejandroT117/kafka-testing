const { Kafka } = require('kafkajs');
const Chance = require('chance');

const chance = Chance()

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092']
})

const producer = kafka.producer()

const produceMessage = async ()=>{
  try{
    await producer.connect()
    await producer.send({
      topic: 'animals',
      messages: [
        { value: chance.animal() },
      ],
    })
  }catch(e){

  }
}

const run = async () => {
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  })

}

setInterval(() => {
  produceMessage()
}, 1000);