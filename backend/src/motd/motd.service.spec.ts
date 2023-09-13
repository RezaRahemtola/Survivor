import { Test, TestingModule } from '@nestjs/testing';
import { MotdService } from './motd.service';

describe('MotdService', () => {
  let service: MotdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotdService],
    }).compile();

    service = module.get<MotdService>(MotdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
