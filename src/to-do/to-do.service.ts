import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToDo } from './to-do.entity';

@Injectable()
export class ToDoService {
    constructor(
        @InjectRepository(ToDo)
        private activityGroupRepo: Repository<ToDo>,
    ) {}
    
    async findAll():  Promise<ToDo[]>{
        return this.activityGroupRepo.find();
    }

    async findOneByActivyGroup(id: number): Promise<ToDo | null>{
        return this.activityGroupRepo.findOneBy({'activity_group_id': id});
    }

    async findOneById(id: number): Promise<ToDo | null>{
      return this.activityGroupRepo.findOneBy({'todo_id': id});
  }

    async remove(id: number): Promise<void> {
        await this.activityGroupRepo.delete(id);
    }

    async update(id: number, newData: Partial<ToDo>): Promise<void> {
        await this.activityGroupRepo.update(id, newData);
    }

    async create(newData: Partial<ToDo>): Promise<void> {
        await this.activityGroupRepo.save(newData);
    }
    
}
