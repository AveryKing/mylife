const express = require('express');
const open = require('open');
const app = express();
app.use(express.static('src/client/public'));

app.listen(1337, () => {
    console.log('Express running: http://127.0.0.1:1337')
})

//open('http://127.0.0.1:1337');