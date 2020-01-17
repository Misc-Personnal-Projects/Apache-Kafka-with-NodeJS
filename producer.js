const config  = require('./config');
const jsonData = require('./app_json.js');
const kafka = require('kafka-node');

const Producer = kafka.Producer;
const KeyedMessage = kafka.KeyedMessage;
const client = new kafka.KafkaClient(config.KafkaHost);
const producer = new Producer(client);
const km = new KeyedMessage('key', 'message');

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