require('dotenv').config();
const moongose = require('mongoose');

const url = process.env.MONGOURL;

moongose.connect(url, {
    useNewUrlParser: true
});

const express = require('express');
const cors = require('cors')
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());

require('./passport')();

app.use('/account', require('./routes/account'));
app.use('/dictionary', require('./routes/dictionary'));

app.use((error, req, res, next) => {
    console.log("Error Handling Middleware called");
    console.log('Path: ', req.path);
    res.status(500).send(error);
});

app.listen(PORT, () => {
    console.log('APP WORK ...');
});