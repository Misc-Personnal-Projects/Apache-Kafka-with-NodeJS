/*===============================================================================================
          ENV VARIABLE INIT
===============================================================================================*/
require('dotenv').config();

// Create an object with the ENV variables
const config = {
  KafkaHost:process.env.KAFKA_HOST,
  KafkaTopic: process.env.KAFKA_TOPIC
};

module.exports = config;