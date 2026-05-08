import { useState, useEffect } from "react";
import API from "../../services/api";

export default function ClientForm({ selectedClient, onFinish }) {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    adresse: "",
    cin: ""
  });

  // 🔹 fill form when editing
  useEffect(() => {
    if (selectedClient) {
      setForm(selectedClient);
    }
  }, [selectedClient]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 SAVE (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form.id) {
        // UPDATE
        await API.put(`/Client/${form.id}`, form);
      } else {
        // CREATE
        await API.post(`/Client`, form);
      }

      setForm({
        nom: "",
        prenom: "",
        telephone: "",
        email: "",
        adresse: "",
        numeroIdentite: ""
      });

      onFinish();

    } catch (err) {
      alert("Erreur sauvegarde client");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">

      <h3 className="font-bold mb-3">
        {form.id ? "Modifier Client" : "Ajouter Client"}
      </h3>

      <div className="grid grid-cols-2 gap-2">

        <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} className="border p-2" />
        <input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} className="border p-2" />

        <input name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} className="border p-2" />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2" />

        <input name="adresse" placeholder="Adresse" value={form.adresse} onChange={handleChange} className="border p-2" />
<input name="cin" placeholder="CIN" value={form.cin} onChange={handleChange} className="border p-2" />
      </div>

      <button className="bg-green-500 text-white px-4 py-2 mt-3">
        Save
      </button>

    </form>
  );
}