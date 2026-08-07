type TaskStatus = "done" | "todo";

export interface Task {
  name: string;
  status: TaskStatus;
}
