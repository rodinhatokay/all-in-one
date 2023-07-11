import { readFileSync } from "fs";
import { join } from "path";
import { User } from "../users/entities/user.entity";
import { Otp } from "../otp/entities/otp.entity";
import { Business } from "../business/entities/business.entity";
import { Location } from "../business/entities/location.entity";
import { OpeningHours } from "../common/entities/openingHours.entity";

export default () => {
	const env = process.env.NODE_ENV || "development";
	return {
		environment: env,
		database: {
			type: "postgres",
			host: process.env.DATABASE_HOST || "127.0.0.1",
			port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
			username: process.env.DATABASE_USER || "postgres",
			password: process.env.DATABASE_PASS || "pass123",
			database: process.env.DATABASE_DB || "postgres",
			migrationsRun: true,
			migrations: [join(__dirname, "/src/migrations/*.js")],
			entities: [User, Otp, Business, Location, OpeningHours],
			ssl:
				env === "development"
					? undefined
					: {
							ca: readFileSync("/etc/ssl/certs/ca-certificate.crt"),
					  },
			synchronize: env === "development",
		},
		twilio: {
			authToken: process.env.TWILIO_AUTH_TOKEN,
			accountSid: process.env.TWILIO_ACCOUNT_SID,
		},
		jwtKey: process.env.JWT_KEY,
	};
};
