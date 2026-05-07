import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CreateMatch from "./pages/CreateMatch";
import LiveMatch from "./pages/LiveMatch";
import MatchDetail from "./pages/MatchDetail";
import Players from "./pages/Players";
import PlayerDetail from "./pages/PlayerDetail";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateMatch />} />
        <Route path="/match/:id/live" element={<LiveMatch />} />
        <Route path="/match/:id" element={<MatchDetail />} />
        <Route path="/players" element={<Players />} />
        <Route path="/player/:id" element={<PlayerDetail />} />
      </Routes>
    </div>
  );
}

export default App;