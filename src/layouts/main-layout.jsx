import Header from "./header";
import { Outlet } from "react-router-dom";
import Footer from "./footer";

const MainLayout = () => {
  return (
    <div className="max-w-[1440px] mx-auto">
      <header className="sticky top-0 z-50 bg-white">
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
