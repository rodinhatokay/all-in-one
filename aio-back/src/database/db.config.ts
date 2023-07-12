import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Otp } from "../otp/entities/otp.entity";
import { Business } from "../business/entities/business.entity";
import { Location } from "../business/entities/location.entity";
import { OpeningHours } from "../common/entities/openingHours.entity";
import { join } from "path";
import { readFileSync } from "fs";
import { User } from "../users/entities/user.entity";

export const getDbConfig = (): TypeOrmModuleOptions => {
	const env = process.env.NODE_ENV || "development";
	const isDevMode = env.trim() === "development";

	const commonConfig: TypeOrmModuleOptions = {
		type: "postgres",
		host: process.env.DATABASE_HOST || "localhost",
		port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
		username: process.env.DATABASE_USER || "postgres",
		password: process.env.DATABASE_PASS || "pass123",
		entities: [User, Otp, Business, Location, OpeningHours],
	};

	const devConfig: TypeOrmModuleOptions = {
		...commonConfig,
		synchronize: true,
	};

	const prodConfig: TypeOrmModuleOptions = {
		...commonConfig,
		migrationsRun: true,
		migrations: [join(__dirname, "migrations/*{.ts,.js}")],
		ssl: {
			ca: !isDevMode ? readFileSync("/etc/ssl/certs/ca-certificate.crt") : null,
		},
		synchronize: false,
	};

	return isDevMode ? devConfig : prodConfig;
};
