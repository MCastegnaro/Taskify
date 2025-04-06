import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/config/database/entities/task.entity';
import { UserEntity } from 'src/config/database/entities/user.entity';
import { TaskService } from './services/task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, UserEntity])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
