import { Controller, Get, Query } from '@nestjs/common';
import { TermsOfUseService } from './terms-of-use.service';
import { Public } from '../common/decorators/public.decorator';
import { Language } from '../common/constants/langauges';

@Controller('terms-of-use')
export class TermsOfUseController {
	constructor(private readonly termsOfUseService: TermsOfUseService) {}

	@Public()
	@Get()
	async findOneByLanguage(
		@Query('language') language: Language,
		@Query('contentOnly') contentOnly?: boolean,
	) {
		const termsOfUse = await this.termsOfUseService.findOneByLanguage(language);
		if (contentOnly) return termsOfUse.content;
		return termsOfUse;
	}
}

