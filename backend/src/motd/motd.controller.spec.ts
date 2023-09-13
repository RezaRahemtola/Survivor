import { Test, TestingModule } from '@nestjs/testing';
import { MotdController } from './motd.controller';
import { MotdService } from './motd.service';

describe('MotdController', () => {
  let controller: MotdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotdController],
      providers: [MotdService],
    }).compile();

    controller = module.get<MotdController>(MotdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
