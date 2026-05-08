import { Link } from "react-router-dom";

export default function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <div className="w-64 h-screen bg-black text-white p-4">

      {/* LOGO */}
      <h2 className="text-xl font-bold text-yellow-400 mb-8">
        Dar Hafsa
      </h2>

      <nav className="flex flex-col gap-4">

        {/* ================= DASHBOARD ================= */}
        <Link to={role === "ADMIN" ? "/dashboard/admin" : "/dashboard/reception"}>
          <span className="hover:text-yellow-400 cursor-pointer">
            Dashboard
          </span>
        </Link>

        {/* ================= RECEPTIONNISTE ================= */}
        {role === "RECEPTIONNISTE" && (
          <>
            <Link to="/dashboard/clients">
              <span className="hover:text-yellow-400 cursor-pointer">
                Clients
              </span>
            </Link>

            <Link to="/dashboard/chambres">
              <span className="hover:text-yellow-400 cursor-pointer">
                Chambres
              </span>
            </Link>

            <Link to="/dashboard/reservations">
              <span className="hover:text-yellow-400 cursor-pointer">
                Réservations
              </span>
            </Link>
          </>
        )}

        {/* ================= ADMIN ================= */}
        {role === "ADMIN" && (
          <Link to="/dashboard/users">
            <span className="hover:text-yellow-400 cursor-pointer">
              Utilisateurs
            </span>
          </Link>
        )}

      </nav>
    </div>
  );
}