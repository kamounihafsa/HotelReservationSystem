import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ReservationForm({
  onFinish
}) {

  const [clients, setClients] = useState([]);
  const [chambres, setChambres] = useState([]);

  const [form, setForm] = useState({
    clientId: "",
    chambreId: "",
    dateArrivee: "",
    dateDepart: "",
    nombrePersonnes: 1
  });

  // 🔥 LOAD DATA
  useEffect(() => {

    fetchClients();
    fetchChambres();

  }, []);

  // 🔥 CLIENTS
  const fetchClients = async () => {

    try {

      const res = await API.get(
        "/Client/search?term=a"
      );

      setClients(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  // 🔥 CHAMBRES
  const fetchChambres = async () => {

    try {

      const res = await API.get(
        "/Chambre/search?term=1"
      );

      setChambres(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  // 🔥 CHANGE
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 CREATE
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/reservations",
        {
          clientId: parseInt(form.clientId),
          chambreId: parseInt(form.chambreId),
          dateArrivee: form.dateArrivee,
          dateDepart: form.dateDepart,
          nombrePersonnes: parseInt(form.nombrePersonnes)
        }
      );

      alert("Réservation créée");

      setForm({
        clientId: "",
        chambreId: "",
        dateArrivee: "",
        dateDepart: "",
        nombrePersonnes: 1
      });

      onFinish();

    } catch (err) {

      console.log(err.response?.data);

      alert("Erreur création réservation");
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded p-4"
    >

      <h3 className="text-2xl font-bold mb-4">
        Ajouter Réservation
      </h3>

      <div className="grid grid-cols-2 gap-4">

        {/* CLIENT */}
        <select
          name="clientId"
          value={form.clientId}
          onChange={handleChange}
          className="border p-2"
        >

          <option value="">
            Choisir Client
          </option>

          {clients.map((c) => (

            <option
              key={c.id}
              value={c.id}
            >
              {c.nom} {c.prenom}
            </option>
          ))}

        </select>

        {/* CHAMBRE */}
        <select
          name="chambreId"
          value={form.chambreId}
          onChange={handleChange}
          className="border p-2"
        >

          <option value="">
            Choisir Chambre
          </option>

          {chambres.map((c) => (

            <option
              key={c.id}
              value={c.id}
            >
              Chambre {c.numero}
            </option>
          ))}

        </select>

        {/* DATE ARRIVEE */}
        <input
          type="date"
          name="dateArrivee"
          value={form.dateArrivee}
          onChange={handleChange}
          className="border p-2"
        />

        {/* DATE DEPART */}
        <input
          type="date"
          name="dateDepart"
          value={form.dateDepart}
          onChange={handleChange}
          className="border p-2"
        />

        {/* PERSONNES */}
        <input
          type="number"
          name="nombrePersonnes"
          value={form.nombrePersonnes}
          onChange={handleChange}
          className="border p-2"
        />

      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Save
      </button>

    </form>
  );
}