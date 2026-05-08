import { Link } from "react-router-dom";

export default function Header() {

  return (

    <header className="bg-black text-white flex justify-between items-center px-8 py-4">

      <h1 className="text-2xl font-bold text-yellow-400">
        Dar Hafsa
      </h1>

      <div className="flex gap-4">

        {/* LOGIN USER */}
        <Link to="/login">

          <button
            className="
              bg-yellow-400
              text-black
              px-4
              py-2
              rounded-lg
              hover:bg-yellow-500
              font-semibold
            "
          >
            Login Utilisateur
          </button>

        </Link>

        {/* LOGIN CLIENT */}
        <Link to="/client-login">

          <button
            className="
              bg-white
              text-black
              px-4
              py-2
              rounded-lg
              hover:bg-gray-200
              font-semibold
            "
          >
            Login Client
          </button>

        </Link>

      </div>

    </header>
  );
}