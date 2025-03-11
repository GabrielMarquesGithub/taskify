import { Task } from "@domain/entities/Task";

type ITaskGroupProps = {
  id?: string;
  name: string;
  tasks?: Task[];
};

class TaskGroup {
  private readonly _id?: string;
  private _name: string;
  private _tasks: Task[];

  constructor(props: ITaskGroupProps) {
    this._id = props.id;
    this._name = props.name;
    this._tasks = props.tasks ?? [];
  }

  public get id(): string | undefined {
    return this._id;
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
