import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

// IMPORT IMAGES
import apple from "./images/apple.jpeg";
import carrot from "./images/carrot.jpeg";
import rice from "./images/rice.jpeg";

function Home() {

  const categories = [
    { name: "Fruits", img: apple },
    { name: "Vegetables", img: carrot },
    { name: "Grains", img: rice }
  ];

  return (
    <div className="container">
      <h1>🍎 Colorful Food Learning App</h1>
      <p>Select a category to explore!</p>

      <div className="category-grid">
        {categories.map((cat) => (
          <Link key={cat.name} to={`/category/${cat.name}`} style={{ textDecoration: "none" }}>
            <div className="category-card">
              <img src={cat.img} alt={cat.name} />
              <h2>{cat.name}</h2>
            </div>
          </Link>
        ))}

        {/* ADD QUIZ CARD */}
        <Link to="/quiz" style={{ textDecoration: "none" }}>
          <div className="category-card">
            <img src={apple} alt="Quiz" />
            <h2>Quiz</h2>
          </div>
        </Link>

        {/* ADD FOOD CARD */}
        <Link to="/add-food" style={{ textDecoration: "none" }}>
          <div className="category-card" style={{ backgroundColor: '#e0f7fa' }}>
            <h1 style={{ fontSize: '50px' }}>➕</h1>
            <h2>Add Food</h2>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default Home;
