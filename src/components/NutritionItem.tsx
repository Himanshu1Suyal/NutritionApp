import { useState } from "react";
import type { Nutrition } from "../types";

interface Props {
  item: Nutrition;
  onDelete: (id: number) => Promise<void>;
}

const NutritionItem: React.FC<Props> = ({ item, onDelete }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(item.id!);
  };

  const initials = item.foodName.slice(0, 2).toUpperCase();

  return (
    <div className={`item ${deleting ? "deleting" : ""}`}>
      <div className="item-avatar">{initials}</div>

      <div>
        <div className="item-name">{item.foodName}</div>
        <div className="badges">
          <span className="badge badge-cal">⚡ {item.calories} kcal</span>
          <span className="badge badge-prot">◈ {item.protein}g protein</span>
        </div>
      </div>

      <div className="item-spacer" />

      <button className="btn-del" onClick={handleDelete} disabled={deleting}>
        {deleting ? "..." : "Delete"}
      </button>
    </div>
  );
};

export default NutritionItem;