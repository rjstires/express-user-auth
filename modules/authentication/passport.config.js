const User = require('../user/user.schema');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, verifyUser));

/**
 * TODO This can be extracted out to the user.schema
 * @param {String} email
 * @param {String} password
 * @param {Function} done
 */
function verifyUser(email, password, done) {
    User.where({email: email})
        .fetch()
        .then(function(user) {
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }

            return user.validatePassword(password)
                .then(function(valid) {
                    if (valid) {
                        return done(null, user);
                    }

                    return done(null, false, {message: 'Invalid password.'});
                })
                .catch(function(err) {
                    return done(err);
                });
        })
        .catch(function(err) {
            return done(err);
        });
}

module.exports = passport;
