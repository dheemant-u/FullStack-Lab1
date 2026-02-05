import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Quiz() {

  const questions = [
    { q: "Apple belongs to which category?", a: "Fruits" },
    { q: "Carrot belongs to which category?", a: "Vegetables" },
    { q: "Rice belongs to which category?", a: "Grains" }
  ];

  const [index, setIndex] = useState(0);
  const [ans, setAns] = useState("");
  const [result, setResult] = useState("");

  function checkAnswer() {
    if (ans.trim().toLowerCase() === questions[index].a.toLowerCase()) {
      setResult("✔ Correct!");
    } else {
      setResult("✘ Wrong! Try again.");
    }
  }

  function nextQuestion() {
    setResult("");
    setAns("");
    setIndex((prev) => (prev + 1) % questions.length);
  }

  return (
    <div className="container">
      <h1>Quiz</h1>

      <h3>{questions[index].q}</h3>

      <input
        value={ans}
        onChange={(e) => setAns(e.target.value)}
        placeholder="Type your answer"
        style={{ padding: 10, width: 200, borderRadius: 5 }}
      />

      <br /><br />

      <button onClick={checkAnswer}>Submit</button>

      <h2>{result}</h2>

      <button onClick={nextQuestion}>Next →</button>

      <br /><br />

      <Link to="/">← Back to Home</Link>
    </div>
  );
}

export default Quiz;
