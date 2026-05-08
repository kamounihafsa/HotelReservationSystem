import { useEffect, useState, useCallback } from "react";
import API from "../../services/api";

export default function ClientDashboard() {

  const [reservations, setReservations] =
    useState([]);

  const client = JSON.parse(
    localStorage.getItem("client")
  );

  // 🔥 FETCH RESERVATIONS
  const fetchReservations = useCallback(async () => {

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
 }, [client.nom, client.numeroIdentite]);

  // 🔥 LOAD
  useEffect(() => {

    fetchReservations();

}, [fetchReservations]);

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">

        <h1 className="text-3xl font-bold mb-2">
          Bienvenue {client.nom}
        </h1>

        <p className="text-gray-500">
          Historique des réservations
        </p>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

<thead className="bg-black text-white">

  <tr>

    <th className="p-4">
      Chambre
    </th>

    <th className="p-4">
      Date arrivée
    </th>

    <th className="p-4">
      Date départ
    </th>

    <th className="p-4">
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
          text-center
          hover:bg-gray-50
        "
      >

        {/* CHAMBRE */}
        <td className="p-4">
          {r.chambreNumero}
        </td>

        {/* ARRIVEE */}
        <td className="p-4">
          {
            r.dateArrivee.split("T")[0]
          }
        </td>

        {/* DEPART */}
        <td className="p-4">
          {
            r.dateDepart.split("T")[0]
          }
        </td>

{/* FACTURE */}
<td className="p-4">

  <button
    onClick={() =>
      alert(
        `
FACTURE

Réservation : ${r.id}

Chambre : ${r.chambreNumero}

Date arrivée :
${r.dateArrivee.split("T")[0]}

Date départ :
${r.dateDepart.split("T")[0]}

Montant total :
${r.montantTotal} DH
        `
      )
    }
    className="
      bg-green-500
      hover:bg-green-600
      text-white
      px-4
      py-2
      rounded-lg
    "
  >
    Voir facture
  </button>

</td>

        

      </tr>
    ))

  ) : (

    <tr>

      <td
        colSpan="4"
        className="
          p-6
          text-center
          text-gray-500
        "
      >
        Aucune réservation
      </td>

    </tr>
  )}

</tbody>

        </table>

      </div>

    </div>
  );
}