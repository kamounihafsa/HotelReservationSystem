import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {

  const navigate = useNavigate();

  const username =
    localStorage.getItem(
      "changePasswordUser"
    );

  const [newPassword, setNewPassword] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/users/change-password",
        {
          username,
          newPassword
        }
      );

      alert(
        "Mot de passe modifié avec succès"
      );

      // 🔥 nettoyage
      localStorage.removeItem(
        "changePasswordUser"
      );

      localStorage.removeItem("token");

      localStorage.removeItem("role");

      // 🔥 retour login
      navigate("/");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data ||
        "Erreur changement mot de passe"
      );
    }
  };

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-black
        to-gray-900
      "
    >

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          p-10
          rounded-3xl
          shadow-2xl
          w-[420px]
        "
      >

        <h2
          className="
            text-3xl
            font-bold
            text-center
            mb-2
          "
        >
          Nouveau mot de passe
        </h2>

        <p
          className="
            text-gray-500
            text-center
            mb-6
          "
        >
          Première connexion obligatoire
        </p>

        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
          className="
            w-full
            border
            p-3
            rounded-xl
            mb-5
            focus:outline-none
            focus:ring-2
            focus:ring-yellow-400
          "
          required
        />

        <button
          type="submit"
          className="
            w-full
            bg-yellow-400
            hover:bg-yellow-500
            py-3
            rounded-xl
            font-bold
            transition
          "
        >
          Modifier
        </button>

      </form>

    </div>
  );
}