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

      localStorage.setItem(
        "token",
        token
      );

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

      if (mustChangePassword) {

        localStorage.setItem(
          "changePasswordUser",
          username
        );

        navigate("/change-password");

        return;
      }

      if (normalizedRole === "ADMIN") {

        navigate("/dashboard/admin");

      } else {

        navigate("/dashboard/reception");
      }

    } catch (err) {

      alert(
        err.response?.data ||
        "Login échoué"
      );
    }
  };

  return (

    <div
      className="
        min-h-screen
        relative
        flex
        items-center
        justify-center
        overflow-hidden
        px-6
      "
    >

      {/* BACKGROUND */}
      <img
        src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop"
        alt=""
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/75" />

      {/* LOGIN CARD */}
      <form
        onSubmit={handleLogin}
        className="
          relative
          z-10
          w-full
          max-w-[500px]
          bg-white/10
          backdrop-blur-2xl
          border
          border-white/10
          rounded-[35px]
          px-10
          py-12
          shadow-2xl
        "
      >

        {/* RETURN BUTTON */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="
            absolute
            top-5
            right-5
            w-11
            h-11
            rounded-2xl
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            text-white
            text-xl
            flex
            items-center
            justify-center
            hover:bg-red-500
            transition-all
            duration-300
          "
        >
          ←
        </button>

        {/* TITLE */}
        <div className="text-center mb-10">

          <h1
            className="
              text-5xl
              font-black
              text-white
              leading-tight
            "
          >
            DAR{" "}
            <span className="text-yellow-400">
              HAFSA
            </span>
          </h1>

          <p
            className="
              text-gray-300
              mt-3
              text-lg
            "
          >
            Administration Luxury Hotel
          </p>

        </div>

        {/* INPUTS */}
        <div className="space-y-5">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="
              w-full
              bg-white/10
              border
              border-white/10
              text-white
              placeholder-gray-400
              p-5
              rounded-2xl
              outline-none
              focus:border-yellow-400
              transition
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              bg-white/10
              border
              border-white/10
              text-white
              placeholder-gray-400
              p-5
              rounded-2xl
              outline-none
              focus:border-yellow-400
              transition
            "
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="
              w-full
              bg-yellow-400
              text-black
              py-5
              rounded-2xl
              font-black
              text-lg
              hover:scale-[1.02]
              transition-all
              duration-300
              shadow-2xl
              shadow-yellow-500/20
            "
          >
            Se connecter
          </button>

        </div>

      </form>

    </div>
  );
}