const kafka = require('kafka-node');
const bp = require('body-parser');
const config = require('config');

try {
    const Producer = kafka.Producer;
    const client = new kafka.KafkaClient({kafkaHost:'shail-kafkaServer:9092,shail-kafkaServer:9093,shail-kafkaServer:9094'});
    const producer = new kafka.Producer(client);
    const kafka_topic = 'shailtest';
    console.log(kafka_topic);
    let payloads = [
        {
            topic: config.kafka_topic,
            messages: 'This land is my land. That land is your land'
        }
    ];

    producer.on('ready', async function() {
        let push_status = producer.send(payloads, (err, data) => {
            if (err) {
                console.log('[kafka-producer -> '+kafka_topic+']: broker update failed');
            } else {
                console.log('[kafka-producer -> '+kafka_topic+']: broker update success');
            }
        });
    });

    producer.on('error', function(err) {
        console.log(err);
        console.log('[kafka-producer -> '+kafka_topic+']: connection errored');
        throw err;
    });
}
catch(e) {
    console.log(e);
}