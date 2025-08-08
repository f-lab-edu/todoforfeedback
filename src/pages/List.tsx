import { useState } from "react";
import { useNavigate } from "react-router";
import { useTodos } from "../todos/hooks/useTodos";
import type { TodoType } from "../type/todoTpye";

type TodoWithoutStatus = Omit<TodoType, "status">;

export const List = () => {
  const navigate = useNavigate();
  const { todos, operateTodos } = useTodos();

  const [title, setTitle] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // 추가
  const handleCreate = () => {
    if (!title.trim()) return;
    operateTodos({
      command: "CREATE",
      payload: { title },
    });
    setTitle("");
  };

  const startEdit = ({ id, title }: TodoWithoutStatus) => {
    setEditingId(id);
    setTitle(title);
  };

  const saveEdit = (id: number) => {
    if (!title.trim()) return;
    operateTodos({
      command: "UPDATE_TITLE",
      payload: {
        id,
        title,
      },
    });
    setEditingId(null);
    setTitle("");
  };

  const handleToggleStatus = (id: number) => {
    operateTodos({
      command: "TOGGLE_STATUS",
      payload: { id },
    });
  };

  // 삭제
  const handleDelete = (id: number) => {
    operateTodos({
      command: "DELETE",
      payload: { id },
    });
  };

  return (
    <div>
      <h2>Todo List</h2>

      {/* 입력창 + 추가 버튼 */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          value={title}
          placeholder="새 할 일을 입력하세요"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={() => {
            if (editingId !== null) {
              saveEdit(editingId);
            } else {
              handleCreate();
            }
          }}>
          {editingId !== null ? "저장" : "추가"}
        </button>
        {editingId !== null && (
          <button
            onClick={() => {
              setEditingId(null);
              setTitle("");
            }}>
            취소
          </button>
        )}
      </div>

      {/* 목록 */}
      {todos.length === 0 ? (
        <p>할 일이 없습니다. 새 할 일을 추가해주세요!</p>
      ) : (
        todos.map((todo) => (
          <div
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: 8,
              border: "1px solid #ccc",
              padding: "8px",
              borderRadius: 4,
            }}>
            {editingId === todo.id ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ flex: 1 }}
              />
            ) : (
              <span
                style={{
                  flex: 1,
                  cursor: "pointer",
                  textDecoration: todo.status ? "line-through" : "none",
                }}
                onClick={() => navigate(`/todo/${todo.id}`)}>
                {todo.title}
              </span>
            )}

            <button onClick={() => handleToggleStatus(todo.id)}>
              {todo.status ? "취소" : "완료"}
            </button>

            {editingId === todo.id ? (
              <>
                <button onClick={() => saveEdit(todo.id)}>저장</button>
                <button onClick={() => setEditingId(null)}>취소</button>
              </>
            ) : (
              <button onClick={() => startEdit(todo)}>수정</button>
            )}

            <button onClick={() => handleDelete(todo.id)}>삭제</button>
          </div>
        ))
      )}
    </div>
  );
};
