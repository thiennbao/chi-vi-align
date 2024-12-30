import { useParams } from "react-router-dom";
import Result from "../components/Result";
import Layout from "../layouts/Layout";

const ResultPage = () => {
  const { id } = useParams();

  return (
    <Layout>
      <div className="pt-16 min-h-screen lg:h-screen flex justify-center items-center">
        <Result id={id || ""} className="py-16 lg:py-0 w-4/5 h-4/5" />
      </div>
    </Layout>
  );
};

export default ResultPage;
