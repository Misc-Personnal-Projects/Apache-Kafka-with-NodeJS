/*===============================================================================================
          KAFKA INIT
===============================================================================================*/
const kafka = require('kafka-node');
const config = require('./config');

try {
  // Define Kafka Consumer Class
  const Consumer = kafka.Consumer;
  // Create a new instance of kafka client according to env variables
  const client = new kafka.KafkaClient({idleConnection: 24 * 60 * 60 * 1000,  kafkaHost: config.KafkaHost});
  // Create a new instance of producer within the kafka client and with custom options
  let consumer = new Consumer(
  client,
  [
    { topic: config.KafkaTopic, partition: 0, offset: 0 }
  ],
  {
    groupId: 'kafka-node-group',//consumer group id, default `kafka-node-group`
    // Auto commit config
    autoCommit: true,
    autoCommitIntervalMs: 5000, //1000
    // The max wait time is the maximum amount of time in milliseconds to block waiting if insufficient data is available at the time the request is issued, default 100ms
    fetchMaxWaitMs: 100,
    // This is the minimum number of bytes of messages that must be available to give a response, default 1 byte
    fetchMinBytes: 1,
    // The maximum bytes to include in the message set for this partition. This helps bound the size of the response.
    fetchMaxBytes: 1024 * 1024,
    // If set true, consumer will fetch message from the given offset in the payloads. True = from beginning, False = only listen new events
    fromOffset: false,
    // If set to 'buffer', values will be returned as raw buffer objects.
    encoding: 'utf8',
    keyEncoding: 'utf8'
  }
  );
  
  console.log(consumer.client.brokers);
  offset = new kafka.Offset(client);
  offset.fetch([
      { topic: config.KafkaTopic, partition: 0, time: Date.now(), maxNum: 1 }
    ], 
    function (err, data) {
      console.log(data);
    }
  );
   /*===============================================================================================
          RETRIEVE MESSAGES FROM KAFKA TOPIC
  ===============================================================================================*/

   consumer.on('message', async function(message) {
     console.log(
       'kafka ',
       JSON.parse(message.value) //Format to JSON
     );
   })
   consumer.on('error', function(error) {
     //  handle error 
     console.log('error', error);
   });
 }
 catch(error) {
   // catch error trace
   console.log(error);
 }