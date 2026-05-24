import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({
  children
}) {

  return (

    <div
      className="
        bg-black
        min-h-screen
      "
    >

      {/* SIDEBAR FIXE */}
      <div
        className="
          fixed
          top-0
          left-0
          h-screen
          w-64
          z-50
        "
      >
        <Sidebar />
      </div>

      {/* RIGHT SIDE */}
      <div
        className="
          ml-64
          min-h-screen
          bg-gradient-to-br
          from-[#0B0B0B]
          via-[#111]
          to-black
          overflow-x-hidden
          p-8 pt-32
        "
      >

        {/* NAVBAR WITH SPACE */}
        <div className="ml-3">

          <Navbar />

        </div>

        {/* PAGE CONTENT */}
        <div className="mt-6 ml-3">
          {children}
        </div>

      </div>

    </div>
  );
}