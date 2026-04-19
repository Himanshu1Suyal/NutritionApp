import { useState } from "react";
import type { Nutrition } from "../types";

interface Props {
  onAdd: (data: Omit<Nutrition, "id">) => Promise<void>;
}

const AddNutrition: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState({ foodName: "", calories: "", protein: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.foodName.trim()) e.foodName = "Required";
    if (!form.calories || isNaN(+form.calories) || +form.calories < 0) e.calories = "Invalid";
    if (!form.protein || isNaN(+form.protein) || +form.protein < 0) e.protein = "Invalid";
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    await onAdd({
      foodName: form.foodName.trim(),
      calories: Number(form.calories),
      protein: Number(form.protein),
    });
    setForm({ foodName: "", calories: "", protein: "" });
    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <div className="form-card">
      <div className="form-title">
        <span className="form-title-dot"></span>
        Add food entry
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Food name</label>
          <input
            name="foodName"
            value={form.foodName}
            onChange={handleChange}
            placeholder="e.g. Banana"
            className={errors.foodName ? "err" : ""}
          />
          {errors.foodName && <span className="err-msg">{errors.foodName}</span>}
        </div>

        <div className="form-group">
          <label>Calories (kcal)</label>
          <input
            name="calories"
            type="number"
            min="0"
            value={form.calories}
            onChange={handleChange}
            placeholder="95"
            className={errors.calories ? "err" : ""}
          />
          {errors.calories && <span className="err-msg">{errors.calories}</span>}
        </div>

        <div className="form-group">
          <label>Protein (g)</label>
          <input
            name="protein"
            type="number"
            min="0"
            step="0.1"
            value={form.protein}
            onChange={handleChange}
            placeholder="2.5"
            className={errors.protein ? "err" : ""}
          />
          {errors.protein && <span className="err-msg">{errors.protein}</span>}
        </div>
      </div>

      <div className="form-footer">
        <button className="btn-add" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Adding..." : "+ Add entry"}
        </button>
        {success && <span className="success-msg">✓ Added successfully!</span>}
      </div>
    </div>
  );
};

export default AddNutrition;