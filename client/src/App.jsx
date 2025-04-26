import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Features from "./pages/Features/Features";
import Test from "./pages/Test/Test";
import Requirement from "./pages/Requirement/Requirement";
import Development from "./pages/Development/Development";
import Summary from "./pages/Summary/Summary";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}>
        <Route path="features" element={<Features />} />
        <Route path="test" element={<Test />} />
        <Route path="require" element={<Requirement />} />
        <Route path="dev" element={<Development />} />
        <Route path="summary" element={<Summary />} />
        <Route
          index
          element={<div>Welcome! Select a page from Sidebar.</div>}
        />
      </Route>
    </Routes>
  );
};

export default App;
