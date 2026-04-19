**Use Case: Nutrition Tracker App (React + TypeScript)**
Objective
Build a Nutrition Tracker Web App using React with TypeScript that allows users to:
• View nutrition records
• Add new entries
• Delete existing entries
Functional Requirements
1. View Nutrition Data
  • Display list of nutrition items from saved file
  • Each item should show:
    a)Food Name
    b)Calories
    c)Protein
2. Add Nutrition Entry
  • Provide a form with fields:
    a)Food Name (string)
    b)Calories (number)
    c)Protein (number)
  • On submit:
    a)Call API (POST)
    b)Update UI dynamically
3. Delete Nutrition Entry
  • Each record should have a Delete button
  • On click:
   a)Call DELETE API
   b)Remove item from UI
Sample Backend (JSON Server)
Create a file: nutrition.json
{
  "nutrition": [
    {
      "id": "1",
      "foodName": "Chia seeds",
      "calories": 95,
      "protein": 0.5
    },
    {
      "id": "2",
      "foodName": "Tofu",
      "calories": 78,
      "protein": 6
    },
    {
      "id": "3",
      "foodName": "chicken",
      "calories": 165,
      "protein": 31
    },
    {
      "id": "4",
      "foodName": "Poha)",
      "calories": 216,
      "protein": 5
    },
    {
      "foodName": "Samosa",
      "calories": 1500,
      "protein": 20,
      "id": "9j6vTFuHc8I"
    },
    {
      "foodName": "Banana",
      "calories": 100,
      "protein": 3,
      "id": "fsLUyevEC4I"
    }
  ],
  "$schema": "./node_modules/json-server/schema.json"
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
Optimization
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
   a)Components
   b)Props
   c)State
   d)Hooks
   e)Axios
