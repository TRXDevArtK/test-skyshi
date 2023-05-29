import { Module } from '@nestjs/common';
import { ActivityGroup } from './activity-group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityGroupService } from './activity-group.service';
import { ActivityGroupController } from './activity-group.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ActivityGroup])],
    providers: [ActivityGroupService],
    controllers: [ActivityGroupController],
})
export class ActivityGroupModule {}
