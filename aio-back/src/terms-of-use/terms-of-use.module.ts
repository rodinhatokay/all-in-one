import { Module } from '@nestjs/common';
import { TermsOfUseController } from './terms-of-use.controller';
import { TermsOfUseService } from './terms-of-use.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermsOfUse } from './entities/terms-of-use.entity';

@Module({
	imports: [TypeOrmModule.forFeature([TermsOfUse])],
	controllers: [TermsOfUseController],
	providers: [TermsOfUseService],
})
export class TermsOfUseModule {}

