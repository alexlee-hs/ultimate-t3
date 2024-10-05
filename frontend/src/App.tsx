import "./assets/styles.css";
import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Offline from "./pages/offline-game/offline";
import Home from "./pages/home/home";

export default function App() {
  return (
    <div className="App">
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offline" element={<Offline />} />
        </Routes>
      </MemoryRouter>
    </div>
  );
}
