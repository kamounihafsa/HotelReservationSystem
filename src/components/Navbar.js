import { useNavigate } from "react-router-dom";

import {
  ShieldCheck,
  LogOut,
  Bell,
  Sparkles
} from "lucide-react";

export default function Navbar() {

  const navigate = useNavigate();

  const role =
    localStorage.getItem("role");

  const logout = () => {

    localStorage.clear();

    navigate("/login");
  };

  return (

    <div
      className="
        fixed
        top-0
        z-40
        backdrop-blur-2xl
        bg-[#0B0B0B]/90
        border-b
        border-yellow-500/10
        px-8
        py-5
        flex
        justify-between
        items-center
        left-[288px]
right-0
      "
    >

      {/* LEFT */}
      <div>

        {/* TOP TEXT */}
        <div className="flex items-center gap-3">

          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-yellow-400/10
              border
              border-yellow-400/20
              flex
              items-center
              justify-center
              text-yellow-400
            "
          >
            <Sparkles size={22} />
          </div>

          <div>

            <h2
              className="
                text-3xl
                font-black
                text-white
                leading-none
              "
            >
              Dashboard
            </h2>

            <p
              className="
                text-gray-500
                mt-1
                text-sm
                tracking-wide
              "
            >
              Luxury Hotel Management
            </p>

          </div>

        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* NOTIFICATION */}
        <button
          className="
            w-14
            h-14
            rounded-2xl
            bg-[#111111]
            border
            border-yellow-500/10
            text-yellow-400
            flex
            items-center
            justify-center
            hover:bg-yellow-400
            hover:text-black
            transition-all
            duration-300
            shadow-xl
          "
        >
          <Bell size={22} />
        </button>

        {/* ROLE CARD */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-4
            bg-[#111111]
            border
            border-yellow-500/10
            px-5
            py-3
            rounded-2xl
            shadow-xl
          "
        >

          {/* ICON */}
          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-yellow-400/10
              border
              border-yellow-400/20
              flex
              items-center
              justify-center
              text-yellow-400
            "
          >
            <ShieldCheck size={22} />
          </div>

          {/* TEXT */}
          <div>

            <p
              className="
                text-xs
                uppercase
                tracking-[3px]
                text-gray-500
                mb-1
              "
            >
              Connecté en tant que
            </p>

            <h4
              className="
                font-black
                text-white
                text-sm
                tracking-wide
              "
            >
              {role}
            </h4>

          </div>

        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="
            flex
            items-center
            gap-3
            bg-red-500/10
            border
            border-red-500/20
            text-red-400
            px-6
            py-4
            rounded-2xl
            font-bold
            hover:bg-red-500
            hover:text-white
            transition-all
            duration-300
            shadow-xl
          "
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </div>
  );
}