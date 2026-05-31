


import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";



function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-black text-white min-h-screen fixed">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-64 flex flex-col">

        <Navbar />

        <main className="p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;