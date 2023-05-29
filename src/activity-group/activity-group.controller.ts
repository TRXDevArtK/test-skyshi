import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityGroupService } from './activity-group.service';
import { get } from 'http';
import { ActivityGroup } from './activity-group.entity';

@Controller('activity-groups')
export class ActivityGroupController {
    private errorBuilder = {
        'errorMessage':'',
        'errorStatus':''
    };

    constructor(
        @Inject(ActivityGroupService)
        private activityGroupService: ActivityGroupService,
    ) {}

    @Get()
    async getAllActivityGroup(): Promise<Object> {
        try {
            const data = await this.activityGroupService.findAll();
            return {
                status: 'Success',
                message: 'Success',
                data: data,
            };
        } catch (error) {
            return {
                status: 'Error',
                message: 'Internal Server Error',
                data: {},
            };
        }
    }

    @Get(':id')
    async getActivityGroupById(@Param('id') id: number): Promise<Object> {
        try {
            const data = await this.activityGroupService.findOneById(id);

            // need to do this because there's no error in data, just null
            if (!data) {
                throw new Error('id is not found');
            }
            
            return {
                status: 'Success',
                message: 'Success',
                data: data,
            };
        } catch (error) {
            return {
                status: 'Not Found',
                message: 'Activity with ID '+id+' Not Found',
                data: {},
            };
        }
    }

    @Delete(':id')
    async deleteActivityGroupById(@Param('id') id: number): Promise<Object> {
        try {
            const data = await this.activityGroupService.findOneById(id);

            // need to do this because there's no error in data, just null
            if (!data) {
                this.errorBuilder.errorStatus = 'Not Found';
                this.errorBuilder.errorMessage = 'Activity with ID '+id+' Not Found';
                throw new Error();
            }

            //remove if no error
            this.activityGroupService.remove(id);

            return {
                status: 'Success',
                message: 'Success',
                data: {},
            };
        } catch (error) {
            return {
                status: this.errorBuilder.errorStatus,
                message: this.errorBuilder.errorMessage,
                data: {},
            };
        }
    }

    @Patch(':id')
    async updateActivityGroupById(@Param('id') id: number, @Body() data: Partial<ActivityGroup>): Promise<Object> {
        try {
            const find = await this.activityGroupService.findOneById(id);

            // need to do this because there's no error in data, just null
            if (!find) {
                this.errorBuilder.errorStatus = 'Not Found';
                this.errorBuilder.errorMessage = 'Activity with ID '+id+' Not Found';
                throw new Error();
            }

            if(!data.title && !data.email){
                this.errorBuilder.errorStatus = 'Bad Request';
                this.errorBuilder.errorMessage = 'title or email cannot be null';
                throw new Error();
            }

            //remove if no error
            await this.activityGroupService.update(id, data);

            find.title = data.title ?? find.title;
            find.email = data.email ?? find.email;

            return {
                status: 'Success',
                message: 'Success',
                data: find,
            };
        } catch (error) {
            return {
                status: this.errorBuilder.errorStatus,
                message: this.errorBuilder.errorMessage,
                data: {},
            };
        }
    }

    @Post()
    async createActivityGroup(@Body() data: Partial<ActivityGroup>): Promise<Object> {
        try {
            if(!data.email || !data.title){
                this.errorBuilder.errorMessage = 'title or email cannot be null';
                this.errorBuilder.errorStatus = 'Bad Request';
                throw new Error();
            }

            await this.activityGroupService.create(data);

            const getData = await this.activityGroupService.findOneById(data.activity_id);

            return {
                status: 'Success',
                message: 'Success',
                data: getData,
            };
        } catch (error) {
            return {
                status: this.errorBuilder.errorStatus,
                message: this.errorBuilder.errorMessage,
                data: {},
            };
        }
    }
}
