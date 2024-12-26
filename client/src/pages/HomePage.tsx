import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div className="h-screen flex justify-center items-center">
        <div className="w-1/2 text-center flex flex-col gap-y-8">
          <h1 className="text-6xl leading-tight font-[900] bg-gradient-primary text-transparent bg-clip-text">
            The Chinese - Vietnamese Text Alignment Tool
          </h1>
          <div className="flex gap-6 justify-center">
            <Link to="/ocr" className="px-4 py-2 border-2 border-primary hover:bg-primary transition rounded">
              Ocr Chinese Pdf
            </Link>
            <Link to="/txt" className="px-4 py-2 border-2 border-primary hover:bg-primary transition rounded">
              Align Chinese Ocr - Txt
            </Link>
            <Link to="/chivi" className="px-4 py-2 border-2 border-primary hover:bg-primary transition rounded">
              Align Chinese - Vietnamese
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
