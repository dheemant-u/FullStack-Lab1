const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const foodData = {
  Fruits: [
    { name: "Apple", category: "Fruits", calories: 52, benefits: "Rich in fiber" },
    { name: "Banana", category: "Fruits", calories: 89, benefits: "Boosts energy" },
  ],
  Vegetables: [
    { name: "Carrot", category: "Vegetables", calories: 41, benefits: "Good for eyes" },
    { name: "Spinach", category: "Vegetables", calories: 23, benefits: "Rich in iron" },
  ],
  Grains: [
    { name: "Rice", category: "Grains", calories: 130, benefits: "Source of carbs" },
    { name: "Oats", category: "Grains", calories: 68, benefits: "Rich in fiber" },
  ],
};

app.get("/foods/:category", (req, res) => {
  res.json(foodData[req.params.category] || []);
});

app.get("/food/:name", (req, res) => {
  for (let cat in foodData) {
    const food = foodData[cat].find((f) => f.name === req.params.name);
    if (food) return res.json(food);
  }
  res.json({ error: "Food not found" });
});

app.post("/foods", (req, res) => {
  const { name, category, calories, benefits } = req.body;
  
  if (!foodData[category]) {
    foodData[category] = [];
  }
  
  const newFood = { name, category, calories, benefits };
  foodData[category].push(newFood);
  res.status(201).json({ message: "Food added successfully", food: newFood });
});

app.listen(5001, () => console.log("Backend running on port 5001"));

