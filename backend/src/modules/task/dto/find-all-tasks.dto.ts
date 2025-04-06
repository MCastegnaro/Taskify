import { IsArray, IsNumber, IsUUID } from 'class-validator';
import { TaskStatusEnum } from 'src/config/database/entities/task.entity';
import { TaskDto } from './task.dto';

export interface FindAllTasksParams {
  title?: string;
  status?: TaskStatusEnum;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}

export class TaskRouteParameters {
  @IsUUID()
  id: string;
}

export class FindAllTasksResponseDto {
  @IsArray()
  tasks: Array<TaskDto>;

  @IsNumber()
  totalCount: number;

  @IsNumber()
  tasksFounded: number;
}
