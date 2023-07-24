import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TermsOfUse } from './entities/terms-of-use.entity';
import { Repository } from 'typeorm';
import { Language } from '../common/constants/langauges';
import { ErrorMessages } from '../common/errors/errorMessage';

@Injectable()
export class TermsOfUseService {
	constructor(
		@InjectRepository(TermsOfUse)
		private readonly termsOfUseRepository: Repository<TermsOfUse>,
	) {}

	async findOneByLanguage(language: Language) {
		const termsOfUse = await this.termsOfUseRepository.findOne({
			where: {
				language,
			},
		});
		if (!termsOfUse) {
			throw new NotFoundException(ErrorMessages.TermsOfUseDoesntExist);
		}
		return termsOfUse;
	}
}

