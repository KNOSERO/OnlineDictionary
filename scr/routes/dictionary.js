const express = require('express');
const router = express.Router();

const lang = require('../function/lang')();
lang.readDictionaries(__dirname + '/../lang/');

router.post('/:lang/wordwithgreat/', async (req, res, next) => {
    if(lang.findWordWithLarge(req.body.word, req.params.lang))
        res.status(200).json(req.body.word);
    else
        res.status(404).json({
            word: req.body.word,
            massage: 'Nie istnieje takie słowo dla tego słownika'
        });
});

router.post('/:lang/normalword/', async (req, res, next) => {
    if(lang.findWord(req.body.word, req.params.lang))
        res.status(200).json(req.body.word);
    else
        res.status(404).json({
            word: req.body.word,
            massage: 'Nie istnieje takie słowo dla tego słownika'
        });
});

router.post('/:lang/sentence/', async (req, res, next) => {
    
});

module.exports = router;