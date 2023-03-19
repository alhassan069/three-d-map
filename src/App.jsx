import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MapComponent from "./components/MapComponent";
import CubeComponent from "./components/CubeComponent";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MapComponent />} />
          <Route path="/cube" element={<CubeComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
