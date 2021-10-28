const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

//app.use('/account', require('./routes'));
app.use('/dictionary', require('./routes/dictionary'));

app.use((error, req, res, next) => {
    console.log("Error Handling Middleware called");
    console.log('Path: ', req.path);
    res.status(500).send(error);
});

app.listen(PORT, () => {
    console.log('APP WORK ...');
});