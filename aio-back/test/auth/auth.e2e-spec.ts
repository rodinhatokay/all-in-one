import { INestApplication, ValidationPipe, HttpServer } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../src/auth/auth.module';
import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import * as session from 'express-session';

describe('[Feature] Auth - ', () => {
	let app: INestApplication;
	let httpServer: HttpServer;

	const user = {
		email: 'test@test.com',
		pasword: 'Password!2',
		companyName: 'companyName',
	};

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({
					envFilePath: ['.env.test'],
				}),
				AuthModule,
				TypeOrmModule.forRoot({
					type: 'postgres',
					host: 'localhost',
					port: 5433,
					username: 'postgres',
					password: 'pass123',
					database: 'postgres',
					autoLoadEntities: true,
					synchronize: true,
				}),
			],
		}).compile();

		app = moduleFixture.createNestApplication();
		// this is imported in higher order module so thats why we need to set it here also
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				transform: true,
				forbidNonWhitelisted: true,
				transformOptions: {
					enableImplicitConversion: true,
				},
			}),
		);

		app.use(
			session({
				secret: process.env.SESSION_KEY,
				resave: false,
				saveUninitialized: false,
				cookie: {
					secure: false,
				},
			}),
		);

		await app.init();
		httpServer = app.getHttpServer();
	});

	it('Sign up [POST /signup]', async () => {
		const { body, statusCode } = await request(httpServer)
			.post('/auth/signup')
			.send({
				email: user.email,
				password: user.pasword,
				confirmPassword: user.pasword,
				companyName: user.companyName,
			});
		expect(body.access_token).toBeDefined();
		expect(statusCode).toEqual(201);
	});

	it('Sign in [POST /signin]', async () => {
		const { body, statusCode } = await request(httpServer)
			.post('/auth/signin')
			.send({
				email: user.email,
				password: user.pasword,
			});
		expect(body.access_token).toBeDefined();
		expect(statusCode).toEqual(201);
	});

	it('Sign out [POST /signout]', async () => {
		const signInResponse = await request(httpServer)
			.post('/auth/signin')
			.send({
				email: user.email,
				password: user.pasword,
			})
			.expect(201);

		const { header } = signInResponse;
		// check that there is cookie
		expect(header['set-cookie']).toBeDefined();

		const signOutResp = await request(httpServer)
			.post('/auth/signout')
			.set('Cookie', [...header['set-cookie']])
			.send()
			.expect(200);
		// check that there is no more cookie
		expect(signOutResp.header['set-cookie']).toBeUndefined();
	});

	afterAll(async () => {
		await app.close();
	});
});
