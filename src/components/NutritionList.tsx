import type { Nutrition } from "../types";
import NutritionItem from "./NutritionItem";

interface Props {
  items: Nutrition[];
  loading: boolean;
  onDelete: (id: number) => Promise<void>;
}

const NutritionList: React.FC<Props> = ({ items, loading, onDelete }) => {
  if (loading) {
    return (
      <div className="loading">
        Fetching from API...
        <div className="loading-dots">
          <span /><span /><span />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="empty">
        <div className="empty-icon">🥗</div>
        <p>No entries yet. Add your first food item above.</p>
      </div>
    );
  }

  return (
    <div>
      {items.map((item) => (
        <NutritionItem key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default NutritionList;