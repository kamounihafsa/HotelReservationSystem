import { useEffect, useState } from "react";
import API from "../../services/api";
import Select from "react-select";

export default function ReservationForm({ onFinish }) {

  const [clients, setClients] = useState([]);
  const [chambres, setChambres] = useState([]);

  const [form, setForm] = useState({
    clientId: "",
    chambreId: "",
    dateArrivee: "",
    dateDepart: "",
    nombrePersonnes: 1,
    remise: 0
  });

  // 🔥 LOAD
  useEffect(() => {
    fetchClients();
    fetchChambres();
  }, []);

  // 🔥 CLIENTS
  const fetchClients = async () => {

    try {

      const res = await API.get("/Client");

      setClients(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  // 🔥 CHAMBRES
  const fetchChambres = async () => {

    try {

      const res = await API.get("/Chambre/all");

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

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/reservations", {
        clientId: parseInt(form.clientId),
        chambreId: parseInt(form.chambreId),
        dateArrivee: form.dateArrivee,
        dateDepart: form.dateDepart,
        nombrePersonnes: parseInt(form.nombrePersonnes),
        remise: parseFloat(form.remise)
      });

      alert("Réservation créée");

      setForm({
        clientId: "",
        chambreId: "",
        dateArrivee: "",
        dateDepart: "",
        nombrePersonnes: 1,
        remise: 0
      });

      onFinish();

    } catch (err) {

      console.log(err.response?.data);

      alert(
        err.response?.data ||
        "Erreur création réservation"
      );
    }
  };

  return (

    <form onSubmit={handleSubmit}>

      <h2 className="text-4xl gold-text mb-8">
        Ajouter Réservation
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        {/* CLIENT */}
        <div>

          <label className="block mb-3 text-gray-300 font-semibold">
            Client
          </label>

<Select

  placeholder="Choisir Client..."
  
  isSearchable={true}

  options={clients.map((c) => ({
    value: c.id,
    label: `${c.nom} ${c.prenom}`
  }))}

  onChange={(selected) =>
    setForm({
      ...form,
      clientId: selected.value
    })
  }

  styles={{

    control: (base, state) => ({
      ...base,
      backgroundColor: "#111111",
      borderColor: state.isFocused
        ? "#facc15"
        : "rgba(250,204,21,0.15)",
      boxShadow: "none",
      borderRadius: "18px",
      minHeight: "58px",
      color: "white",
      paddingLeft: "8px"
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: "#111111",
      border: "1px solid rgba(250,204,21,0.15)",
      borderRadius: "18px",
      overflow: "hidden",
      zIndex: 9999
    }),

    menuList: (base) => ({
      ...base,
      padding: "6px"
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "rgba(250,204,21,0.12)"
        : "#111111",
      color: state.isFocused
        ? "#facc15"
        : "white",
      padding: "14px",
      borderRadius: "12px",
      cursor: "pointer"
    }),

    singleValue: (base) => ({
      ...base,
      color: "white"
    }),

    placeholder: (base) => ({
      ...base,
      color: "#6b7280"
    }),

    input: (base) => ({
      ...base,
      color: "white"
    }),

    dropdownIndicator: (base) => ({
      ...base,
      color: "#facc15"
    }),

    indicatorSeparator: () => ({
      display: "none"
    })

  }}
/>

        </div>

        {/* CHAMBRE */}
        <div>

          <label className="block mb-3 text-gray-300 font-semibold">
            Chambre
          </label>

          <select
          
            name="chambreId"
            value={form.chambreId}
            onChange={handleChange}
            className="
              luxury-input
              w-full
            "
          >

            <option value="">
              Choisir Chambre
            </option>

            {chambres.map((c) => (

              <option
                key={c.id}
                value={c.id}
              >
                Chambre {c.numero} -{" "}
                {
                  {
                    0: "Simple",
                    1: "Double",
                    2: "Suite"
                  }[c.type]
                }

              </option>

            ))}

          </select>

        </div>

        {/* ARRIVEE */}
        <div>

          <label className="block mb-3 text-gray-300 font-semibold">
            Date Arrivée
          </label>

          <input
            type="date"
            name="dateArrivee"
            value={form.dateArrivee}
            onChange={handleChange}
            className="luxury-input w-full"
          />

        </div>

        {/* DEPART */}
        <div>

          <label className="block mb-3 text-gray-300 font-semibold">
            Date Départ
          </label>

          <input
            type="date"
            name="dateDepart"
            value={form.dateDepart}
            onChange={handleChange}
            className="luxury-input w-full"
          />

        </div>

        {/* PERSONNES */}
        <div>

          <label className="block mb-3 text-gray-300 font-semibold">
            Nombre Personnes
          </label>

          <input
            type="number"
            name="nombrePersonnes"
            value={form.nombrePersonnes}
            onChange={handleChange}
            className="luxury-input w-full"
          />

        </div>

        {/* REMISE */}
        <div>

          <label className="block mb-3 text-gray-300 font-semibold">
            Remise %
          </label>

          <input
            type="number"
            name="remise"
            value={form.remise}
            onChange={handleChange}
            className="luxury-input w-full"
          />

        </div>

      </div>

      <button
        type="submit"
        className="
          mt-8
          w-full
          bg-yellow-400
          hover:bg-yellow-300
          text-black
          py-4
          rounded-2xl
          font-bold
          transition
        "
      >
        Sauvegarder Réservation
      </button>

    </form>
  );
}