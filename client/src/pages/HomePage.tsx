import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import { Icon } from "@iconify/react/dist/iconify.js";

const HomePage = () => {
  return (
    <Layout>
      <div className="h-screen flex justify-center items-center">
        <div className="w-11/12 md:w-2/3 lg:w-1/2 text-center flex flex-col gap-y-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl leading-tight font-[900] bg-gradient-primary text-transparent bg-clip-text">
            The Chinese Vietnamese Text Alignment Tool
          </h1>
          <div className="flex gap-6 justify-center">
            <Link
              to="/tool"
              className="flex items-center gap-2 px-8 py-2 text-dark-1 bg-gradient-primary rounded"
            >
              <span>Get started</span>
              <Icon icon="si:arrow-right-duotone" width="24" height="24" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
