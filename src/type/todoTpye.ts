export type TodoStatus = "todo" | "in_progress" | "done";

export interface Todo {
  id: number;
  title: string;
  status: TodoStatus;
}
