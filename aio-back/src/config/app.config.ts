import { getDbConfig } from "../database/db.config";

export default () => {
	const env = process.env.NODE_ENV || "development";
	const dbConfig = getDbConfig();
	return {
		environment: env,
		database: dbConfig,
		twilio: {
			authToken: process.env.TWILIO_AUTH_TOKEN,
			accountSid: process.env.TWILIO_ACCOUNT_SID,
		},
		jwtKey: process.env.JWT_KEY,
	};
};
