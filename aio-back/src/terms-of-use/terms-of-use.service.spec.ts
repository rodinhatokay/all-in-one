import { Test, TestingModule } from '@nestjs/testing';
import { TermsOfUseService } from './terms-of-use.service';

describe('TermsOfUseService', () => {
  let service: TermsOfUseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TermsOfUseService],
    }).compile();

    service = module.get<TermsOfUseService>(TermsOfUseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
