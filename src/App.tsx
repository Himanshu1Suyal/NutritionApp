import { useState, useEffect, useMemo, useCallback } from "react";
import type { Nutrition } from "./types";
import { fetchNutrition, addNutrition, deleteNutrition } from "./services/api";
import NutritionList from "./components/NutritionList";
import AddNutrition from "./components/AddNutrition";
import "./App.css";

const App = () => {
  const [nutritionList, setNutritionList] = useState<Nutrition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNutrition().then((data) => {
      setNutritionList(data);
      setLoading(false);
    });
  }, []);

  const totalCalories = useMemo(() =>
    nutritionList.reduce((sum, item) => sum + item.calories, 0), [nutritionList]);

  const totalProtein = useMemo(() =>
    nutritionList.reduce((sum, item) => sum + item.protein, 0), [nutritionList]);

  const handleAdd = useCallback(async (data: Omit<Nutrition, "id">) => {
    const newEntry = await addNutrition(data);
    setNutritionList((prev) => [...prev, newEntry]);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    await deleteNutrition(id);
    setNutritionList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <div className="header-top">
          <div className="logo">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8M12 8v8" strokeWidth="2.5" />
            </svg>
          </div>
          <h1>Nutrition Tracker</h1>
        </div>
        <p>Log your daily meals and monitor your intake</p>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card green">
          <div className="stat-label">Entries</div>
          <div className="stat-value">{nutritionList.length}</div>
          <div className="stat-unit">food items</div>
        </div>
        <div className="stat-card amber">
          <div className="stat-label">Calories</div>
          <div className="stat-value">{Math.round(totalCalories)}</div>
          <div className="stat-unit">kcal total</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-label">Protein</div>
          <div className="stat-value">{totalProtein.toFixed(1)}</div>
          <div className="stat-unit">grams total</div>
        </div>
      </div>

      {/* Add Form */}
      <AddNutrition onAdd={handleAdd} />

      {/* List Header */}
      <div className="list-header">
        <span className="list-title">Food log</span>
        <span className="list-count">{nutritionList.length} items</span>
      </div>

      {/* List */}
      <NutritionList items={nutritionList} loading={loading} onDelete={handleDelete} />
    </div>
  );
};

export default App;