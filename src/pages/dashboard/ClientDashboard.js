import {
  useEffect,
  useState,
  useCallback
} from "react";

import API from "../../services/api";

import {
  useNavigate
} from "react-router-dom";

export default function ClientDashboard() {

  const navigate = useNavigate();

  const [reservations, setReservations] =
    useState([]);

  const [selectedFacture, setSelectedFacture] =
    useState(null);

  const client = JSON.parse(
    localStorage.getItem("client")
  );

  /* ======================================
     REDIRECT IF CLIENT NOT CONNECTED
  ====================================== */
  useEffect(() => {

    if (!client) {

      navigate("/client-login");
    }

  }, [client, navigate]);

  /* ======================================
     FETCH RESERVATIONS
  ====================================== */
  const fetchReservations = useCallback(async () => {

    if (!client) return;

    try {

      const res = await API.post(
        "/Client/mes-reservations",
        {
          nom: client.nom,
          cin: client.numeroIdentite
        }
      );

      setReservations(res.data);

    } catch (err) {

      console.log(err);
    }

  }, [client]);

  /* ======================================
     LOAD DATA
  ====================================== */
  useEffect(() => {

    fetchReservations();

  }, [fetchReservations]);

  /* ======================================
     LOADING
  ====================================== */
  if (!client) {

    return null;
  }

  return (

    <div
      className="
        min-h-screen
        bg-[#0a0a0a]
        p-6
        lg:p-10
        relative
        overflow-hidden
      "
    >

      {/* BACKGROUND IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
        alt=""
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          opacity-10
        "
      />

      {/* DARK OVERLAY */}
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
          top-[-180px]
          right-[-180px]
          w-[420px]
          h-[420px]
          bg-yellow-500/10
          rounded-full
          blur-[150px]
        "
      />

      <div className="relative z-10 space-y-8">

        {/* ======================================
            HEADER
        ====================================== */}
        <div
          className="
            bg-white/5
            backdrop-blur-2xl
            border
            border-white/10
            rounded-[35px]
            p-8
            shadow-2xl
          "
        >

          <div
            className="
              flex
              justify-between
              items-center
              flex-wrap
              gap-6
            "
          >

            {/* LEFT */}
            <div>

              <p
                className="
                  uppercase
                  tracking-[7px]
                  text-yellow-400
                  text-sm
                  mb-3
                "
              >
                Client Space
              </p>

              <h1
                className="
                  text-5xl
                  font-black
                  text-white
                "
              >
                Bienvenue{" "}

                <span className="text-yellow-400">
                  {client.nom}
                </span>

              </h1>

              <p
                className="
                  text-gray-400
                  mt-4
                  text-lg
                "
              >
                Consultez vos réservations
                et vos factures premium.
              </p>

            </div>

            {/* RIGHT */}
            <div
              className="
                flex
                items-center
                gap-4
                flex-wrap
              "
            >

              {/* RESERVATION COUNT */}
              <div
                className="
                  bg-yellow-400
                  text-black
                  px-8
                  py-5
                  rounded-3xl
                  text-center
                  shadow-2xl
                  min-w-[180px]
                "
              >

                <p
                  className="
                    text-4xl
                    font-black
                  "
                >
                  {reservations.length}
                </p>

                <p className="font-bold">
                  Réservations
                </p>

              </div>

              {/* LOGOUT */}
              <button
                onClick={() => {

                  localStorage.removeItem("client");

                  localStorage.removeItem("role");

                  navigate("/client-login");
                }}
                className="
                  h-[95px]
                  px-8
                  rounded-3xl
                  bg-red-500/10
                  border
                  border-red-500/20
                  text-red-400
                  font-black
                  hover:bg-red-500
                  hover:text-white
                  transition-all
                  duration-300
                  shadow-xl
                "
              >
                Logout
              </button>

            </div>

          </div>

        </div>

        {/* ======================================
            RESERVATIONS TABLE
        ====================================== */}
        <div
          className="
            bg-white/5
            backdrop-blur-2xl
            border
            border-white/10
            rounded-[35px]
            shadow-2xl
            overflow-hidden
          "
        >

          {/* TOP */}
          <div
            className="
              px-8
              py-6
              border-b
              border-white/5
            "
          >

            <h2
              className="
                text-3xl
                font-black
                text-white
              "
            >
              Mes Réservations
            </h2>

            <p className="text-gray-400 mt-2">
              Historique complet des séjours
            </p>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead
                className="
                  bg-black/60
                  text-white
                "
              >

                <tr>

                  <th className="p-6 text-left">
                    Chambre
                  </th>

                  <th className="p-6 text-left">
                    Arrivée
                  </th>

                  <th className="p-6 text-left">
                    Départ
                  </th>

                  <th className="p-6 text-left">
                    Remise
                  </th>

                  <th className="p-6 text-left">
                    Montant
                  </th>

                  <th className="p-6 text-center">
                    Facture
                  </th>

                </tr>

              </thead>

              <tbody>

                {reservations.length > 0 ? (

                  reservations.map((r) => (

                    <tr
                      key={r.id}
                      className="
                        border-b
                        border-white/5
                        hover:bg-white/[0.03]
                        transition-all
                      "
                    >

                      {/* CHAMBRE */}
                      <td className="p-6">

                        <div
                          className="
                            flex
                            items-center
                            gap-4
                          "
                        >

                          <div
                            className="
                              w-14
                              h-14
                              rounded-2xl
                              bg-yellow-400/10
                              border
                              border-yellow-400/20
                              flex
                              items-center
                              justify-center
                              text-yellow-400
                              font-black
                              text-lg
                            "
                          >
                            {r.chambreNumero}
                          </div>

                          <div>

                            <p
                              className="
                                text-white
                                font-bold
                                text-lg
                              "
                            >
                              Chambre {r.chambreNumero}
                            </p>

                            <p className="text-gray-500">
                              Luxury Room
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* ARRIVEE */}
                      <td className="p-6 text-gray-300">

                        {
                          r.dateArrivee.split("T")[0]
                        }

                      </td>

                      {/* DEPART */}
                      <td className="p-6 text-gray-300">

                        {
                          r.dateDepart.split("T")[0]
                        }

                      </td>

                      {/* REMISE */}
                      <td className="p-6">

                        <span
                          className="
                            bg-yellow-400/10
                            border
                            border-yellow-400/20
                            text-yellow-400
                            px-4
                            py-2
                            rounded-full
                            font-bold
                          "
                        >
                          {r.remise} %
                        </span>

                      </td>

                      {/* MONTANT */}
                      <td className="p-6">

                        <p
                          className="
                            text-2xl
                            font-black
                            text-white
                          "
                        >
                          {r.montantTotal} DH
                        </p>

                      </td>

                      {/* FACTURE */}
                      <td className="p-6 text-center">

                        <button
                          onClick={() =>
                            setSelectedFacture(r)
                          }
                          className="
                            bg-yellow-400
                            hover:bg-yellow-300
                            text-black
                            px-6
                            py-3
                            rounded-2xl
                            font-black
                            transition-all
                            duration-300
                            hover:scale-105
                            shadow-xl
                            shadow-yellow-500/20
                          "
                        >
                          Voir Facture
                        </button>

                      </td>

                    </tr>
                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="
                        p-16
                        text-center
                      "
                    >

                      <h3
                        className="
                          text-3xl
                          font-black
                          text-white
                          mb-3
                        "
                      >
                        Aucune réservation
                      </h3>

                      <p className="text-gray-500">
                        Aucun historique trouvé
                      </p>

                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* ======================================
          FACTURE MODAL
      ====================================== */}
      {selectedFacture && (

        <div
          className="
            fixed
            inset-0
            bg-black/80
            backdrop-blur-md
            flex
            items-center
            justify-center
            z-50
            p-6
          "
        >

          <div
            className="
              w-full
              max-w-2xl
              bg-[#111111]
              border
              border-white/10
              rounded-[35px]
              overflow-hidden
              shadow-2xl
            "
          >

            {/* TOP */}
            <div
              className="
                bg-gradient-to-r
                from-black
                to-[#181818]
                p-8
                border-b
                border-white/5
              "
            >

              <div
                className="
                  flex
                  justify-between
                  items-start
                "
              >

                <div>

                  <p
                    className="
                      uppercase
                      tracking-[6px]
                      text-yellow-400
                      text-sm
                      mb-3
                    "
                  >
                    Luxury Invoice
                  </p>

                  <h2
                    className="
                      text-4xl
                      font-black
                      text-white
                    "
                  >
                    FACTURE
                  </h2>

                  <p className="text-gray-400 mt-3">
                    Réservation N°
                    {" "}
                    {selectedFacture.id}
                  </p>

                </div>

                {/* CLOSE */}
                <button
                  onClick={() =>
                    setSelectedFacture(null)
                  }
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-red-500/10
                    border
                    border-red-500/20
                    text-red-400
                    text-xl
                    hover:bg-red-500
                    hover:text-white
                    transition-all
                  "
                >
                  ✕
                </button>

              </div>

            </div>

            {/* BODY */}
            <div className="p-8 space-y-6">

              {/* CARDS */}
              <div
                className="
                  grid
                  md:grid-cols-2
                  gap-5
                "
              >

                {/* CLIENT */}
                <div
                  className="
                    bg-black
                    rounded-3xl
                    p-6
                    border
                    border-white/5
                  "
                >

                  <p className="text-gray-500 mb-2">
                    Client
                  </p>

                  <h3
                    className="
                      text-2xl
                      font-black
                      text-white
                    "
                  >
                    {client.nom}
                  </h3>

                </div>

                {/* PRICE */}
                <div
                  className="
                    bg-yellow-400
                    rounded-3xl
                    p-6
                    text-black
                  "
                >

                  <p className="font-medium mb-2">
                    Montant Total
                  </p>

                  <h3
                    className="
                      text-4xl
                      font-black
                    "
                  >
                    {selectedFacture.montantTotal}
                    {" "}DH
                  </h3>

                </div>

              </div>

              {/* DETAILS */}
              <div
                className="
                  bg-[#1a1a1a]
                  rounded-3xl
                  border
                  border-white/5
                  overflow-hidden
                "
              >

                {/* CHAMBRE */}
                <div
                  className="
                    flex
                    justify-between
                    p-5
                    border-b
                    border-white/5
                  "
                >

                  <span className="text-gray-400">
                    Chambre
                  </span>

                  <span className="text-white font-bold">
                    Chambre {
                      selectedFacture.chambreNumero
                    }
                  </span>

                </div>

                {/* ARRIVEE */}
                <div
                  className="
                    flex
                    justify-between
                    p-5
                    border-b
                    border-white/5
                  "
                >

                  <span className="text-gray-400">
                    Date Arrivée
                  </span>

                  <span className="text-white font-bold">
                    {
                      selectedFacture
                        .dateArrivee
                        .split("T")[0]
                    }
                  </span>

                </div>

                {/* DEPART */}
                <div
                  className="
                    flex
                    justify-between
                    p-5
                    border-b
                    border-white/5
                  "
                >

                  <span className="text-gray-400">
                    Date Départ
                  </span>

                  <span className="text-white font-bold">
                    {
                      selectedFacture
                        .dateDepart
                        .split("T")[0]
                    }
                  </span>

                </div>

                {/* REMISE */}
                <div
                  className="
                    flex
                    justify-between
                    p-5
                  "
                >

                  <span className="text-gray-400">
                    Remise
                  </span>

                  <span
                    className="
                      text-yellow-400
                      font-black
                    "
                  >
                    {selectedFacture.remise} %
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}