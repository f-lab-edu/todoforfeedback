import { useReducer, type ReactNode } from "react";
import { todoReducer } from "../reducers/TodoReducer";
import type { TodoType } from "../../type/todoTpye";
import { TodoContext } from "../hooks/useTodos";

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const initialState: TodoType[] = [];
  const [todos, operateTodos] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ todos, operateTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
