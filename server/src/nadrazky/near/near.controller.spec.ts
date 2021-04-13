import { Test, TestingModule } from '@nestjs/testing';
import { NearController } from './near.controller';

describe('Near Controller', () => {
  let controller: NearController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NearController],
    }).compile();

    controller = module.get<NearController>(NearController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
