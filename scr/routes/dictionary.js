const express = require('express');
const router = express.Router();

const iwtAuth = require('./middlewares');

const AppModel = require('../model/application');

const TextEditing = require('../function/textEditing');

const lang = require('../function/lang')();
lang.readDictionaries(__dirname + '/../lang/');

router.post('/:lang/wordwithgreat/', iwtAuth, async (req, res, next) => {
    if(lang.findWordWithLarge(req.body.word, req.params.lang))
        res.status(200).json(req.body.word);
    else
        res.status(404).json({
            word: req.body.word,
            massage: 'Nie istnieje takie słowo dla tego słownika'
        });
});

router.post('/:lang/normalword/', iwtAuth, async (req, res, next) => {
    if(lang.findWord(req.body.word, req.params.lang))
        res.status(200).json(req.body.word);
    else
        res.status(404).json({
            word: req.body.word,
            massage: 'Nie istnieje takie słowo dla tego słownika'
        });
});

router.post('/:lang/sentence/', iwtAuth, async (req, res, next) => {
    AppModel.findOneAndUpdate({_id: req.user._id}, {$inc: {'countService': 1}}).exec();
    
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

router.get('/', iwtAuth, async(req, res, next) => {
    AppModel.findOne({_id: req.user._id}).then(app => {
        res.status(200).json({
            count: app.countService
        });
    });
});

module.exports = router;