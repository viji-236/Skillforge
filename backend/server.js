import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SkillForge Backend Running 🚀");
});

// ANALYZE ROUTE
app.post("/analyze", (req, res) => {
  const { resume } = req.body;

  // 🔥 VALIDATION (IMPORTANT)
  if (!resume || resume.trim().length < 10) {
    return res.json({
      error: "⚠️ Please enter valid skills (at least 2–3 skills)"
    });
  }

  const text = resume.toLowerCase();

  // 🧠 Skill Extraction
  let userSkills = [];

  if (text.includes("java")) userSkills.push("Java");
  if (text.includes("python")) userSkills.push("Python");
  if (text.includes("javascript")) userSkills.push("JavaScript");
  if (text.includes("react")) userSkills.push("React");
  if (text.includes("teamwork")) userSkills.push("Teamwork");
  if (text.includes("communication")) userSkills.push("Communication");

  if (userSkills.length === 0) {
    userSkills.push("Basic Skills");
  }

  // 🎯 Career Recommendation
  let careers = [];

  if (userSkills.includes("Python")) {
    careers.push("Data Analyst", "AI Engineer");
  }

  if (userSkills.includes("Java")) {
    careers.push("Software Developer");
  }

  if (userSkills.includes("Communication")) {
    careers.push("Project Manager");
  }

  if (userSkills.includes("JavaScript") || userSkills.includes("React")) {
    careers.push("Frontend Developer");
  }

  careers = [...new Set(careers)];

  if (careers.length === 0) {
    careers.push("General IT Roles");
  }

  // 📊 Skill Gap
  const requiredSkills = [
    "Java",
    "Python",
    "Data Structures",
    "Problem Solving",
    "Git"
  ];

  const missingSkills = requiredSkills.filter(
    (skill) => !userSkills.includes(skill)
  );

  // 📅 Roadmap
  const roadmap = [
    "Day 1: Learn basics",
    "Day 2: Study Data Structures",
    "Day 3: Solve coding problems",
    "Day 4: Learn Git",
    "Day 5: Build mini project",
    "Day 6: Practice interview questions",
    "Day 7: Revision"
  ];

  // 🧪 Task
  let task = "";

  if (userSkills.includes("Java")) {
    task = "Write a Java program to print Hello World";
  } else if (userSkills.includes("Python")) {
    task = "Write a Python function to add two numbers";
  } else {
    task = "Write a simple program in any language";
  }

  // ✅ Send structured response
  res.json({
    careers,
    userSkills,
    missingSkills,
    roadmap,
    task
  });
});

// FEEDBACK ROUTE
app.post("/evaluate", (req, res) => {
  const { answer } = req.body;

  let feedback = "";

  if (!answer || answer.length < 10) {
    feedback = "❌ Answer too short. Try again.";
  } else if (answer.toLowerCase().includes("print")) {
    feedback = "✅ Good job! Your logic looks correct.";
  } else {
    feedback = "👍 Nice attempt! Try improving syntax.";
  }

  res.json({ feedback });
});

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
