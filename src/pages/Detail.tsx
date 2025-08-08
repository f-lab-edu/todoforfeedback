import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useTodos } from "../todos/hooks/useTodos";

export const Detail = () => {
  const { todos, operateTodos } = useTodos();

  const { id } = useParams();
  const todoId = Number(id);

  const todo = todos.find((todo) => todo.id === todoId);
  // 수정용 로컬 상태
  const [title, setTitle] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
    } else {
      navigate("/");
    }
  }, [todo, navigate]);

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      operateTodos({ command: "DELETE", payload: { id: todoId } });
      navigate("/");
    }
  };

  const handleUpdate = () => {
    if (title.trim() === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    operateTodos({ command: "UPDATE_TITLE", payload: { id: todoId, title } });
    setIsEditing(false);
  };

  const toggleStatus = () => {
    operateTodos({ command: "TOGGLE_STATUS", payload: { id: todoId } });
  };

  if (!todo) {
    return null;
  }

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: 8,
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        투두 상세 페이지
      </h2>

      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              fontSize: "1.2rem",
              border: "1px solid #ccc",
              borderRadius: 4,
              boxSizing: "border-box",
            }}
            autoFocus
          />
          <div style={{ marginTop: 16, textAlign: "right" }}>
            <button
              onClick={handleUpdate}
              style={{
                marginRight: 8,
                padding: "0.5rem 1.2rem",
                fontWeight: "600",
                cursor: "pointer",
                backgroundColor: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: 4,
              }}>
              저장
            </button>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                padding: "0.5rem 1.2rem",
                cursor: "pointer",
                backgroundColor: "#eee",
                border: "none",
                borderRadius: 4,
              }}>
              취소
            </button>
          </div>
        </>
      ) : (
        <>
          <p
            onClick={toggleStatus}
            style={{
              fontSize: "1.4rem",
              cursor: "pointer",
              fontWeight: "600",
              textDecoration: todo.status ? "line-through" : "none",
              color: todo.status ? "#666" : "#222",
              userSelect: "none",
              transition: "color 0.3s ease",
              marginBottom: 16,
            }}
            title="완료/미완료 토글">
            {todo.title}
          </p>
          <div>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                marginRight: 8,
                padding: "0.5rem 1.2rem",
                cursor: "pointer",
                backgroundColor: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                fontWeight: "600",
              }}>
              수정
            </button>
            <button
              onClick={handleDelete}
              style={{
                padding: "0.5rem 1.2rem",
                cursor: "pointer",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                fontWeight: "600",
              }}>
              삭제
            </button>
          </div>
        </>
      )}

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: 24,
          padding: "0.5rem 1.2rem",
          cursor: "pointer",
          backgroundColor: "#777",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          display: "block",
          width: "100%",
          fontWeight: "600",
        }}>
        메인으로 돌아가기
      </button>
    </div>
  );
};
