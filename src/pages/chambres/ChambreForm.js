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

  // 🔥 ENUM
  const typeMap = {
    Simple: 0,
    Double: 1,
    Suite: 2
  };

  // 🔥 LISTE
  const availableEquipements = [
    "WiFi",
    "TV",
    "Climatisation",
    "Balcon",
    "Vue Mer",
    "Mini Bar"
  ];

  // 🔥 EDIT
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

        // 🔥 IMPORTANT
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

  // 🔥 CHANGE
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 CHECKBOX
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

  // 🔥 SAVE
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

      // 🔥 UPDATE
      if (form.id) {

        await API.put(
          `/Chambre/${form.id}`,
          chambreToSend
        );

        chambreId = form.id;

      } else {

        // 🔥 CREATE
        const res = await API.post(
          `/Chambre`,
          chambreToSend
        );

        chambreId = res.data.id;
      }

      // 🔥 AJOUT EQUIPEMENTS
      if (form.equipements.length > 0) {

        for (const equipement of form.equipements) {

          await API.post(
            `/Chambre/${chambreId}/equipements?nom=${equipement}`
          );
        }
      }

      // 🔥 RESET
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
        bg-white
        shadow-xl
        rounded-2xl
        p-6
        mt-8
      "
    >

      <h3 className="text-2xl font-bold mb-6">

        {form.id
          ? "Modifier Chambre"
          : "Ajouter Chambre"}

      </h3>

      <div className="grid grid-cols-2 gap-4">

        <input
          type="text"
          name="numero"
          placeholder="Numéro"
          value={form.numero}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-3 rounded-lg"
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
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          name="capacite"
          value={form.capacite}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

      </div>

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="
          border
          p-3
          rounded-lg
          w-full
          mt-4
        "
      />

      {/* 🔥 EQUIPEMENTS */}
      <div className="mt-6">

        <h4 className="font-bold mb-3">
          Equipements
        </h4>

        <div className="grid grid-cols-2 gap-3">

          {availableEquipements.map((equipement) => (

            <label
              key={equipement}
              className="
                flex
                items-center
                gap-2
                bg-gray-50
                p-2
                rounded-lg
              "
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
          bg-green-600
          hover:bg-green-700
          text-white
          px-6
          py-3
          rounded-xl
          mt-6
          transition
        "
      >
        Save
      </button>

    </form>
  );
}