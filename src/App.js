
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Devwlop from "./pages/develop"
import Dict from "./pages/dict";
import Rich_text from "./pages/Rich_text";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Rich_text />} />
        <Route path="/dict" element={<Dict />} />
        <Route path="/develop" element={<Devwlop />} />
      </Routes>
    </Router>
  );
}
export default App;
