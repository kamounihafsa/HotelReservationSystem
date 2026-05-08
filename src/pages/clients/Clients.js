import { useEffect, useState, useCallback } from "react";
import API from "../../services/api";
import ClientForm from "./ClientForm";

export default function Clients() {

  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);

  // 🔥 HISTORY
  const [reservations, setReservations] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [clientName, setClientName] = useState("");

  // 🔥 FETCH CLIENTS
  const fetchClients = useCallback(async () => {

    try {

      let res;

      if (search.trim() === "") {
        res = await API.get("/Client");
      } else {
        res = await API.get(`/Client/search?term=${search}`);
      }

      setClients(res.data);

    } catch (err) {
      console.log(err);
    }

  }, [search]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // 🔥 DISABLE CLIENT
  const deleteClient = async (id) => {

    if (!window.confirm("Désactiver ce client ?")) return;

    try {

      await API.delete(`/Client/${id}`);

      fetchClients();

    } catch {
      alert("Erreur");
    }
  };

  // 🔥 REACTIVATE CLIENT
  const reactivateClient = async (id) => {

    try {

      await API.post(`/Client/${id}/reactivate`);

      fetchClients();

    } catch {
      alert("Erreur réactivation");
    }
  };

  // 🔥 SHOW HISTORY
  const showReservations = async (id, nom, prenom) => {

    try {

      const res = await API.get(`/Client/${id}/reservations`);

      setReservations(res.data);

      setClientName(`${nom} ${prenom}`);

      setShowHistory(true);

    } catch (err) {

      console.log(err);

      alert("Erreur historique");
    }
  };

  return (

    <div className="p-6">

      {/* TITLE */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-4xl font-bold text-gray-800">
          Gestion Clients
        </h2>

      </div>

      {/* SEARCH */}
      <div className="mb-6">

        <input
          type="text"
          placeholder="Rechercher un client..."
          className="w-full md:w-1/2 border border-gray-300 rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* TABLE CLIENTS */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">

        <table className="w-full">

          <thead className="bg-gray-900 text-white">

            <tr>
              <th className="p-4">Nom</th>
              <th className="p-4">Prénom</th>
              <th className="p-4">CIN</th>
              <th className="p-4">Téléphone</th>
              <th className="p-4">Email</th>
              <th className="p-4">Statut</th>
              <th className="p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {clients.map((c) => (

              <tr
                key={c.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-4 text-center">
                  {c.nom}
                </td>

                <td className="p-4 text-center">
                  {c.prenom}
                </td>

                <td className="p-4 text-center">
                  {c.numeroIdentite}
                </td>

                <td className="p-4 text-center">
                  {c.telephone}
                </td>

                <td className="p-4 text-center">
                  {c.email}
                </td>

                {/* STATUS */}
                <td className="p-4 text-center">

                  {c.actif ? (

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Actif
                    </span>

                  ) : (

                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Inactif
                    </span>

                  )}

                </td>

                {/* ACTIONS */}
                <td className="p-4">

                  <div className="flex justify-center gap-2 flex-wrap">

                    <button
                      onClick={() => setSelectedClient(c)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition shadow"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        showReservations(c.id, c.nom, c.prenom)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow"
                    >
                      History
                    </button>

                    {c.actif ? (

                      <button
                        onClick={() => deleteClient(c.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition shadow"
                      >
                        Désactiver
                      </button>

                    ) : (

                      <button
                        onClick={() => reactivateClient(c.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition shadow"
                      >
                        Réactiver
                      </button>

                    )}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* FORM */}
      <div className="mt-8">

        <ClientForm
          selectedClient={selectedClient}
          onFinish={() => {
            setSelectedClient(null);
            fetchClients();
          }}
        />

      </div>

      {/* 🔥 MODAL HISTORY */}
      {showHistory && (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

          {/* MODAL */}
          <div className="bg-white w-[95%] md:w-[80%] lg:w-[70%] rounded-3xl shadow-2xl relative animate-fadeIn">

            {/* HEADER */}
            <div className="flex justify-between items-center border-b p-6">

              <div>

                <h3 className="text-3xl font-bold text-gray-800">
                  Historique
                </h3>

                <p className="text-gray-500 mt-1">
                  {clientName}
                </p>

              </div>

              {/* CLOSE */}
              <button
                onClick={() => setShowHistory(false)}
                className="text-gray-500 hover:text-red-500 text-3xl transition"
              >
                ✕
              </button>

            </div>

            {/* BODY */}
            <div className="p-6 max-h-[500px] overflow-y-auto">

              {reservations.length === 0 ? (

                <div className="flex flex-col items-center justify-center py-16">

                  <div className="text-7xl mb-4">
                    📭
                  </div>

                  <h4 className="text-2xl font-bold text-gray-700 mb-2">
                    Aucun historique trouvé
                  </h4>

                  <p className="text-gray-500 text-center">
                    Ce client n'a effectué aucune réservation.
                  </p>

                </div>

              ) : (

                <table className="w-full overflow-hidden rounded-xl">

                  <thead className="bg-gray-900 text-white sticky top-0">

                    <tr>
                      <th className="p-4">ID</th>
                      <th className="p-4">Chambre</th>
                      <th className="p-4">Arrivée</th>
                      <th className="p-4">Départ</th>
                      <th className="p-4">Personnes</th>
                      <th className="p-4">Statut</th>
                    </tr>

                  </thead>

                  <tbody>

                    {reservations.map((r) => (

                      <tr
                        key={r.id}
                        className="border-b hover:bg-gray-50 transition text-center"
                      >

                        <td className="p-4">
                          {r.id}
                        </td>

                        <td className="p-4">
                          {r.chambre?.numero}
                        </td>

                        <td className="p-4">
                          {r.dateArrivee?.substring(0, 10)}
                        </td>

                        <td className="p-4">
                          {r.dateDepart?.substring(0, 10)}
                        </td>

                        <td className="p-4">
                          {r.nombrePersonnes}
                        </td>

                        <td className="p-4">

                          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">

                            {{
                              0: "En attente",
                              1: "Confirmée",
                              2: "Annulée",
                              3: "CheckIn",
                              4: "CheckOut"
                            }[r.statut]}

                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}