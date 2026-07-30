import { Test, TestingModule } from '@nestjs/testing';
import { AspirantController } from './aspirant.controller';

describe('AspirantController', () => {
  let controller: AspirantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AspirantController],
    }).compile();

    controller = module.get<AspirantController>(AspirantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
