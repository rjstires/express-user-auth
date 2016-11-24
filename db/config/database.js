module.exports.production = {
	client: 'pg',
	connection: {
		host: 'db',
		user: 'postgres',
		password: '',
		database: 'postgres',
		charset: 'utf8',
	},
	pool: {
		min: 1,
		max: 7,
	},
	migrations: {
		directory: '../migrations',
	},
};

module.exports.development = {
	client: 'pg',
	connection: {
		host: 'db',
		user: 'postgres',
		password: '',
		database: 'postgres',
		charset: 'utf8',
	},
	pool: {
		min: 1,
		max: 7,
	},
	migrations: {
		directory: '../migrations',
	},
};
