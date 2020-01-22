/*===============================================================================================
          KAFKA INIT
===============================================================================================*/

// Kafka related imports
const config  = require('./config');
const kafka = require('kafka-node');

// Define Kafka Producer Class
const Producer = kafka.Producer;
// Create a new instance of kafka client according to env variables
const client = new kafka.KafkaClient(config.KafkaHost);
// Create a new instance of producer within the kafka client
const producer = new Producer(
  client, 
  {
    // Configuration for when to consider a message as acknowledged, default 1
    requireAcks: 1,
    // The amount of time in milliseconds to wait for all acks before considered, default 100ms
    ackTimeoutMs: 100,
    // Partitioner type (default = 0, random = 1, cyclic = 2, keyed = 3, custom = 4), default 0
    partitionerType: 2
  });


/*===============================================================================================
          JSON READ
===============================================================================================*/

// JSON Data reading imports
const fs = require("fs");

// Get content from file
var contents = fs.readFileSync("data.json");
// Define to JSON type
var jsonData = JSON.parse(contents);


/*===============================================================================================
          PRODUCE THE RETRIEVE JSON DATA TO KAFKA TOPIC
===============================================================================================*/

// Create the payload to send
const payloadToKafkaTopic = [{topic: config.KafkaTopic, messages: JSON.stringify(jsonData), partition:0 }];

producer.on('ready', function () {
  producer.send(payloadToKafkaTopic, function (err, data) {
        console.info('Sent payload to Kafka: ', payloadToKafkaTopic);
        if (err) {
        console.error(err);
      } else {
        console.log('data: ', data);
      }
  });
});
   
producer.on('error', function (err) {})