**Use Case: Nutrition Tracker App (React + TypeScript)**
Objective
Build a Nutrition Tracker Web App using React with TypeScript that allows users to:
• View nutrition records
• Add new entries
• Delete existing entries
Functional Requirements
1. View Nutrition Data
• Display list of nutrition items from backend
• Each item should show:
o Food Name
o Calories
o Protein
2. Add Nutrition Entry
• Provide a form with fields:
o Food Name (string)
o Calories (number)
o Protein (number)
• On submit:
o Call API (POST)
o Update UI dynamically
3. Delete Nutrition Entry
• Each record should have a Delete button
• On click:
o Call DELETE API
o Remove item from UI
Sample Backend (JSON Server)
Create a file: nutrition.json
{
 "nutrition": [
 {
 "id": 1,
 "foodName": "Apple",
 "calories": 95,
 "protein": 0.5
 },
 {
 "id": 2,
 "foodName": "Boiled Egg",
 "calories": 78,
 "protein": 6
 }
 ]
}
Run JSON server:
npx json-server --watch nutrition.json --port 3001
Base API:
http://localhost:3001/nutrition
Suggested Component Structure
src/
├── components/
│ ├── NutritionList.tsx
│ ├── NutritionItem.tsx
│ ├── AddNutrition.tsx
├── services/
│ ├── api.ts
├── App.tsx
Technical Requirements
1. TypeScript Interfaces
export interface Nutrition {
 id?: number;
 foodName: string;
 calories: number;
 protein: number;
}
Optimization (useMemo) (Optional but recommended)
• Calculate total calories
const totalCalories = useMemo(() => {
 return nutritionList.reduce((sum, item) => sum + item.calories, 0);
}, [nutritionList]);
UI Expectations
• Simple form for adding items (use ReactMaterial wherever possible)
• List view displaying records
• Delete button for each row
• Display total calories (optional enhancement)
Acceptance Criteria
• Data fetched from JSON server on load
• New record added and reflected instantly
• Record deleted successfully
• Proper use of:
o Components
o Props
o State
o Hooks
o Axios
