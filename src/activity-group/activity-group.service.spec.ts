import { Test, TestingModule } from '@nestjs/testing';
import { ActivityGroupService } from './activity-group.service';

describe('ActivityGroupService', () => {
  let service: ActivityGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityGroupService],
    }).compile();

    service = module.get<ActivityGroupService>(ActivityGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
