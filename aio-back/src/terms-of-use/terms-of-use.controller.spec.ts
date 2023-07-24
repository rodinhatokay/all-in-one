import { Test, TestingModule } from '@nestjs/testing';
import { TermsOfUseController } from './terms-of-use.controller';

describe('TermsOfUseController', () => {
  let controller: TermsOfUseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TermsOfUseController],
    }).compile();

    controller = module.get<TermsOfUseController>(TermsOfUseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
