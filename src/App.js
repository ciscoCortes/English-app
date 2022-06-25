
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Develop from "./components/develop"
import Teacher_deck from "./pages/Teacher_deck/Teacher_deck";
import Text_library from "./pages/text_library";
import Phonetic_aids_editor from "./pages/Teacher_deck/Ponetic_aids_editor";
import Rich_text from "./pages/Teacher_deck/Rich_text";

function App() {
  const words = ['this', 'that']
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Develop />} />
        <Route path="/Teacher_deck" element={<Teacher_deck />} >
          <Route path="editor" element={<Phonetic_aids_editor words={words} />} />
          <Route path="deck" element={<Rich_text />} />
        </Route>
        <Route path="/library" element={<Text_library />} />
      </Routes>
    </Router>
  );
}
export default App;
