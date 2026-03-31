import React, { useState } from "react";
import "./App.css";
import logo from "./logo.png"; // ✅ import logo

function App() {
  const [resume, setResume] = useState("");
  const [result, setResult] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);

    const response = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resume }),
    });

    const data = await response.json();

    if (data.error) {
      setResult(null);
      alert(data.error);
    } else {
      setResult(data);
    }

    setLoading(false);
  };

  const handleEvaluate = async () => {
    const response = await fetch("http://localhost:5000/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer }),
    });

    const data = await response.json();
    setFeedback(data.feedback);
  };

  return (
    <div className="container">

      {/* 🔥 HEADER WITH LOGO */}
      <div className="header">
        <img src={logo} alt="SkillForge Logo" className="logo" />
        <h1 className="title">SkillForge</h1>
      </div>

      <p className="subtitle">🚀 Build Your Future with AI</p>

      {/* INPUT */}
      <div className="card">
        <h2>📥 Enter Your Skills</h2>

        <textarea
          className="textarea"
          placeholder="Example: Java, Python, teamwork"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />

        <button className="btn" onClick={handleAnalyze}>
          Analyze
        </button>

        {loading && <p className="loading">⏳ Analyzing...</p>}
      </div>

      {/* RESULT */}
      {result && (
        <div className="card result-card fade-in">

          <h2>🎯 Recommended Careers</h2>
          <ul>
            {result.careers.map((c, i) => (
              <li key={i}>🚀 {c}</li>
            ))}
          </ul>

          <h2>✅ Your Skills</h2>
          <ul>
            {result.userSkills.map((s, i) => (
              <li key={i}>✔ {s}</li>
            ))}
          </ul>

          <h2>❌ Missing Skills</h2>
          <ul>
            {result.missingSkills.map((s, i) => (
              <li key={i}>✘ {s}</li>
            ))}
          </ul>

          <h2>📅 7-Day Roadmap</h2>
          <ul>
            {result.roadmap.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>

          <h2>🧪 Practice Task</h2>
          <p className="task-box">{result.task}</p>

        </div>
      )}

      {/* PRACTICE */}
      <div className="card fade-in">
        <h2>🧪 Practice & Feedback</h2>

        <textarea
          className="textarea"
          placeholder="Write your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <button className="btn secondary" onClick={handleEvaluate}>
          Get Feedback
        </button>

        {feedback && <p className="feedback">{feedback}</p>}
      </div>

      <footer className="footer">
        © 2026 SkillForge | Built by Vijayambigai 🚀
      </footer>
    </div>
  );
}

export default App;