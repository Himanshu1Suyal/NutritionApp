import axios from "axios";
import type { Nutrition } from "../types";

const BASE_URL = "http://localhost:3001/nutrition";

export const fetchNutrition = async (): Promise<Nutrition[]> => {
  const res = await axios.get<Nutrition[]>(BASE_URL);
  return res.data;
};

export const addNutrition = async (data: Omit<Nutrition, "id">): Promise<Nutrition> => {
  const res = await axios.post<Nutrition>(BASE_URL, data);
  return res.data;
};

export const deleteNutrition = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};