import { useEffect, useState, useCallback } from "react";
import API from "../../services/api";
import ClientForm from "./ClientForm";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function Clients() {

  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);

  const [showForm, setShowForm] = useState(false);

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

        res = await API.get(
          `/Client/search?term=${search}`
        );
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

    if (!window.confirm("Désactiver ce client ?")) {
      return;
    }

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

      await API.post(
        `/Client/${id}/reactivate`
      );

      fetchClients();

    } catch {

      alert("Erreur réactivation");
    }
  };

  // 🔥 SHOW HISTORY
  const showReservations = async (
    id,
    nom,
    prenom
  ) => {

    try {

      const res = await API.get(
        `/Client/${id}/reservations`
      );

      setReservations(res.data);

      setClientName(`${nom} ${prenom}`);

      setShowHistory(true);

    } catch (err) {

      console.log(err);

      alert("Erreur historique");
    }
  };

  return (

    <DashboardLayout>

      <div className="min-h-screen bg-[#0b0b0b] text-white p-6">

        {/* HEADER */}
        <div
          className="
            flex
            justify-between
            items-center
            mb-10
            flex-wrap
            gap-5
          "
        >

          <div>

            <h1 className="text-5xl gold-text">
              Clients
            </h1>

            <p className="text-gray-400 mt-2">
              Gestion des clients premium
            </p>

          </div>

{/* RIGHT ACTIONS */}
<div className="flex items-center gap-5">

  {/* TOTAL CLIENTS */}
  <div
    className="
      bg-[#111]
      border
      border-yellow-500/20
      rounded-3xl
      px-8
      py-4
      text-center
      min-w-[140px]
      shadow-xl
    "
  >

    <h2 className="text-4xl font-bold text-yellow-400">
      {clients.length}
    </h2>

    <p className="text-gray-400 mt-1">
      Clients
    </p>

  </div>

          {/* ADD BUTTON */}
          <button
            onClick={() => {

              setSelectedClient(null);

              setShowForm(true);
            }}
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

        {/* SEARCH */}
        <div className="mb-8">

          <input
            type="text"
            placeholder="Rechercher un client..."
            className="
              w-full
              max-w-xl
              bg-[#111]
              border
              border-yellow-500/10
              rounded-2xl
              px-5
              py-4
              text-white
              outline-none
              focus:ring-2
              focus:ring-yellow-400
            "
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* TABLE */}
        <div
          className="
            bg-[#111]
            border
            border-yellow-500/10
            rounded-3xl
            overflow-hidden
            shadow-2xl
          "
        >

          <table
            className="
              w-full
              table-fixed
              text-xs
              xl:text-sm
            "
          >

            <thead
              className="
                bg-black
                text-yellow-400
              "
            >

              <tr>

                <th className="p-4 whitespace-nowrap">
                  Nom
                </th>

                <th className="p-4 whitespace-nowrap">
                  Prénom
                </th>

                <th className="p-4 whitespace-nowrap">
                  CIN
                </th>

                <th className="p-4 whitespace-nowrap">
                  Téléphone
                </th>

                <th className="p-4 whitespace-nowrap">
                  Email
                </th>

                <th className="p-4 whitespace-nowrap">
                  Statut
                </th>

                <th className="p-4 whitespace-nowrap">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {clients.map((c) => (

                <tr
                  key={c.id}
                  className="
                    border-b
                    border-gray-800
                    hover:bg-[#1a1a1a]
                    transition
                  "
                >

                  <td
                    className="
                      p-4
                      text-center
                      whitespace-nowrap
                    "
                  >
                    {c.nom}
                  </td>

                  <td
                    className="
                      p-4
                      text-center
                      whitespace-nowrap
                    "
                  >
                    {c.prenom}
                  </td>

                  <td
                    className="
                      p-4
                      text-center
                      whitespace-nowrap
                    "
                  >
                    {c.numeroIdentite}
                  </td>

                  <td
                    className="
                      p-4
                      text-center
                      whitespace-nowrap
                    "
                  >
                    {c.telephone}
                  </td>

                  <td
                    className="
                      p-4
                      text-center
                      whitespace-nowrap
                    "
                  >
                    {c.email}
                  </td>

                  <td
                    className="
                      p-4
                      text-center
                      whitespace-nowrap
                    "
                  >

                    {c.actif ? (

                      <span className="text-green-400 font-semibold">
                        Actif
                      </span>

                    ) : (

                      <span className="text-red-400 font-semibold">
                        Inactif
                      </span>

                    )}

                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">

                    <div
                      className="
                        flex
                        justify-center
                        items-center
                        gap-2
                      "
                    >

                      {/* MODIFIER */}
                      <button
                        onClick={() => {

                          setSelectedClient(c);

                          setShowForm(true);
                        }}
                        className="
                          w-10
                          h-10
                          rounded-xl
                          bg-yellow-400
                          hover:bg-yellow-300
                          flex
                          items-center
                          justify-center
                          text-lg
                          transition
                          shadow-lg
                        "
                        title="Modifier"
                      >
                        ✏️
                      </button>

                      {/* HISTORIQUE */}
                      <button
                        onClick={() =>
                          showReservations(
                            c.id,
                            c.nom,
                            c.prenom
                          )
                        }
                        className="
                          w-10
                          h-10
                          rounded-xl
                          bg-gray-800
                          hover:bg-gray-700
                          flex
                          items-center
                          justify-center
                          text-lg
                          transition
                        "
                        title="Historique"
                      >
                        📜
                      </button>

                      {/* DESACTIVER */}
                      {c.actif ? (

                        <button
                          onClick={() =>
                            deleteClient(c.id)
                          }
                          className="
                            w-10
                            h-10
                            rounded-xl
                            bg-red-600
                            hover:bg-red-700
                            flex
                            items-center
                            justify-center
                            text-lg
                            transition
                          "
                          title="Désactiver"
                        >
                          🚫
                        </button>

                      ) : (

                        <button
                          onClick={() =>
                            reactivateClient(c.id)
                          }
                          className="
                            w-10
                            h-10
                            rounded-xl
                            bg-green-600
                            hover:bg-green-700
                            flex
                            items-center
                            justify-center
                            text-lg
                            transition
                          "
                          title="Réactiver"
                        >
                          ✅
                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* FORM MODAL */}
        {showForm && (

          <div
            className="
              fixed
              inset-0
              bg-black/70
              backdrop-blur-sm
              flex
              justify-center
              items-center
              z-50
              p-6
            "
          >

            <div
              className="
                w-full
                max-w-4xl
              "
            >

              {/* CLOSE */}
              <div className="flex justify-end mb-4">

                <button
                  onClick={() => {

                    setShowForm(false);

                    setSelectedClient(null);
                  }}
                  className="
                    bg-white
                    hover:bg-gray-100
                    text-black
                    px-5
                    py-3
                    rounded-2xl
                    font-bold
                  "
                >
                  ✕
                </button>

              </div>

              <ClientForm
                selectedClient={selectedClient}
                onFinish={() => {

                  setShowForm(false);

                  setSelectedClient(null);

                  fetchClients();
                }}
              />

            </div>

          </div>

        )}

        {/* HISTORY MODAL */}
        {showHistory && (

          <div
            className="
              fixed
              inset-0
              bg-black/70
              flex
              items-center
              justify-center
              z-50
            "
          >

            <div
              className="
                bg-[#111]
                border
                border-yellow-500/20
                w-[95%]
                lg:w-[70%]
                rounded-3xl
                shadow-2xl
              "
            >

              {/* HEADER */}
              <div
                className="
                  flex
                  justify-between
                  items-center
                  border-b
                  border-gray-800
                  p-6
                "
              >

                <div>

                  <h3 className="text-3xl gold-text">
                    Historique
                  </h3>

                  <p className="text-gray-400 mt-1">
                    {clientName}
                  </p>

                </div>

                <button
                  onClick={() =>
                    setShowHistory(false)
                  }
                  className="
                    text-3xl
                    text-gray-400
                    hover:text-red-500
                  "
                >
                  ✕
                </button>

              </div>

              {/* BODY */}
              <div
                className="
                  p-6
                  max-h-[500px]
                  overflow-y-auto
                "
              >

                {reservations.length === 0 ? (

                  <div className="text-center py-16">

                    <div className="text-6xl mb-4">
                      📭
                    </div>

                    <h4 className="text-2xl font-bold mb-2">
                      Aucun historique
                    </h4>

                  </div>

                ) : (

                  <table className="w-full text-sm">

                    <thead>

                      <tr className="text-yellow-400">

                        <th className="p-3">
                          Chambre
                        </th>

                        <th className="p-3">
                          Arrivée
                        </th>

                        <th className="p-3">
                          Départ
                        </th>

                        <th className="p-3">
                          Statut
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {reservations.map((r) => (

                        <tr
                          key={r.id}
                          className="
                            border-b
                            border-gray-800
                          "
                        >

                          <td className="p-4 text-center">
                            {r.chambre?.numero}
                          </td>

                          <td className="p-4 text-center">
                            {r.dateArrivee?.substring(0, 10)}
                          </td>

                          <td className="p-4 text-center">
                            {r.dateDepart?.substring(0, 10)}
                          </td>

                          <td className="p-4 text-center">

                            {{
                              0: "En attente",
                              1: "Confirmée",
                              2: "Annulée",
                              3: "CheckIn",
                              4: "CheckOut"
                            }[r.statut]}

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

    </DashboardLayout>
  );
}