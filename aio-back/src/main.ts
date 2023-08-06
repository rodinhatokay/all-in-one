import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { BusinessService } from './business/business.service';

// declare module 'express-session' {
//   export interface SessionData {
//     jwt: { access_token: string };
//   }
// }

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);
	const businessService = app.get(BusinessService);
	await businessService.findAll();

	// app.use(
	//   session({
	//     secret: process.env.SESSION_KEY,
	//     resave: false,
	//     saveUninitialized: false,
	//   }),
	// );

	app.set('trust proxy', true);

	app.enableCors({
		origin: [
			'http://localhost:5173',
			'http://localhost:19000',
			'http://localhost:8081',
			'http://localhost:3000',
			'wwww.allinoneocean.com',
			'allinoneocean.com',
		],
	});

	// app.useGlobalFilters(new HttpExceptionFilter());
	// app.useGlobalInterceptors(
	//   new WrapResponseInterceptor(),
	//   new TimeoutInterceptor(),
	// );
	// app.useGlobalGuards(new ApiKeyGuard());
	app.setGlobalPrefix('api');

	const options = new DocumentBuilder()
		.setTitle('aio-back')
		.setDescription('activity log history poc appliction')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup('api/docs', app, document);

	await app.listen(3001);
}
bootstrap();
