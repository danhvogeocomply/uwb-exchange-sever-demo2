const mqtt = require('mqtt');
const client = mqtt.connect({
    host: 'localhost',
    port: 21883
});

client.subscribe('session', () => { console.log('Subscribed to topic session')});
client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    client.end();
});