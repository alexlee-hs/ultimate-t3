import "./assets/styles.css";
import React from "react";
import { MemoryRouter, Routes, Route } from "react-router";
import Offline from "./pages/offline-game/offline";
import Home from "./pages/home/home";
import CpuGame from "./pages/cpu-game/cpu-game";

export default function App() {
  return (
    <div className="App">
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offline" element={<Offline />} />
          <Route path="/cpu" element={<CpuGame />} />
        </Routes>
      </MemoryRouter>
    </div>
  );
}
