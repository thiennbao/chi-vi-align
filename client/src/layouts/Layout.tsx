import { HTMLAttributes } from "react";
import Header from "./Header";

const Layout = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="bg-dark text-neutral-200">
      <Header />
      <main className="min-h-screen">{children}</main>
    </div>
  );
};

export default Layout;
