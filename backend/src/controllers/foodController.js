import { getFoods } from "../models/foods.js";

export const getAllFoods = (req, res) => {
  const foods = getFoods();
  res.json(foods);
};