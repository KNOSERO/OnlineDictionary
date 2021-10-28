const express = require('express');
const router = express.Router();

const lang = require('../function/lang')();
const TextEditing = require('../function/textEditing');
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
    const textEditing = TextEditing();
    textEditing.set(req.body.text);
    textEditing.iterateToLine(line => 
        line.map((word, index) => {
            return { 
                word: word, 
                correct: index ? lang.findWord(word, req.params.lang) 
                               : lang.findWordWithLarge(word, req.params.lang) 
            }
        }));

    res.status(200).json(textEditing.get());
});

module.exports = router;