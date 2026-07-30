import { Test, TestingModule } from '@nestjs/testing';
import { AspirantService } from './aspirant.service';

describe('AspirantService', () => {
  let service: AspirantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AspirantService],
    }).compile();

    service = module.get<AspirantService>(AspirantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
