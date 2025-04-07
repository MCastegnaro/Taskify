import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import {
  FindAllTasksParams,
  FindAllTasksResponseDto,
  TaskRouteParameters,
} from './dto/find-all-tasks.dto';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from './dto/task.dto';
import { TaskService } from './services/task.service';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(
    @Query() params: FindAllTasksParams,
  ): Promise<FindAllTasksResponseDto> {
    return this.taskService.findAll(params);
  }

  @Patch('/:id')
  async patch(
    @Param() params: TaskRouteParameters,
    @Body() task: UpdateTaskDto,
  ): Promise<TaskDto> {
    return await this.taskService.patch(params.id, task);
  }

  @Patch('/:id/complete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async complete(@Param() params: TaskRouteParameters): Promise<void> {
    return await this.taskService.complete(params.id);
  }

  @Post()
  async create(@Body() task: CreateTaskDto): Promise<TaskDto> {
    return await this.taskService.create(task);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() params: TaskRouteParameters): Promise<void> {
    return await this.taskService.remove(params.id);
  }
}
