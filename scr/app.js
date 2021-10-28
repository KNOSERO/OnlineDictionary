const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

//app.use('/account', require('./routes'));
app.use('/dictionary', require('./routes/dictionary'));

app.listen(PORT, () => {
    console.log('APP WORK ...');
});