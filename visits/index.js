const express = require('express');
const redis = require('redis'); 

const app = express();
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});

client.set('visit_count', 0);

app.get('/', (req, res) => {
    client.get('visit_count', (err, value) => {
        res.send('Number of visits: ' + value);
        client.set('visit_count', parseInt(value) + 1);
    });
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
})
