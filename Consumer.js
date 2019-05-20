const kafka = require('kafka-node');
const bp = require('body-parser');
const config = require('config');

try {
    const Consumer = kafka.HighLevelConsumer;
    const client = new kafka.KafkaClient({kafkaHost:'ubuntu-kafka:9091,ubuntu-kafka:9092,ubuntu-kafka:9093'});
    let consumer = new kafka.Consumer(
        client,
        [{ topic: 'Data',partition:0},{topic:'Data',partition:1},{topic:'Data',partition:2}],
        {
            autoCommit: true,
            fetchMaxWaitMs: 1000,
            fetchMaxBytes: 1024 * 1024,
            encoding: 'utf8',
            fromOffset: false
        }
    );
    consumer.on('message', async function(message) {
        console.log('here');
        console.log(
            'kafka-> ',
            message.value
        );
    })
    consumer.on('error', function(err) {
        console.log('error', err);
    });
}
catch(e) {
    console.log(e);
}