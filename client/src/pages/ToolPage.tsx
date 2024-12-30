import Tool from "../components/Tool";
import Layout from "../layouts/Layout";

const ToolPage = () => {
  return (
    <Layout>
      <div className="pt-16 min-h-screen flex justify-center items-center">
        <Tool className="py-16 lg:py-0 w-4/5 h-4/5" />
      </div>
    </Layout>
  );
};

export default ToolPage;
