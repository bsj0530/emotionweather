import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/home";
import Play from "./pages/play";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play" element={<Play />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
