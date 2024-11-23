import { Outlet } from "react-router-dom";
import Navbar from "./components/pages/Navbar";

function Layout() {
  return (
    <div>
      <Navbar />
      {/* This Outlet will render the child routes */}

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
