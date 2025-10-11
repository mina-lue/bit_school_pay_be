import { Test, TestingModule } from '@nestjs/testing';
import { TelebirrController } from './telebirr.controller';

describe('TelebirrController', () => {
  let controller: TelebirrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelebirrController],
    }).compile();

    controller = module.get<TelebirrController>(TelebirrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
