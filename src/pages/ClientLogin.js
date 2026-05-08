import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ClientLogin() {

  const [nom, setNom] =
    useState("");

  const [cin, setCin] =
    useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/Client/login",
        {
          nom,
          cin
        }
      );

      console.log(res.data);

      // SAVE CLIENT
      localStorage.setItem(
        "client",
        JSON.stringify(res.data)
      );

      localStorage.setItem(
        "role",
        "CLIENT"
      );

      navigate("/client");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data ||
        "Client introuvable"
      );
    }
  };

  return (

    <div className="h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-96"
      >

        <h2 className="text-3xl font-bold text-center mb-2">
          Login Client
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Nom + CIN
        </p>

        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) =>
            setNom(e.target.value)
          }
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="CIN"
          value={cin}
          onChange={(e) =>
            setCin(e.target.value)
          }
          className="w-full p-3 border rounded-lg mb-6"
        />

        <button
          type="submit"
          className="
            w-full
            bg-black
            text-white
            hover:bg-gray-800
            py-3
            rounded-lg
            font-semibold
          "
        >
          Se connecter
        </button>

      </form>

    </div>
  );
}