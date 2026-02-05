import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Category from "./Category";
import FoodDetails from "./FoodDetails";
import Quiz from "./Quiz";
import AddFood from "./AddFood";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:type" element={<Category />} />
          <Route path="/food/:name" element={<FoodDetails />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/add-food" element={<AddFood />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
