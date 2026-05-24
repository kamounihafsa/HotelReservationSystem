import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ChambreForm({
  selectedChambre,
  onFinish
}) {

  const [form, setForm] = useState({
    numero: "",
    type: "Simple",
    etage: 1,
    capacite: 1,
    description: "",
    equipements: []
  });

  const typeMap = {
    Simple: 0,
    Double: 1,
    Suite: 2
  };

  const availableEquipements = [
    "WiFi",
    "TV",
    "Climatisation",
    "Balcon",
    "Vue Mer",
    "Mini Bar"
  ];

  useEffect(() => {

    if (selectedChambre) {

      setForm({

        id: selectedChambre.id,

        numero: selectedChambre.numero,

        type:
          selectedChambre.type === 0
            ? "Simple"
            : selectedChambre.type === 1
            ? "Double"
            : "Suite",

        etage: selectedChambre.etage,

        capacite: selectedChambre.capacite,

        description:
          selectedChambre.description || "",

        equipements:
          selectedChambre.equipements
            ? selectedChambre.equipements.map((e) =>
                typeof e === "string"
                  ? e
                  : e.nom
              )
            : []
      });
    }

  }, [selectedChambre]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleEquipementChange = (equipement) => {

    let updated = [...form.equipements];

    if (updated.includes(equipement)) {

      updated = updated.filter(
        (e) => e !== equipement
      );

    } else {

      updated.push(equipement);
    }

    setForm({
      ...form,
      equipements: updated
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const chambreToSend = {

        numero: form.numero,

        type: typeMap[form.type],

        etage: parseInt(form.etage),

        capacite: parseInt(form.capacite),

        description: form.description,

        active: true
      };

      let chambreId;

      if (form.id) {

        await API.put(
          `/Chambre/${form.id}`,
          chambreToSend
        );

        chambreId = form.id;

      } else {

        const res = await API.post(
          `/Chambre`,
          chambreToSend
        );

        chambreId = res.data.id;
      }

      if (form.equipements.length > 0) {

        for (const equipement of form.equipements) {

          await API.post(
            `/Chambre/${chambreId}/equipements?nom=${equipement}`
          );
        }
      }

      setForm({
        numero: "",
        type: "Simple",
        etage: 1,
        capacite: 1,
        description: "",
        equipements: []
      });

      onFinish();

    } catch (err) {

      console.log(
        err.response?.data || err.message
      );

      alert("Erreur sauvegarde");
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="
        bg-[#111111]
        border
        border-yellow-500/10
        rounded-[35px]
        p-10
        shadow-2xl
      "
    >

      <div className="mb-8">

        <p
          className="
            uppercase
            tracking-[5px]
            text-yellow-400
            text-sm
            mb-3
          "
        >
          Luxury Form
        </p>

        <h2 className="text-4xl font-black text-white">

          {form.id
            ? "Modifier Chambre"
            : "Ajouter Chambre"}

        </h2>

      </div>

      <div className="grid md:grid-cols-2 gap-5">

        <input
          type="text"
          name="numero"
          placeholder="Numéro Chambre"
          value={form.numero}
          onChange={handleChange}
          className="
            bg-black
            border
            border-gray-800
            text-white
            p-5
            rounded-2xl
            focus:outline-none
            focus:ring-2
            focus:ring-yellow-400
          "
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="
            bg-black
            border
            border-gray-800
            text-white
            p-5
            rounded-2xl
            focus:outline-none
            focus:ring-2
            focus:ring-yellow-400
          "
        >

          <option value="Simple">
            Simple
          </option>

          <option value="Double">
            Double
          </option>

          <option value="Suite">
            Suite
          </option>

        </select>

        <input
          type="number"
          name="etage"
          value={form.etage}
          onChange={handleChange}
          className="
            bg-black
            border
            border-gray-800
            text-white
            p-5
            rounded-2xl
            focus:outline-none
            focus:ring-2
            focus:ring-yellow-400
          "
        />

        <input
          type="number"
          name="capacite"
          value={form.capacite}
          onChange={handleChange}
          className="
            bg-black
            border
            border-gray-800
            text-white
            p-5
            rounded-2xl
            focus:outline-none
            focus:ring-2
            focus:ring-yellow-400
          "
        />

      </div>

      <textarea
        name="description"
        placeholder="Description Chambre..."
        value={form.description}
        onChange={handleChange}
        className="
          w-full
          mt-5
          bg-black
          border
          border-gray-800
          text-white
          p-5
          rounded-2xl
          h-36
          resize-none
          focus:outline-none
          focus:ring-2
          focus:ring-yellow-400
        "
      />

      {/* EQUIPEMENTS */}
      <div className="mt-8">

        <h3 className="text-white text-xl font-bold mb-5">
          Équipements
        </h3>

        <div className="grid md:grid-cols-3 gap-4">

          {availableEquipements.map((equipement) => (

            <label
              key={equipement}
              className={`
                flex
                items-center
                gap-3
                p-4
                rounded-2xl
                cursor-pointer
                border
                transition
                ${
                  form.equipements.includes(equipement)
                    ? "bg-yellow-400 border-yellow-400 text-black"
                    : "bg-black border-gray-800 text-white"
                }
              `}
            >

              <input
                type="checkbox"
                checked={form.equipements.includes(
                  equipement
                )}
                onChange={() =>
                  handleEquipementChange(
                    equipement
                  )
                }
              />

              {equipement}

            </label>

          ))}

        </div>

      </div>

      <button
        type="submit"
        className="
          w-full
          mt-10
          bg-yellow-400
          hover:bg-yellow-500
          text-black
          py-5
          rounded-2xl
          font-black
          text-lg
          transition
          shadow-xl
        "
      >
        Save Chambre
      </button>

    </form>
  );
}