import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ToolPage from "./pages/ToolPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tool" element={<ToolPage />} />
        <Route path="/storage" element={<ResultPage />} />
        <Route path="/storage/:id" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
