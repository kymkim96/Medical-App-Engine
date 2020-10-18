require('dotenv');
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const params = {
    secretOrKey: process.env.JWT_SECRET ||
        'failover-secret-key-here',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};
const { User } = require('./models');

module.exports = (passport) => {
    passport.use(new Strategy(params, async (payload, done) => {
        try {
            if (payload) {
                const user = await User.findOne({ where: { id: payload.id }});
                if (!user) {
                    done(null, false);
                }
                done(null, user);
                return;
            }
            done(null, false);
        } catch(error) {
            console.error(error);
            return done(error);
        }
    }));
};