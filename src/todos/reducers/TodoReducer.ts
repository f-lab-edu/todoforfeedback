import type { TodoType } from "../../type/todoTpye";
import { produce } from "immer";

type TodoWithoutStatus = Omit<TodoType, "status">;

export type TodoOperations =
  | { command: "CREATE"; payload: Pick<TodoType, "title"> }
  | { command: "UPDATE_TITLE"; payload: TodoWithoutStatus }
  | { command: "TOGGLE_STATUS"; payload: Pick<TodoType, "id"> }
  | { command: "DELETE"; payload: Pick<TodoType, "id"> };

export const todoReducer = produce(
  (prevTodos: TodoType[], { command, payload }: TodoOperations) => {
    switch (command) {
      case "CREATE": {
        const newTodo: TodoType = {
          id: Date.now(),
          title: payload.title,
          status: false,
        };
        prevTodos.push(newTodo);
        break;
      }

      case "UPDATE_TITLE": {
        const targetTodo = prevTodos.find(
          (prevTodo) => prevTodo.id === payload.id
        );
        if (targetTodo) {
          targetTodo.title = payload.title;
        }
        break;
      }

      case "TOGGLE_STATUS": {
        const targetTodo = prevTodos.find((t) => t.id === payload.id);
        if (targetTodo) targetTodo.status = !targetTodo.status;
        break;
      }

      case "DELETE": {
        return prevTodos.filter((prevTodo) => prevTodo.id !== payload.id);
      }

      default:
        break;
    }
  }
);
