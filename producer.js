const config  = require('./config');
//const jsonData = require('./app_json.js');
const kafka = require('kafka-node');

const Producer = kafka.Producer;
const client = new kafka.KafkaClient(config.KafkaHost);
const producer = new Producer(client);

// Define JSON File
const fs = require("fs");
console.log("\n *STARTING* \n");
// Get content from file
var contents = fs.readFileSync("data.json");
// Define to JSON type
var jsonData = JSON.parse(contents);
// Get Value from JSON
console.log(jsonData);
console.log("\n *EXIT* \n");

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