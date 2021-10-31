const moongose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const appSchema = moongose.Schema({
    name: {
        type: String,
        unique: true
    },
    countService: {
        type: Number,
        default: 0
    },
});

appSchema.plugin(passportLocalMongoose, {usernameField: 'name'});

const AppModel = moongose.model('app', appSchema);
module.exports = AppModel;