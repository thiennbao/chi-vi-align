import { HTMLAttributes } from "react";
import Header from "./Header";

const Layout = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="bg-dark text-neutral-200 min-h-screen">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
