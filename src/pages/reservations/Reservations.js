import { useEffect, useState, useCallback } from "react";
import API from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";
import ReservationForm from "./ReservationForm";

export default function Reservations() {

  const [reservations, setReservations] = useState([]);
  const [selectedFacture, setSelectedFacture] = useState(null);

  // 🔥 MODAL FORM
  const [showForm, setShowForm] = useState(false);

  // 🔥 LOAD
  const fetchReservations = useCallback(async () => {

    try {

      const res = await API.get("/reservations");

      setReservations(res.data);

    } catch (err) {

      console.log(err);
    }

  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  // 🔴 CANCEL
  const cancelReservation = async (id) => {

    if (!window.confirm("Annuler cette réservation ?")) {
      return;
    }

    try {

      await API.post(`/reservations/${id}/cancel`);

      fetchReservations();

    } catch (err) {

      console.log(err);

      alert("Erreur annulation");
    }
  };

  // 🔵 CHECK IN
  const checkIn = async (id) => {

    try {

      await API.post(`/reservations/${id}/checkin`);

      fetchReservations();

    } catch (err) {

      console.log(err);

      alert("Erreur CheckIn");
    }
  };

  // 🟢 CHECK OUT
  const checkOut = async (id) => {

    try {

      await API.post(`/reservations/${id}/checkout`);

      fetchReservations();

    } catch (err) {

      console.log(err);

      alert("Erreur CheckOut");
    }
  };

  // 🔥 STATUS STYLE
  const getStatusStyle = (statut) => {

    switch (statut?.toLowerCase()) {

      case "confirmée":
      case "confirmee":
        return "bg-blue-500/20 text-blue-300 border border-blue-500/30";

      case "annulée":
      case "annulee":
        return "bg-red-500/20 text-red-300 border border-red-500/30";

      case "terminée":
      case "terminee":
        return "bg-green-500/20 text-green-300 border border-green-500/30";

      default:
        return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";
    }
  };

  return (

    <DashboardLayout>

      <div className="min-h-screen bg-[#0b0b0b] text-white p-8">

        {/* HEADER */}
<div className="flex justify-between items-center mb-10 flex-wrap gap-5">

  <div>

    <h1 className="text-5xl gold-text">
      Réservations
    </h1>

    <p className="text-gray-400 mt-2">
      Gestion des réservations premium
    </p>

  </div>

  <div className="flex items-center gap-4">

    {/* COUNT */}
    <div
      className="
        bg-[#161616]
        border
        border-yellow-500/20
        px-6
        py-3
        rounded-2xl
        text-center
        min-w-[120px]
      "
    >

      <p className="text-3xl font-black text-yellow-400">
        {reservations.length}
      </p>

      <p className="text-sm text-gray-400">
        Réservations
      </p>

    </div>

    {/* BUTTON */}
    <button
      onClick={() => setShowForm(true)}
      className="
        bg-yellow-400
        hover:bg-yellow-300
        text-black
        px-7
        py-4
        rounded-2xl
        font-bold
        shadow-xl
        transition
      "
    >
      + Ajouter
    </button>

  </div>

</div>

        {/* TABLE */}
        <div className="luxury-card overflow-hidden p-4">

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b border-yellow-500/20 text-yellow-400">

                <th className="py-4 text-left px-2">
                  Client
                </th>

                <th className="py-4 text-left px-2">
                  Chambre
                </th>

                <th className="py-4 text-center px-2">
                  Arrivée
                </th>

                <th className="py-4 text-center px-2">
                  Départ
                </th>

                <th className="py-4 text-center px-2">
                  Statut
                </th>

                <th className="py-4 text-center px-2">
                  Remise
                </th>

                <th className="py-4 text-center px-2">
                  Facture
                </th>

                <th className="py-4 text-center px-2 w-[220px]">
                  Actions
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
                      border-gray-800
                      hover:bg-white/5
                      transition
                    "
                  >

                    {/* CLIENT */}
                    <td className="py-5 px-2 font-semibold whitespace-nowrap">
                      {r.client}
                    </td>

                    <td className="p-4 text-gray-300 leading-6">

  {r.chambre?.split("-")[0]}
  
  <br />

  <span className="text-sm text-gray-500">
    {r.chambre?.split("-")[1]}
  </span>

</td>

                    {/* ARRIVEE */}
                    <td className="py-5 px-2 text-center whitespace-nowrap">
                      {r.dateArrivee?.substring(0, 10)}
                    </td>

                    {/* DEPART */}
                    <td className="py-5 px-2 text-center whitespace-nowrap">
                      {r.dateDepart?.substring(0, 10)}
                    </td>

                    {/* STATUS */}
                    <td className="py-5 px-2 text-center">

                      <span
                        className={`
                          px-4
                          py-2
                          rounded-full
                          text-xs
                          font-bold
                          whitespace-nowrap
                          ${getStatusStyle(r.statut)}
                        `}
                      >
                        {r.statut}
                      </span>

                    </td>

                    {/* REMISE */}
                    <td className="py-5 px-2 text-center whitespace-nowrap">
                      {r.remise} %
                    </td>

                    {/* FACTURE */}
                    <td className="py-5 px-2 text-center">

                      {r.facture ? (

                        <button
                          onClick={() =>
                            setSelectedFacture(r.facture)
                          }
                          className="
                            bg-purple-600/20
                            hover:bg-purple-600
                            border
                            border-purple-500/30
                            text-purple-300
                            hover:text-white
                            px-4
                            py-2
                            rounded-xl
                            transition
                          "
                        >
                          🧾
                        </button>

                      ) : (

                        <span className="text-gray-500">
                          --
                        </span>

                      )}

                    </td>

                    {/* ACTIONS */}
                    <td className="py-5 px-2">

                      <div className="flex items-center justify-center gap-2">

                        {/* CANCEL */}
                        <button
                          onClick={() =>
                            cancelReservation(r.id)
                          }
                          className="
                            w-10
                            h-10
                            rounded-xl
                            bg-red-500/20
                            hover:bg-red-500
                            text-red-300
                            hover:text-white
                            transition
                            text-lg
                          "
                        >
                          ✖
                        </button>

                        {/* CHECK IN */}
                        <button
                          onClick={() =>
                            checkIn(r.id)
                          }
                          className="
                            w-10
                            h-10
                            rounded-xl
                            bg-blue-500/20
                            hover:bg-blue-500
                            text-blue-300
                            hover:text-white
                            transition
                            text-lg
                          "
                        >
                          🔑
                        </button>

                        {/* CHECK OUT */}
                        <button
                          onClick={() =>
                            checkOut(r.id)
                          }
                          className="
                            w-10
                            h-10
                            rounded-xl
                            bg-green-500/20
                            hover:bg-green-500
                            text-green-300
                            hover:text-white
                            transition
                            text-lg
                          "
                        >
                          🚪
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="
                      text-center
                      py-20
                      text-gray-500
                      text-lg
                    "
                  >
                    Aucune réservation trouvée
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* FORM MODAL */}
        {showForm && (

          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

            <div
              className="
                bg-[#111]
                border
                border-yellow-500/20
                rounded-3xl
                w-full
                max-w-5xl
                shadow-2xl
                relative
                p-8
              "
            >

              {/* CLOSE */}
              <button
                onClick={() => setShowForm(false)}
                className="
                  absolute
                  top-5
                  right-6
                  text-3xl
                  text-gray-500
                  hover:text-red-500
                "
              >
                ✕
              </button>

              <ReservationForm
                onFinish={() => {
                  setShowForm(false);
                  fetchReservations();
                }}
              />

            </div>

          </div>

        )}

        {/* FACTURE MODAL */}
        {selectedFacture && (

          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

            <div
              className="
                bg-[#111]
                border
                border-yellow-500/20
                w-[450px]
                rounded-3xl
                shadow-2xl
                p-8
                relative
              "
            >

              {/* CLOSE */}
              <button
                onClick={() =>
                  setSelectedFacture(null)
                }
                className="
                  absolute
                  top-4
                  right-5
                  text-2xl
                  text-gray-500
                  hover:text-red-500
                "
              >
                ✕

              </button>

              <h3 className="text-3xl gold-text mb-6">

                Facture

              </h3>

              <div className="space-y-5 text-gray-300">

                <p>
                  <b className="text-yellow-400">
                    ID :
                  </b>{" "}
                  {selectedFacture.id}
                </p>

                <p>
                  <b className="text-yellow-400">
                    Date :
                  </b>{" "}
                  {selectedFacture.date?.substring(0,10)}
                </p>

                <p>
                  <b className="text-yellow-400">
                    Montant :
                  </b>{" "}
                  {selectedFacture.montantTotal} DH
                </p>

                <p>
                  <b className="text-yellow-400">
                    Remise :
                  </b>{" "}
                  {selectedFacture.remise} %
                </p>

              </div>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}