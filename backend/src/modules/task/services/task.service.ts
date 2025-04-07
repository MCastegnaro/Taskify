import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sanitize } from 'src/common/helpers/sanitize.helper';
import {
  TaskEntity,
  TaskStatusEnum,
} from 'src/config/database/entities/task.entity';
import { UserEntity } from 'src/config/database/entities/user.entity';
import { FindOptionsOrder, FindOptionsWhere, ILike, Repository } from 'typeorm';
import {
  FindAllTasksParams,
  FindAllTasksResponseDto,
} from '../dto/find-all-tasks.dto';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from '../dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(task: CreateTaskDto): Promise<TaskDto> {
    const userFound = await this.usersRepository.findOne({
      where: { id: task.userId },
    });

    if (!userFound) {
      throw new NotFoundException(`User with ID ${task.userId} not found`);
    }

    const taskToSave = this.taskRepository.create({
      title: Sanitize.input(task.title),
      description: Sanitize.input(task.description!),
      status: TaskStatusEnum['PENDING'],
      user: userFound,
    });

    const createdTask = await this.taskRepository.save(taskToSave);

    return this.mapEntityToDto(createdTask);
  }

  async findAll(params: FindAllTasksParams): Promise<FindAllTasksResponseDto> {
    const searchParams: FindOptionsWhere<TaskEntity> = {};

    if (params.title) {
      searchParams.title = ILike(`%${Sanitize.input(params.title)}%`);
    }

    if (params.status) {
      searchParams.status = params.status;
    }

    const orderParams: FindOptionsOrder<TaskEntity> = {};

    if (params.orderBy) {
      const direction =
        params.orderDirection?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      orderParams[params.orderBy] = direction;
    }

    const tasksFound = await this.taskRepository.find({
      where: searchParams,
      order: orderParams,
      skip: Number((params.page! - 1) * params.limit!),
      take: Number(params.limit),
    });

    const totalAll = await this.taskRepository.count();

    const totalFound = await this.taskRepository.count({
      where: searchParams,
    });

    return {
      totalCount: totalAll,
      tasksFounded: totalFound,
      tasks: tasksFound.map((taskEntity) => {
        return this.mapEntityToDto(taskEntity);
      }),
    };
  }

  async patch(id: string, task: UpdateTaskDto): Promise<TaskDto> {
    const taskFound = await this.taskRepository.findOne({
      where: { id },
    });

    if (!taskFound) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const taskToUpdate = this.taskRepository.create({
      ...taskFound,
      ...task,
    });

    await this.taskRepository.update(id, this.mapDtoToEntity(taskToUpdate));

    return this.mapEntityToDto(taskToUpdate);
  }

  async complete(id: string): Promise<void> {
    const taskFound = await this.taskRepository.findOne({
      where: { id },
    });

    if (!taskFound) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (taskFound.status === TaskStatusEnum['DONE']) {
      throw new BadRequestException(`Task with ID ${id} already completed`);
    }

    const taskToUpdate = this.taskRepository.create({
      ...taskFound,
      status: TaskStatusEnum['DONE'],
    });

    await this.taskRepository.update(id, this.mapDtoToEntity(taskToUpdate));
  }

  async remove(id: string) {
    const taskFound = await this.taskRepository.findOne({
      where: { id },
    });

    if (!taskFound) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const result = await this.taskRepository.delete(id);

    if (!result.affected) {
      throw new BadRequestException(`Task with id '${id}' not found`);
    }
  }

  private mapEntityToDto(taskEntity: TaskEntity): TaskDto {
    return {
      id: taskEntity.id,
      title: taskEntity.title,
      description: taskEntity.description,
      status: taskEntity.status,
    };
  }

  private mapDtoToEntity(taskDto: TaskDto): Partial<TaskEntity> {
    return {
      title: taskDto.title,
      description: taskDto.description,
      status: taskDto.status,
    };
  }
}
