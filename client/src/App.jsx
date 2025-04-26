import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Features from "./pages/Features/Features";
import Result  from "./pages/Result/Result";
import Test from "./pages/Test/Test";
import Login from "./pages/Login/login";
import Requirement from "./pages/Requirement/Requirement";
import Development from "./pages/Development/Development";

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
      <Route path="homepage" element={<Homepage />}>
        <Route path="features" element={<Features />} />
        <Route path="test" element={<Test />} />
        <Route path="require" element={<Requirement />} />
        <Route path="dev" element={<Development />} />
        <Route path="results" element={<Result />} />
      
      </Route>
    </Routes>
  );
};

export default App;
