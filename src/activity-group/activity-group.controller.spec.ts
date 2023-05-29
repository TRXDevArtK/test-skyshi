import { Test, TestingModule } from '@nestjs/testing';
import { ActivityGroupController } from './activity-group.controller';

describe('ActivityGroupController', () => {
  let controller: ActivityGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityGroupController],
    }).compile();

    controller = module.get<ActivityGroupController>(ActivityGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
