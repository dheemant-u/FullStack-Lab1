import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

function Category() {
  const { type } = useParams();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5001/foods/${type}`)
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, [type]);

  return (
    <div className="container">
      <h1>{type}</h1>

      {foods.map((food) => (
        <div key={food.name} className="food-item">
          <Link to={`/food/${food.name}`}>{food.name}</Link>
        </div>
      ))}

      <br />
      <Link to="/">← Back</Link>
    </div>
  );
}

export default Category;
