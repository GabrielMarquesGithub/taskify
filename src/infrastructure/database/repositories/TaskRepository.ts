import { Injectable } from "@nestjs/common";

import { Task } from "@domain/entities/Task";
import { ITaskRepository } from "@domain/repositories/ITaskRepository";

import {
  toDomainTask,
  toDomainTasks
} from "@infrastructure/database/mappers/taskMapper";
import { toDomainTaskGroup } from "@infrastructure/database/mappers/taskGroupMapper";
import { PrismaService } from "@infrastructure/server/services/prisma.service";

@Injectable()
class TaskRepository implements ITaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveTask(task: Task) {
    const taskCreated = await this.prisma.task.create({
      data: {
        id: task.id,
        title: task.title,
        description: task.description
      },
      include: {
        taskGroup: true
      }
    });

    let taskGroup: Task["taskGroup"];

    if (taskCreated.taskGroup) {
      taskGroup = toDomainTaskGroup(taskCreated.taskGroup);
    }

    return toDomainTask({ ...taskCreated, taskGroup });
  }

  async getTaskById(id: string) {
    const taskReturned = await this.prisma.task.findUnique({
      where: { id }
    });

    if (!taskReturned) return;

    return toDomainTask(taskReturned);
  }

  async getTasks(): Promise<Task[]> {
    const tasksReturned = await this.prisma.task.findMany();
    return toDomainTasks(tasksReturned);
  }
}

export { TaskRepository };
