import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

import {
  Crown,
  Hotel,
  History,
  Star,
  ArrowLeft
} from "lucide-react";

export default function ClientLogin() {

  const [nom, setNom] =
    useState("");

  const [cin, setCin] =
    useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/Client/login",
        {
          nom,
          cin
        }
      );

      localStorage.setItem(
        "client",
        JSON.stringify(res.data)
      );

      localStorage.setItem(
        "role",
        "CLIENT"
      );

      navigate("/client");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data ||
        "Client introuvable"
      );
    }
  };

  return (

    <div
  className="
    h-screen
    relative
    flex
    items-center
    justify-center
    overflow-hidden
    px-6
  "
>

      {/* BACKGROUND */}
      <img
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
        alt=""
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

      {/* OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-black/80
        "
      />

      {/* GOLD LIGHT */}
      <div
        className="
          absolute
          top-[-120px]
          right-[-100px]
          w-[350px]
          h-[350px]
          bg-yellow-500/20
          rounded-full
          blur-[120px]
        "
      />

      {/* MAIN CARD */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-4xl
          bg-white/10
          backdrop-blur-2xl
          border
          border-white/10
          rounded-[35px]
          shadow-2xl
          overflow-hidden
          grid
          lg:grid-cols-2
        "
      >

        {/* RETURN BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="
            absolute
            top-5
            right-5
            z-20
            w-11
            h-11
            rounded-2xl
            bg-white/10
            border
            border-white/10
            flex
            items-center
            justify-center
            text-white
            hover:bg-red-500
            transition
          "
        >
          <ArrowLeft size={20} />
        </button>

        {/* LEFT SIDE */}
        <div
          className="
            hidden
            lg:flex
            flex-col
            justify-between
            px-10
            py-10
            bg-gradient-to-br
            from-black/40
            to-yellow-900/10
          "
        >

          <p
            className="
              uppercase
              tracking-[6px]
              text-yellow-400
              text-sm
              mb-4
            "
          >
            Client Area
          </p>

          <h1
            className="
              text-5xl
              font-black
              text-white
              leading-tight
            "
          >
            DAR{" "}
            <span className="text-yellow-400">
              HAFSA
            </span>
          </h1>

          <p
            className="
              text-gray-300
              text-base
              leading-7
              mt-6
              max-w-md
            "
          >
            Consultez vos réservations,
            votre historique et profitez
            d’un espace client premium.
          </p>

          {/* FEATURES */}
          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-4">

              <div
                className="
                  w-11
                  h-11
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
                <History size={20} />
              </div>

              <p className="text-white">
                Historique des séjours
              </p>

            </div>

            <div className="flex items-center gap-4">

              <div
                className="
                  w-11
                  h-11
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
                <Hotel size={20} />
              </div>

              <p className="text-white">
                Consultation des réservations
              </p>

            </div>

            <div className="flex items-center gap-4">

              <div
                className="
                  w-11
                  h-11
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
                <Star size={20} />
              </div>

              <p className="text-white">
                Expérience Luxury Hotel
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
<div
  className="
    flex
    flex-col
    justify-center
    px-8
    py-10
    lg:px-12
  "
>

  {/* ICON */}
  <div
    className="
      w-16
      h-16
      rounded-[24px]
      bg-yellow-400/10
      border
      border-yellow-400/20
      flex
      items-center
      justify-center
      text-yellow-400
      mb-5
    "
  >
    <Crown size={30} />
  </div>

  <h2
    className="
      text-3xl
      font-black
      text-white
      mb-2
    "
  >
    Connexion Client
  </h2>

  <p
    className="
      text-gray-400
      leading-7
      mb-6
    "
  >
    Cet espace permet uniquement
    de consulter vos réservations
    et votre historique.
  </p>

  {/* FORM */}
  <form
    onSubmit={handleLogin}
    className="space-y-5"
  >

    {/* NOM */}
    <div>

      <label
        className="
          block
          text-gray-300
          mb-2
          font-medium
        "
      >
        Nom du client
      </label>

      <input
        type="text"
        placeholder="Entrer votre nom"
        value={nom}
        onChange={(e) =>
          setNom(e.target.value)
        }
        className="
          w-full
          bg-white/10
          border
          border-white/10
          text-white
          placeholder-gray-500
          p-4
          rounded-2xl
          outline-none
          focus:border-yellow-400
          focus:ring-2
          focus:ring-yellow-400/20
          transition
        "
        required
      />

    </div>

    {/* CIN */}
    <div>

      <label
        className="
          block
          text-gray-300
          mb-2
          font-medium
        "
      >
        CIN
      </label>

      <input
        type="password"
        placeholder="Entrer votre CIN"
        value={cin}
        onChange={(e) =>
          setCin(e.target.value)
        }
        className="
          w-full
          bg-white/10
          border
          border-white/10
          text-white
          placeholder-gray-500
          p-4
          rounded-2xl
          outline-none
          focus:border-yellow-400
          focus:ring-2
          focus:ring-yellow-400/20
          transition
        "
        required
      />

    </div>

    {/* BUTTON */}
    <button
      type="submit"
      className="
        w-full
        bg-yellow-400
        hover:bg-yellow-300
        text-black
        py-4
        rounded-2xl
        font-black
        text-lg
        transition-all
        duration-300
        hover:scale-[1.02]
        shadow-xl
        shadow-yellow-500/20
      "
    >
      Accéder à mon espace
    </button>

  </form>

</div>

      </div>

    </div>
  );
}