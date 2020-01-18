/*===============================================================================================
          KAFKA INIT
===============================================================================================*/

// Kafka related imports
const config  = require('./env/config');
const kafka = require('kafka-node');

// Define Kafka Producer Class
const Producer = kafka.Producer;
// Create a new instance of kafka client according to env variables
const client = new kafka.KafkaClient(config.KafkaHost);
// Create a new instance of producer within the kafka client
const producer = new Producer(client);


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