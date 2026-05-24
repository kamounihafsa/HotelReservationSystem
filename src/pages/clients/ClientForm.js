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

<form
  onSubmit={handleSubmit}
  className="luxury-card p-8"
>

  <h2 className="text-3xl gold-text mb-8">

    {form.id
      ? "Modifier Client"
      : "Ajouter Client"}

  </h2>

  <div className="grid grid-cols-2 gap-5">

    <input
      name="nom"
      placeholder="Nom"
      value={form.nom}
      onChange={handleChange}
      className="luxury-input"
    />

    <input
      name="prenom"
      placeholder="Prénom"
      value={form.prenom}
      onChange={handleChange}
      className="luxury-input"
    />

    <input
      name="telephone"
      placeholder="Téléphone"
      value={form.telephone}
      onChange={handleChange}
      className="luxury-input"
    />

    <input
      name="email"
      placeholder="Email"
      value={form.email}
      onChange={handleChange}
      className="luxury-input"
    />

    <input
      name="adresse"
      placeholder="Adresse"
      value={form.adresse}
      onChange={handleChange}
      className="luxury-input"
    />

    <input
      name="cin"
      placeholder="CIN"
      value={form.cin}
      onChange={handleChange}
      className="luxury-input"
    />

  </div>

  <button className="gold-btn mt-8">
    Sauvegarder
  </button>

</form>
)
}