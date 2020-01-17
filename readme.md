# Ressources

### Install Zookeeper
[Zookeeper configuration on Linux](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-an-apache-zookeeper-cluster-on-ubuntu-18-04)

### Install Kafka
[Kafka configuration on Linux](https://www.digitalocean.com/community/tutorials/how-to-install-apache-kafka-on-ubuntu-18-04)

### Original Repo
[Git repo original](https://github.com/firebase007/kafka_producer_consumer_tutorial)

# Single Node

### Start Zookeeper
```
systemctl start zk
```

### Start a single node Kafka
```
systemctl start kafka
```

### Create a topic
```
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic <topic_name>
```

### Produce a message
```
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic <topic_name>
```

### Consume messages
```
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic <topic_name> --from-beginning
```

# Multiple nodes

### Start all brokers
```
cd /opt/kafka
sudo bin/kafka-server-start.sh config/server.b1.properties
sudo bin/kafka-server-start.sh config/server.b2.properties
sudo bin/kafka-server-start.sh config/server.b3.properties
```

### Check in Zookeeper if all brokers have been started
```
cd /opt/zookeeper
bin/zkCli.sh -server localhost:2181
ls /brokers/ids
```

### Create a topics on multiple nodes and check if it's correctly created
```
cd /opt/kafka
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 3 --partitions 1 --topic <topic_name>
bin/kafka-topics.sh --list --zookeeper localhost:2181
bin/kafka-topics.sh --describe --zookeeper localhost:2181 --topic <topic_name>
```

### Delete a topics
```
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic <topic_name>
cd /opt/zookeeper
bin/zkCli.sh -server localhost:2181
get /brokers/topics/<topic_name>
deleteall /brokers/topics/<topic_name>
deleteall /admin/delete_topics/<topic_name>
```

### Stop all brokers
```
sudo bin/kafka-server-stop.sh
```
