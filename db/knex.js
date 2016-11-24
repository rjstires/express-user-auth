const knex = require('knex');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/database')[env];

module.exports = knex(config);
