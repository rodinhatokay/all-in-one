import { Module } from "@nestjs/common";
import { SpacesController } from "./spaces.controller";
import { ConfigModule } from "@nestjs/config";
import { SpacesServiceProvider } from "./SpacesService";
import { SpacesService } from "./SpacesService/SpacesService";
import awsConfig from "../config/aws.config";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [awsConfig],
		}),
	],
	controllers: [SpacesController],
	// provide both the service and the custom provider
	providers: [SpacesServiceProvider, SpacesService],
})
export class SpacesModule {}

