const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const os = require("os");
const configurePassport = function () {
    const opts = {}
    opts.secretOrKey = "skn" + os.hostname();
    opts.passReqToCallback = true;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.algorithms = ["HS256", "HS384"];
    passport.use(new JwtStrategy(opts, function (req, payload, done) {
        done(null, payload);
    }));
    return passport;
};
module.exports.configurePassport = configurePassport;