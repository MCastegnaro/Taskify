import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TaskStatusEnum } from 'src/config/database/entities/task.entity';

export class TaskDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(512)
  description?: string;

  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status: TaskStatusEnum;
}

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(512)
  @IsOptional()
  description?: string;

  @IsUUID()
  userId: string;
}

export class UpdateTaskDto {
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  @IsOptional()
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(512)
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status: TaskStatusEnum;
}
