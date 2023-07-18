import { Module } from '@nestjs/common';

@Module({
	providers: [
		{
			provide: 'OnModuleInit',
			useFactory: () => {
				// const logger = new Logger('MockSpacesModule');
				// logger.log('MockSpacesModule initialized');
				console.log('MockSpacesModule initialized');
				return {};
			},
		},
	],
})
export class MockSpacesModule {}
