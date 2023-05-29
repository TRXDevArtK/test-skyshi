import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { ToDo } from './to-do.entity';

@Controller('todo-items')
export class ToDoController {
    private errorBuilder = {
        'errorMessage':'',
        'errorStatus':''
    };

    constructor(
        @Inject(ToDoService)
        private todoService: ToDoService,
    ) {}

    @Get()
    async getAllActivityGroup(@Query() data: Partial<ToDo>): Promise<Object> {
        try {
            let tempData: Partial<ToDo[] | ToDo> = {};

            if(!data){
                tempData = await this.todoService.findOneByActivyGroup(2);
            } else {
                tempData = await this.todoService.findAll();
            }
          
            return {
                status: 'Success',
                message: 'Success',
                data: tempData,
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
            const data = await this.todoService.findOneById(id);

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
                message: 'Todo with ID '+id+' Not Found',
                data: {},
            };
        }
    }

    @Delete(':id')
    async deleteActivityGroupById(@Param('id') id: number): Promise<Object> {
        try {
            const data = await this.todoService.findOneById(id);

            // need to do this because there's no error in data, just null
            if (!data) {
                this.errorBuilder.errorStatus = 'Not Found';
                this.errorBuilder.errorMessage = 'Todo with ID '+id+' Not Found';
                throw new Error();
            }

            //remove if no error
            this.todoService.remove(id);

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
    async updateActivityGroupById(@Param('id') id: number, @Body() data: Partial<ToDo>): Promise<Object> {
        try {
            const find = await this.todoService.findOneById(id);

            // need to do this because there's no error in data, just null
            if (!find) {
                this.errorBuilder.errorStatus = 'Not Found';
                this.errorBuilder.errorMessage = 'Todo with ID '+id+' Not Found';
                throw new Error();
            }

            if(!data.activity_group_id || !data.title || !data.is_active || !data.priority){
                this.errorBuilder.errorMessage = 'activity_group_id or email or is_active or priority cannot be null';
                this.errorBuilder.errorStatus = 'Bad Request';
                throw new Error();
            }

            //remove if no error
            await this.todoService.update(id, data);

            find.title = data.title ?? find.title;
            find.activity_group_id = data.activity_group_id ?? find.activity_group_id;
            find.is_active = data.is_active ?? find.is_active;
            find.priority = data.priority ?? find.priority;

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
    async createToDo(@Body() data: Partial<ToDo>): Promise<Object> {
        try {
            if(!data.activity_group_id || !data.title || !data.is_active || !data.priority){
                this.errorBuilder.errorMessage = 'activity_group_id or title or is_active or priority cannot be null';
                this.errorBuilder.errorStatus = 'Bad Request';
                throw new Error();
            }

            await this.todoService.create(data);

            const getData = await this.todoService.findOneById(data.todo_id);

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
