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

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
        status: error.status || 500,
        message: error.message || "Internal Server Error",
        },
    });
});

app.get('/', (req, res) => {res.send("Serwer Działa")})

app.listen(PORT, () => {
    console.log('APP WORK ...');
});