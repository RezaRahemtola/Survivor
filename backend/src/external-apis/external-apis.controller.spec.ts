import { Test, TestingModule } from '@nestjs/testing';
import { ExternalApisController } from './external-apis.controller';
import { ExternalApisService } from './external-apis.service';

describe('ExternalApisController', () => {
  let controller: ExternalApisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalApisController],
      providers: [ExternalApisService],
    }).compile();

    controller = module.get<ExternalApisController>(ExternalApisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
