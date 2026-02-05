import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

// Import all images
import apple from "./images/apple.jpeg";
import banana from "./images/banana.jpeg";
import carrot from "./images/carrot.jpeg";
import spinach from "./images/spinach.jpeg";
import rice from "./images/rice.jpeg";
import oats from "./images/oats.jpeg";

function FoodDetails() {

  const images = {
    Apple: apple,
    Banana: banana,
    Carrot: carrot,
    Spinach: spinach,
    Rice: rice,
    Oats: oats
  };

  const { name } = useParams();
  const [food, setFood] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/food/${name}`)
      .then((res) => res.json())
      .then((data) => setFood(data));
  }, [name]);

  if (!food) return <h3>Loading...</h3>;

  return (
    <div className="container">
      <h1>{food.name}</h1>

      <img className="food-photo" src={images[food.name]} alt={food.name} />

      <div className="food-item">
        <p><strong>Category:</strong> {food.category}</p>
        <p><strong>Benefits:</strong> {food.benefits}</p>
        <p><strong>Calories:</strong> {food.calories}</p>
      </div>

      <Link to="/">← Back to Home</Link>
    </div>
  );
}

export default FoodDetails;
