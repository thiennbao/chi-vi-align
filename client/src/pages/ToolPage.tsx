import Tool from "../components/Tool";
import Layout from "../layouts/Layout";

const ToolPage = () => {
  return (
    <Layout>
      <div className="pt-16 h-screen flex justify-center items-center">
        <Tool className="w-4/5 h-4/5 grid grid-cols-3 gap-6" />
      </div>
    </Layout>
  );
};

export default ToolPage;
