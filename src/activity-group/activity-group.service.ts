import { Injectable } from '@nestjs/common';
import { ActivityGroup } from './activity-group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityGroupService {
    constructor(
        @InjectRepository(ActivityGroup)
        private activityGroupRepo: Repository<ActivityGroup>,
    ) {}
    
    async findAll():  Promise<ActivityGroup[]>{
        return this.activityGroupRepo.find();
    }

    async findOneById(id: number): Promise<ActivityGroup | null>{
        return this.activityGroupRepo.findOneBy({'activity_id': id});
    }

    async remove(id: number): Promise<void> {
        await this.activityGroupRepo.delete(id);
    }

    async update(id: number, newData: Partial<ActivityGroup>): Promise<void> {
        await this.activityGroupRepo.update(id, newData);
    }

    async create(newData: Partial<ActivityGroup>): Promise<void> {
        await this.activityGroupRepo.save(newData);
    }
    
}
