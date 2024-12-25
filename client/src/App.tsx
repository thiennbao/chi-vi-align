import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OcrPage from "./pages/OcrPage";
import TxtPage from "./pages/TxtPage";
import ChiViPage from "./pages/Chivi";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ocr" element={<OcrPage />} />
        <Route path="/txt" element={<TxtPage />} />
        <Route path="/chivi" element={<ChiViPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
