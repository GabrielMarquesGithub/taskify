import { Injectable } from "@nestjs/common";

import { Task } from "@domain/entities/Task";
import { ITaskRepository } from "@domain/repositories/ITaskRepository";
import { IBaseListFilters } from "@domain/interfaces/IBaseListFilters";

import {
  toDomainTask,
  toDomainTasks,
  toPersistenceTask
} from "@infrastructure/database/mappers/taskMapper";
import { toDomainTaskGroup } from "@infrastructure/database/mappers/taskGroupMapper";
import { PrismaService } from "@infrastructure/server/services/prisma.service";

@Injectable()
class TaskRepository implements ITaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveTask(task: Task) {
    const taskCreated = await this.prisma.task.create({
      data: toPersistenceTask(task),
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

  async getTasks(filters: IBaseListFilters): Promise<Task[]> {
    const tasksReturned = await this.prisma.task.findMany({
      take: filters.limit,
      skip: filters.offset,
      orderBy:
        filters.orderBy && filters.order
          ? {
              [filters.orderBy]: filters.order
            }
          : undefined,
      where: filters.search
        ? {
            OR: [
              {
                description: {
                  contains: filters.search
                }
              },
              {
                title: {
                  contains: filters.search
                }
              }
            ]
          }
        : undefined
    });
    return toDomainTasks(tasksReturned);
  }
}

export { TaskRepository };
