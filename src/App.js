
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import IPAword from "./components/IPAword";

import Dict from "./pages/dict";
import Rich_text from "./pages/Rich_text";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Rich_text />} />
        <Route path="/ipaword" element={<IPAword shoInfo={true} word="elephant" phonetic_aids={[
          "ɛ",
          "l",
          "ə",
          "f",
          "h",
          "ə",
          "n"
        ]
        } aids_map={[
          3,
          0,
          1,
          1,
          0,
          1,
          0,
          0
        ]
        } />} />
        <Route path="/dict" element={<Dict />} />
      </Routes>
    </Router>
  );
}
export default App;
