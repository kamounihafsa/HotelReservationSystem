import { useEffect, useState, useCallback } from "react";
import API from "../../services/api";
import ChambreForm from "./ChambreForm";

export default function Chambres() {

  const [chambres, setChambres] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedChambre, setSelectedChambre] = useState(null);

  // 🔥 Charger chambres
  const fetchChambres = useCallback(async () => {

    try {

      let res;

      // 🔥 afficher toutes les chambres au début
      if (search.trim() === "") {

        res = await API.get(
          `/Chambre/search?term=1`
        );

      } else {

        res = await API.get(
          `/Chambre/search?term=${search}`
        );
      }

      setChambres(res.data);

    } catch (err) {

      console.log(
        err.response?.data || err.message
      );
    }

  }, [search]);

  // 🔥 LOAD
  useEffect(() => {
    fetchChambres();
  }, [fetchChambres]);

  // 🔴 Désactiver
  const deleteChambre = async (id) => {

    if (!window.confirm("Désactiver cette chambre ?")) {
      return;
    }

    try {

      await API.delete(`/Chambre/${id}`);

      fetchChambres();

    } catch (err) {

      console.log(
        err.response?.data || err.message
      );

      alert("Erreur désactivation");
    }
  };

  // 🟢 Réactiver
  const reactivateChambre = async (id) => {

    try {

      await API.post(
        `/Chambre/${id}/reactivate`
      );

      fetchChambres();

    } catch (err) {

      console.log(
        err.response?.data || err.message
      );

      alert("Erreur réactivation");
    }
  };

  return (

    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold">
          Gestion Chambres
        </h2>

      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Rechercher chambre..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          border
          p-3
          rounded-xl
          w-1/2
          mb-6
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-black
        "
      />

      {/* TABLE */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-black text-white">

            <tr>
              <th className="p-4">Numéro</th>
              <th className="p-4">Type</th>
              <th className="p-4">Etage</th>
              <th className="p-4">Capacité</th>
              <th className="p-4">Description</th>
              <th className="p-4">Equipements</th>
              <th className="p-4">Statut</th>
              <th className="p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {chambres.length > 0 ? (

              chambres.map((c) => (

                <tr
                  key={c.id}
                  className="
                    border-b
                    text-center
                    hover:bg-gray-50
                    transition
                  "
                >

                  {/* NUMERO */}
                  <td className="p-4 font-semibold">
                    {c.numero}
                  </td>

                  {/* TYPE */}
                  <td className="p-4">

                    {
                      {
                        0: "Simple",
                        1: "Double",
                        2: "Suite"
                      }[c.type]
                    }

                  </td>

                  {/* ETAGE */}
                  <td className="p-4">
                    {c.etage}
                  </td>

                  {/* CAPACITE */}
                  <td className="p-4">
                    {c.capacite}
                  </td>

                  {/* DESCRIPTION */}
                  <td className="p-4">
                    {c.description}
                  </td>

                  {/* EQUIPEMENTS */}
                  <td className="p-4">

                    {c.equipements &&
                    c.equipements.length > 0

                      ? c.equipements
                          .map((e) =>
  typeof e === "string"
    ? e
    : e.nom
)
                          .join(", ")

                      : "Aucun"}

                  </td>

                 {/* STATUS */}
<td className="p-4">

  {c.active ? (

    <span
      className="
        bg-green-100
        text-green-700
        px-3
        py-1
        rounded-full
        text-sm
        font-semibold
      "
    >
      Réactivée
    </span>

  ) : (

    <span
      className="
        bg-red-100
        text-red-700
        px-3
        py-1
        rounded-full
        text-sm
        font-semibold
      "
    >
      Désactivée
    </span>

  )}

</td>

                  {/* ACTIONS */}
                  <td className="p-4 flex justify-center gap-2 flex-wrap">

                    {/* EDIT */}
                    <button
                      onClick={() =>
                        setSelectedChambre(c)
                      }
                      className="
                        bg-yellow-400
                        hover:bg-yellow-500
                        px-4
                        py-2
                        rounded-lg
                        font-medium
                        transition
                      "
                    >
                      Modifier
                    </button>

                    {/* ACTIVE / INACTIVE */}
                    {c.active ? (

                      <button
                        onClick={() =>
                          deleteChambre(c.id)
                        }
                        className="
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          px-4
                          py-2
                          rounded-lg
                          transition
                        "
                      >
                        Désactiver
                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          reactivateChambre(c.id)
                        }
                        className="
                          bg-green-600
                          hover:bg-green-700
                          text-white
                          px-4
                          py-2
                          rounded-lg
                          transition
                        "
                      >
                        Réactiver
                      </button>

                    )}

                  </td>

                </tr>
              ))

            ) : (

              <tr>

                <td
                  colSpan="8"
                  className="
                    p-8
                    text-center
                    text-gray-500
                    text-lg
                  "
                >
                  Aucune chambre trouvée
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* FORM */}
      <div className="mt-8">

        <ChambreForm
          selectedChambre={selectedChambre}
          onFinish={() => {

            setSelectedChambre(null);

            fetchChambres();
          }}
        />

      </div>

    </div>
  );
}