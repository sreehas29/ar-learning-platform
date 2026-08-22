import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Activity from "./pages/Activity/Activity";
import Instructions from "./pages/Instructions/Instructions";
import ARView from "./pages/ARView/ARView";
import QuizHub from "./pages/QuizHub/QuizHub";
import ModelLibrary from "./pages/ModelLibrary/ModelLibrary";
import ARSandbox from "./pages/ARSandbox/ARSandbox";
import ModelCompare from "./pages/ModelCompare/ModelCompare";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/activity" element={<Activity />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/ar" element={<ARView />} />
      <Route path="/quiz-hub" element={<QuizHub />} />
      <Route path="/models" element={<ModelLibrary />} />
      <Route path="/sandbox" element={<ARSandbox />} />
      <Route path="/compare" element={<ModelCompare />} />
    </Routes>
  );
}