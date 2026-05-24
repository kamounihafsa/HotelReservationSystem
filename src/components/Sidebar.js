import {
  Link,
  useLocation
} from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  BedDouble,
  CalendarDays,
  ShieldCheck
} from "lucide-react";

export default function Sidebar() {

  const role =
    localStorage.getItem("role");

  const location =
    useLocation();

  const isActive = (path) =>
    location.pathname === path;

  const menuClass = (path) =>
    `
      flex
      items-center
      gap-4
      px-5
      py-4
      rounded-2xl
      transition-all
      duration-300
      font-semibold
      text-[15px]
      ${
        isActive(path)
          ? `
            bg-yellow-400
            text-black
            shadow-2xl
            shadow-yellow-500/20
          `
          : `
            text-gray-300
            hover:bg-white/5
            hover:text-yellow-400
          `
      }
    `;

  const iconClass = (path) =>
    `
      w-11
      h-11
      rounded-2xl
      flex
      items-center
      justify-center
      transition-all
      duration-300
      ${
        isActive(path)
          ? `
            bg-black/10
            text-black
          `
          : `
            bg-white/[0.04]
            text-yellow-400
            group-hover:bg-yellow-400/10
          `
      }
    `;

  return (

    <div
      className="
        w-72
        min-h-screen
        bg-[#0B0B0B]
        border-r
        border-yellow-500/10
        flex
        flex-col
        px-5
        py-8
      "
    >

      {/* LOGO */}
      <div className="mb-14">

        <h1
          className="
            text-4xl
            font-black
            text-white
            tracking-[3px]
          "
        >
          DAR{" "}
          <span className="text-yellow-400">
            HAFSA
          </span>
        </h1>

        <p
          className="
            text-gray-500
            mt-2
            tracking-[4px]
            text-xs
          "
        >
          LUXURY HOTEL
        </p>

      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-4">

        {/* DASHBOARD */}
        <Link
          to={
            role === "ADMIN"
              ? "/dashboard/admin"
              : "/dashboard/reception"
          }
          className={`
            group
            ${menuClass(
              role === "ADMIN"
                ? "/dashboard/admin"
                : "/dashboard/reception"
            )}
          `}
        >

          <div
            className={iconClass(
              role === "ADMIN"
                ? "/dashboard/admin"
                : "/dashboard/reception"
            )}
          >
            <LayoutDashboard size={22} />
          </div>

          Dashboard

        </Link>

        {/* RECEPTIONNISTE */}
        {role === "RECEPTIONNISTE" && (
          <>

            {/* CLIENTS */}
            <Link
              to="/dashboard/clients"
              className={`
                group
                ${menuClass(
                  "/dashboard/clients"
                )}
              `}
            >

              <div
                className={iconClass(
                  "/dashboard/clients"
                )}
              >
                <Users size={22} />
              </div>

              Clients

            </Link>

            {/* CHAMBRES */}
            <Link
              to="/dashboard/chambres"
              className={`
                group
                ${menuClass(
                  "/dashboard/chambres"
                )}
              `}
            >

              <div
                className={iconClass(
                  "/dashboard/chambres"
                )}
              >
                <BedDouble size={22} />
              </div>

              Chambres

            </Link>

            {/* RESERVATIONS */}
            <Link
              to="/dashboard/reservations"
              className={`
                group
                ${menuClass(
                  "/dashboard/reservations"
                )}
              `}
            >

              <div
                className={iconClass(
                  "/dashboard/reservations"
                )}
              >
                <CalendarDays size={22} />
              </div>

              Réservations

            </Link>

          </>
        )}

        {/* ADMIN */}
        {role === "ADMIN" && (
          <>

            {/* CHAMBRES */}
            <Link
              to="/dashboard/admin/chambres"
              className={`
                group
                ${menuClass(
                  "/dashboard/admin/chambres"
                )}
              `}
            >

              <div
                className={iconClass(
                  "/dashboard/admin/chambres"
                )}
              >
                <BedDouble size={22} />
              </div>

              Chambres

            </Link>

            {/* USERS */}
            <Link
              to="/dashboard/users"
              className={`
                group
                ${menuClass(
                  "/dashboard/users"
                )}
              `}
            >

              <div
                className={iconClass(
                  "/dashboard/users"
                )}
              >
                <ShieldCheck size={22} />
              </div>

              Utilisateurs

            </Link>

          </>
        )}

      </nav>

    </div>
  );
}