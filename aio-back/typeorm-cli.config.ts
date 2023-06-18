import { DataSource } from "typeorm";
import { User } from "./src/users/entities/user.entity";
import { Otp } from "./src/otp/entities/otp.entity";
import { join } from "path";
import { readFileSync } from "fs";

export default new DataSource({
	type: "postgres",
	host: process.env.DATABASE_HOST || "127.0.0.1",
	port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
	username: process.env.DATABASE_USER || "postgres",
	password: process.env.DATABASE_PASS || "pass123",
	database: process.env.DATABASE_DB || "postgres",
	entities: [User, Otp],
  migrations: [
    join(__dirname,'/src/migrations/*.js'),    
	], 
  // TODO: comment for dev mode at the moment
	ssl: {
	  ca: readFileSync("/etc/ssl/certs/ca-certificate.crt"),
	},
	migrationsRun: true,
});
