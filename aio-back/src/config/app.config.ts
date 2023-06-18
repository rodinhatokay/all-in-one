export default () => ({
	environment: process.env.NODE_ENV || "development",
	database: {
		host: process.env.DATABASE_HOST || "127.0.0.1",
		port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
		user: process.env.DATABASE_USER,
		pass: process.env.DATABASE_PASS,
		db: process.env.DATABASE_DB,
		migrationsRun: true
	},
	twilio: {
		authToken: process.env.TWILIO_AUTH_TOKEN,
		accountSid: process.env.TWILIO_ACCOUNT_SID,
	},
	jwtKey: process.env.JWT_KEY,
});
