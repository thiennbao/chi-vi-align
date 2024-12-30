import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed z-50 w-full h-16 px-16 flex justify-end items-center bg-dark-1 shadow-[0px_0px_0px_0.1px_lightgray]">
      <nav className="font-[500] text-sm divide-x divide-neutral-500 -mx-4 *:px-4">
        <Link to="/" className="hover:text-primary transition">
          Home
        </Link>
        <Link to="/tool" className="hover:text-primary transition">
          Tool
        </Link>
        <Link to="/storage" className="hover:text-primary transition">
          Storage
        </Link>
      </nav>
    </header>
  );
};

export default Header;
