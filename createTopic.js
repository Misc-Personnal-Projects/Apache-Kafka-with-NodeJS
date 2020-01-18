/*===============================================================================================
          KAFKA INIT
===============================================================================================*/
const kafka = require('kafka-node');
const config  = require('./config');
// Create a new instance of kafka client according to env variables
const client = new kafka.KafkaClient({kafkaHost: config.KafkaHost});
// Create a new topic to be created within Kafka
const topicToCreate = [{
  topic: config.KafkaTopic,
  partitions: 1,
  replicationFactor: 3
}
];

/*===============================================================================================
          KAFKA TOPIC CREATION
===============================================================================================*/

client.createTopics(topicToCreate, (error, result) => {
  // result is an array of any errors if a given topic could not be created
  console.log(result, 'topic created successfully');
});
