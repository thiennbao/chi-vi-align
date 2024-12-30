import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ToolPage from "./pages/ToolPage";
import ResultPage from "./pages/ResultPage";
import StoragePage from "./pages/StoragePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tool" element={<ToolPage />} />
        <Route path="/storage" element={<StoragePage />} />
        <Route path="/result/:id" element={<ResultPage />} />
        <Route path="*" element={<p>404</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
