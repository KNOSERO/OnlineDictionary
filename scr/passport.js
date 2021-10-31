const passport = require('passport');
const passportJWT = require('passport-jwt');
const AppModel = require('./model/application');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

async function verifyCallback(payload, done) {
    return AppModel.findOne({_id: payload.id})
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            return done(err);
        });
}

module.exports = function() {
    const config = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    };

    passport.use(AppModel.createStrategy());
    passport.use(new JWTStrategy(config, verifyCallback));
}