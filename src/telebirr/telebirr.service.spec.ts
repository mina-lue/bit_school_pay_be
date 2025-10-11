import { Test, TestingModule } from '@nestjs/testing';
import { TelebirrService } from './telebirr.service';

describe('TelebirrService', () => {
  let service: TelebirrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelebirrService],
    }).compile();

    service = module.get<TelebirrService>(TelebirrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
