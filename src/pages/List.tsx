import { useNavigate } from "react-router";

export const List = () => {
  const navigate = useNavigate();
  const items = [1, 2, 3];

  return (
    <div>
      {items.map((id) => (
        <div
          key={id}
          style={{ cursor: "pointer", marginBottom: 8 }}
          onClick={() => navigate(`/todo/${id}`)}>
          Item {id}
        </div>
      ))}
    </div>
  );
};
