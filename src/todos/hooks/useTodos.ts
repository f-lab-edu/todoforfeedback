import { useContext } from "react";
import type { TodoType } from "../../type/todoTpye";
import type { TodoOperations } from "../reducers/TodoReducer";
import type { Dispatch } from "react";
import { createContext } from "react";

type TodoContextType = {
  todos: TodoType[];
  operateTodos: Dispatch<TodoOperations>;
} | null;

export const TodoContext = createContext<TodoContextType>(null);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("provider꼭 사용해주세용~");
  return context;
};
