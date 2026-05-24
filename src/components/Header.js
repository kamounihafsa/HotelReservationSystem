import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        backdrop-blur-xl
        bg-black/70
        border-b
        border-yellow-500/20
      "
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

        {/* LOGO */}
        <div>
          <h1
            className="
              text-3xl
              font-extrabold
              tracking-[4px]
              text-white
            "
          >
            DAR <span className="text-yellow-400">HAFSA</span>
          </h1>

          <p className="text-gray-400 text-xs tracking-[3px] mt-1">
            LUXURY HOTEL
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4">

          <Link to="/login">

            <button
              className="
                px-6
                py-3
                rounded-xl
                border
                border-yellow-400
                text-yellow-400
                font-semibold
                hover:bg-yellow-400
                hover:text-black
                transition-all
                duration-300
                shadow-lg
                hover:shadow-yellow-500/30
              "
            >
              Espace Staff
            </button>

          </Link>

          <Link to="/client-login">

            <button
              className="
                px-6
                py-3
                rounded-xl
                bg-yellow-400
                text-black
                font-bold
                hover:scale-105
                hover:bg-yellow-300
                transition-all
                duration-300
                shadow-xl
                shadow-yellow-500/20
              "
            >
              Espace Client
            </button>

          </Link>

        </div>

      </div>
    </header>
  );
}