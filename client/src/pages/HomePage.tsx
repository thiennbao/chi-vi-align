import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import { Icon } from "@iconify/react/dist/iconify.js";

const HomePage = () => {
  return (
    <Layout>
      <div className="h-screen flex justify-center items-center">
        <div className="w-1/2 text-center flex flex-col gap-y-8">
          <h1 className="text-6xl leading-tight font-[900] bg-gradient-primary text-transparent bg-clip-text">
            The Chinese - Vietnamese Text Alignment Tool
          </h1>
          <div className="flex gap-6 justify-center">
            <Link
              to="/tool"
              className="flex items-center gap-2 px-6 py-2 border-2 border-primary hover:text-dark-1 hover:bg-primary transition rounded"
            >
              <span>Get started</span>
              <Icon icon="si:arrow-right-duotone" width="24" height="24" />
            </Link>
            <Link
              to=""
              className="flex items-center gap-2 px-6 py-2 border-2 border-secondary hover:text-dark-1 hover:bg-secondary transition rounded"
            >
              <span>Code</span>
              <Icon icon="mdi:github" width="24" height="24" />
            </Link>
            <Link
              to=""
              className="flex items-center gap-2 px-6 py-2 border-2 border-tertiary hover:text-dark-1 hover:bg-tertiary transition rounded"
            >
              <span>Models</span>
              <Icon icon="simple-icons:huggingface" width="24" height="24" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
