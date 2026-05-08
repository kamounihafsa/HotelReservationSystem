import { useEffect, useState, useCallback } from "react";
import API from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";
import ReservationForm from "./ReservationForm";

export default function Reservations() {

  const [reservations, setReservations] = useState([]);
  const [selectedFacture, setSelectedFacture] = useState(null);

  const fetchReservations = useCallback(async () => {
    const res = await API.get("/reservations");
    setReservations(res.data);
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const cancelReservation = async (id) => {
    await API.post(`/reservations/${id}/cancel`);
    fetchReservations();
  };

  const checkIn = async (id) => {
    await API.post(`/reservations/${id}/checkin`);
    fetchReservations();
  };

  const checkOut = async (id) => {
    await API.post(`/reservations/${id}/checkout`);
    fetchReservations();
  };

  return (
    <DashboardLayout>
      <div>

        <h2 className="text-3xl font-bold mb-6">
          Gestion Réservations
        </h2>

        <div className="bg-white shadow rounded overflow-hidden">

          <table className="w-full">

            <thead className="bg-black text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Client</th>
                <th className="p-3">Chambre</th>
                <th className="p-3">Arrivée</th>
                <th className="p-3">Départ</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Facture</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>

              {reservations.map((r) => (

                <tr
                  key={r.id}
                  className="border-b text-center"
                >
                  <td className="p-3">{r.id}</td>
                  <td className="p-3">{r.client}</td>
                  <td className="p-3">{r.chambre}</td>
                  <td className="p-3">
                    {r.dateArrivee?.substring(0,10)}
                  </td>
                  <td className="p-3">
                    {r.dateDepart?.substring(0,10)}
                  </td>
                  <td className="p-3">{r.statut}</td>

                  {/* FACTURE */}
                  <td className="p-3">
                    {r.facture ? (
                      <button
                        onClick={() =>
                          setSelectedFacture(r.facture)
                        }
                        className="bg-purple-600 text-white px-3 py-1 rounded"
                      >
                        Voir
                      </button>
                    ) : "--"}
                  </td>

                  <td className="p-3 flex gap-2 justify-center">

                    <button
                      onClick={() =>
                        cancelReservation(r.id)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() =>
                        checkIn(r.id)
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      CheckIn
                    </button>

                    <button
                      onClick={() =>
                        checkOut(r.id)
                      }
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      CheckOut
                    </button>

                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <ReservationForm onFinish={fetchReservations}/>
        </div>

        {/* MODAL FACTURE */}
        {selectedFacture && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white w-[450px] rounded-2xl shadow-2xl p-6 relative">

              <button
                onClick={() =>
                  setSelectedFacture(null)
                }
                className="absolute top-3 right-4 text-2xl"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold mb-4">
                Facture
              </h3>

              <p><b>ID :</b> {selectedFacture.id}</p>

              <p><b>Date :</b>
                {selectedFacture.date?.substring(0,10)}
              </p>

              <p><b>Montant :</b>
                {selectedFacture.montantTotal} DH
              </p>

              <p><b>Remise :</b>
                {selectedFacture.remise} %
              </p>

            </div>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}