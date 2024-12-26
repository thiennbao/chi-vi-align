import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed z-50 w-full h-16 px-16 flex justify-between items-center bg-dark shadow-[0px_0px_0px_0.1px_lightgray]">
      <div>
        <Link to="/">
          <img src="/logo.svg" />
        </Link>
      </div>
      <nav className="flex gap-8 font-[500] text-sm">
        <Link to="/ocr">Ocr Pdf</Link>
        <Link to="/txt">Align Txt</Link>
        <Link to="/chivi">Align Chi-Vi</Link>
      </nav>
    </header>
  );
};

export default Header;
