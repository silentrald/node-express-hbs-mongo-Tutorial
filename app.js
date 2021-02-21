const express = require('express');

const app = express();

const PORT = 5000;

const indexRtr = require('./routers/index');
app.get('/', indexRtr);

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
});