import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        {
          username,
          password
        }
      );

      const token = res.data.token;

      const mustChangePassword =
        res.data.mustChangePassword;

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        token
      );

      // DECODE ROLE
      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      const role =
        payload[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      const normalizedRole =
        role.toUpperCase();

      localStorage.setItem(
        "role",
        normalizedRole
      );

      // FIRST LOGIN
      if (mustChangePassword) {

        localStorage.setItem(
          "changePasswordUser",
          username
        );

        navigate("/change-password");

        return;
      }

      // REDIRECTION
      if (normalizedRole === "ADMIN") {

        navigate("/dashboard/admin");

      } else {

        navigate("/dashboard/reception");
      }

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data ||
        "Login échoué"
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
          Login Utilisateur
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Admin / Réceptionniste
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-3 border rounded-lg mb-6"
        />

        <button
          type="submit"
          className="
            w-full
            bg-yellow-400
            hover:bg-yellow-500
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