import { Routes, Route } from "react";

import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Activity from "./pages/Activity/Activity";
import Instructions from "./pages/Instructions/Instructions";
import ARView from "./pages/ARView/ARView";
import QuizHub from "./pages/QuizHub/QuizHub";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/activity" element={<Activity />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/ar" element={<ARView />} />
      <Route path="/quiz-hub" element={<QuizHub />} />
    </Routes>
  );
}