let bookshelf = require('bookshelf');
let database = require('../../db/knex');
let bcrypt = require('bcryptjs');
let bookshelfImpl = bookshelf(database);
let Promise = require('bluebird');

let User = bookshelfImpl.Model.extend({
    tableName: 'users',
    idAttribute: 'id',
    initialize: function() {
        this.on('saving', this.hashPassword, this);
    },

    /* Instance Methods */
    validatePassword: function(challenge) {
        challenge = challenge.toLowerCase().trim();
        let hashedPassword = this.get('password');

        return new Promise(function(resolve, reject) {
            bcrypt.compare(challenge, hashedPassword, function(err, valid) {
                if (err) reject(err);
                resolve(valid);
            });
        });
    },

    hashPassword: function(model, attrs, options) {
        let password = model.attributes.password.toLowerCase().trim();

        return new Promise(function(resolve, reject) {
            bcrypt.genSalt(10, function(err, salt) {
                if (err) reject(err);
                model.set('passwordSalt', salt);
                bcrypt.hash(password, salt, function(err, hash) {
                    if (err) reject(err);
                    model.set('password', hash);
                    resolve(hash);
                });
            });
        });
    },
}, {
    /* Static Methods */
});


module.exports = User;
