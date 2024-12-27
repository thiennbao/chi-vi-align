import OcrTool from "../components/OcrTool";
import Layout from "../layouts/Layout";

const ToolPage = () => {
  return (
    <Layout>
      <div className="pt-16 h-screen flex justify-center items-center">
        <OcrTool className="w-screen h-3/4 mx-48 grid grid-cols-3 gap-6" />
      </div>
    </Layout>
  );
};

export default ToolPage;
