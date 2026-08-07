type TaskStatus = "done" | "todo";

export interface Task {
  id: number;
  name: string;
  status: TaskStatus;
}
