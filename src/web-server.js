const express = require('express');
const open = require('open');
const app = express();
app.use(express.static('src/client/public'));
console.log(process.env);
app.listen(1337, () => {
    console.log('Express running: http://127.0.0.1:1337')
})

app.post('/test', (req, res) => {
    res.send('it workz!');
})
//open('http://127.0.0.1:1337');