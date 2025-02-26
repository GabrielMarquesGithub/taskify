import { Task } from "@domain/entities/Task.entity";

class TaskGroup {
  private readonly id: string;
  private _name: string;
  private _tasks: Task[];

  constructor(id: string, name: string, tasks: Task[] = []) {
    this.id = id;
    this._name = name;
    this._tasks = tasks;
  }

  public get tasks(): Task[] {
    // Retorna uma cópia para manter a imutabilidade de alterações por referência
    return [...this._tasks];
  }

  public addTask(task: Task): void {
    this._tasks.push(task);
  }

  public removeTask(taskId: string): void {
    this._tasks = this._tasks.filter((task) => task.id !== taskId);
  }
}

export { TaskGroup };
