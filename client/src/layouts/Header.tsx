import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed z-50 w-full h-16 px-16 flex justify-between items-center bg-dark-1 shadow-[0px_0px_0px_0.1px_lightgray]">
      <div className="h-full">
        <Link to="/">
          <img src="/logo.svg" className="h-full" />
        </Link>
      </div>
      <nav className="flex font-[500] text-sm divide-x divide-neutral-500 -mx-4 *:px-4">
        <Link to="/tool" className="hover:text-primary transition">
          Tool
        </Link>
        <div className="flex gap-4">
          <Link to="" className="hover:text-primary transition">
            <Icon icon="mdi:github" width="24" height="24" />
          </Link>
          <Link to="" className="hover:text-primary transition">
            <Icon icon="simple-icons:huggingface" width="24" height="24" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
