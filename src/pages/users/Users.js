import { useEffect, useState, useCallback } from "react";
import API from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function Users() {

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "Receptionniste"
  });

  const [selectedUser, setSelectedUser] =
    useState(null);

  // 🔥 LOAD USERS
  const fetchUsers = useCallback(async () => {

    try {

      const res = await API.get("/users");

      let filtered = res.data;

      // 🔍 SEARCH
      if (search.trim() !== "") {

        filtered = filtered.filter((u) =>
          u.username
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      }

      setUsers(filtered);

    } catch (err) {

      console.log(err);
    }

  }, [search]);

  useEffect(() => {

    fetchUsers();

  }, [fetchUsers]);

  // 🔥 INPUT CHANGE
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 SAVE USER
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (selectedUser) {

        await API.put(
          `/users/${selectedUser.id}`,
          form
        );

      } else {

        await API.post("/users", form);
      }

      // RESET
      setForm({
        username: "",
        password: "",
        role: "Receptionniste"
      });

      setSelectedUser(null);

      setShowForm(false);

      fetchUsers();

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data ||
        "Erreur création utilisateur"
      );
    }
  };

  // 🔥 EDIT
  const editUser = (user) => {

    setSelectedUser(user);

    setForm({
      username: user.username,
      password: "",
      role: user.role
    });

    setShowForm(true);
  };

  // 🔥 DISABLE
  const disableUser = async (id) => {

    if (
      !window.confirm(
        "Désactiver cet utilisateur ?"
      )
    ) return;

    try {

      await API.delete(`/users/${id}`);

      fetchUsers();

    } catch {

      alert("Erreur");
    }
  };

  // 🔥 REACTIVATE
  const reactivateUser = async (id) => {

    try {

      await API.post(
        `/users/${id}/reactivate`
      );

      fetchUsers();

    } catch {

      alert("Erreur");
    }
  };

  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* HEADER */}
        <div
          className="
            bg-gradient-to-r
            from-black
            via-gray-950
            to-black
            rounded-[30px]
            border
            border-yellow-500/20
            p-8
            shadow-2xl
          "
        >

          <div
            className="
              flex
              justify-between
              items-center
              flex-wrap
              gap-5
            "
          >

            <div>

              <p
                className="
                  uppercase
                  tracking-[6px]
                  text-yellow-400
                  text-sm
                  mb-3
                "
              >
                Luxury Hotel
              </p>

              <h1 className="text-5xl font-black text-white">
                Utilisateurs
              </h1>

              <p className="text-gray-400 mt-3 text-lg">
                Gestion des comptes utilisateurs
              </p>

            </div>

            <div className="flex gap-5 flex-wrap">

              {/* USERS COUNT */}
              <div
                className="
                  bg-[#111]
                  border
                  border-yellow-500/20
                  text-white
                  px-8
                  py-5
                  rounded-3xl
                  shadow-xl
                  text-center
                  min-w-[170px]
                "
              >

                <p className="text-4xl font-black text-yellow-400">
                  {users.length}
                </p>

                <p className="font-semibold text-gray-300">
                  Utilisateurs
                </p>

              </div>

              {/* ADD BUTTON */}
              <button
                onClick={() => {

                  setSelectedUser(null);

                  setForm({
                    username: "",
                    password: "",
                    role: "Receptionniste"
                  });

                  setShowForm(true);
                }}
                className="
                  bg-yellow-400
                  hover:bg-yellow-300
                  text-black
                  px-8
                  py-5
                  rounded-3xl
                  font-bold
                  shadow-xl
                  transition
                "
              >
                + Ajouter
              </button>

            </div>

          </div>

        </div>

        {/* SEARCH */}
        <div
          className="
            bg-[#111111]
            border
            border-yellow-500/10
            rounded-[30px]
            p-6
            shadow-xl
          "
        >

          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              bg-black
              border
              border-gray-800
              text-white
              placeholder-gray-500
              rounded-2xl
              p-5
              focus:outline-none
              focus:ring-2
              focus:ring-yellow-400
              transition
            "
          />

        </div>

        {/* TABLE */}
        <div
          className="
            bg-[#111]
            border
            border-yellow-500/10
            rounded-[30px]
            overflow-hidden
            shadow-2xl
          "
        >

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead
                className="
                  bg-black
                  text-yellow-400
                "
              >

                <tr>

                  <th className="p-5 whitespace-nowrap">
                    Username
                  </th>

                  <th className="p-5 whitespace-nowrap">
                    Password
                  </th>

                  <th className="p-5 whitespace-nowrap">
                    Role
                  </th>

                  <th className="p-5 whitespace-nowrap">
                    Password
                  </th>

                  <th className="p-5 whitespace-nowrap">
                    Statut
                  </th>

                  <th className="p-5 whitespace-nowrap">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {users.length > 0 ? (

                  users.map((u) => (

                    <tr
                      key={u.id}
                      className="
                        border-b
                        border-gray-800
                        hover:bg-[#1a1a1a]
                        transition
                        text-center
                      "
                    >

                      {/* USERNAME */}
                      <td
                        className="
                          p-5
                          font-semibold
                          text-white
                          whitespace-nowrap
                        "
                      >
                        {u.username}
                      </td>

                      {/* PASSWORD */}
                      <td
                        className="
                          p-5
                          tracking-widest
                          text-gray-300
                        "
                      >
                        ********
                      </td>

                      {/* ROLE */}
                      <td className="p-5">

                        <span
                          className="
                            bg-yellow-500/10
                            text-yellow-400
                            px-4
                            py-2
                            rounded-full
                            text-xs
                            font-bold
                          "
                        >
                          {u.role}
                        </span>

                      </td>

                      {/* PASSWORD STATUS */}
                      <td className="p-5">

                        {u.mustChangePassword ? (

                          <span
                            className="
                              bg-red-500/20
                              text-red-400
                              px-4
                              py-2
                              rounded-full
                              text-xs
                              font-bold
                            "
                          >
                            Non changé
                          </span>

                        ) : (

                          <span
                            className="
                              bg-green-500/20
                              text-green-400
                              px-4
                              py-2
                              rounded-full
                              text-xs
                              font-bold
                            "
                          >
                            Changé
                          </span>

                        )}

                      </td>

                      {/* STATUS */}
                      <td className="p-5">

                        {u.actif ? (

                          <span
                            className="
                              bg-green-500/20
                              text-green-400
                              px-4
                              py-2
                              rounded-full
                              text-xs
                              font-bold
                            "
                          >
                            Actif
                          </span>

                        ) : (

                          <span
                            className="
                              bg-red-500/20
                              text-red-400
                              px-4
                              py-2
                              rounded-full
                              text-xs
                              font-bold
                            "
                          >
                            Désactivé
                          </span>

                        )}

                      </td>

                      {/* ACTIONS */}
                      <td className="p-5">

                        <div
                          className="
                            flex
                            justify-center
                            gap-3
                          "
                        >

                          {/* EDIT */}
                          <button
                            onClick={() =>
                              editUser(u)
                            }
                            className="
                              w-11
                              h-11
                              rounded-2xl
                              bg-yellow-400
                              hover:bg-yellow-300
                              flex
                              items-center
                              justify-center
                              text-lg
                              transition
                              shadow-lg
                            "
                            title="Modifier"
                          >
                            ✏️
                          </button>

                          {/* ACTIVE / DISABLE */}
                          {u.actif ? (

                            <button
                              onClick={() =>
                                disableUser(u.id)
                              }
                              className="
                                w-11
                                h-11
                                rounded-2xl
                                bg-red-600/80
                                hover:bg-red-600
                                flex
                                items-center
                                justify-center
                                text-lg
                                transition
                              "
                              title="Désactiver"
                            >
                              🚫
                            </button>

                          ) : (

                            <button
                              onClick={() =>
                                reactivateUser(u.id)
                              }
                              className="
                                w-11
                                h-11
                                rounded-2xl
                                bg-green-600/80
                                hover:bg-green-600
                                flex
                                items-center
                                justify-center
                                text-lg
                                transition
                              "
                              title="Réactiver"
                            >
                              ✅
                            </button>

                          )}

                        </div>

                      </td>

                    </tr>
                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="
                        p-10
                        text-center
                        text-gray-500
                        text-lg
                      "
                    >
                      Aucun utilisateur trouvé
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* MODAL FORM */}
        {showForm && (

          <div
            className="
              fixed
              inset-0
              bg-black/70
              backdrop-blur-sm
              flex
              justify-center
              items-center
              z-50
              p-6
            "
          >

            <div className="w-full max-w-2xl">

              {/* CLOSE */}
              <div className="flex justify-end mb-4">

                <button
                  onClick={() => {

                    setShowForm(false);

                    setSelectedUser(null);
                  }}
                  className="
                    bg-white
                    hover:bg-gray-100
                    text-black
                    px-5
                    py-3
                    rounded-2xl
                    font-bold
                  "
                >
                  ✕
                </button>

              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="
                  bg-[#111]
                  border
                  border-yellow-500/10
                  rounded-[30px]
                  p-8
                  shadow-2xl
                "
              >

                <h2
                  className="
                    text-3xl
                    font-black
                    text-yellow-400
                    mb-8
                  "
                >
                  {selectedUser
                    ? "Modifier Utilisateur"
                    : "Ajouter Utilisateur"}
                </h2>

                <div className="space-y-5">

                  {/* USERNAME */}
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="
                      w-full
                      bg-black
                      border
                      border-gray-800
                      text-white
                      rounded-2xl
                      p-5
                      focus:outline-none
                      focus:ring-2
                      focus:ring-yellow-400
                    "
                    required
                  />

                  {/* PASSWORD */}
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="
                      w-full
                      bg-black
                      border
                      border-gray-800
                      text-white
                      rounded-2xl
                      p-5
                      focus:outline-none
                      focus:ring-2
                      focus:ring-yellow-400
                    "
                  />

                  {/* ROLE */}
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="
                      w-full
                      bg-black
                      border
                      border-gray-800
                      text-white
                      rounded-2xl
                      p-5
                      focus:outline-none
                      focus:ring-2
                      focus:ring-yellow-400
                    "
                  >

                    <option value="Admin">
                      Admin
                    </option>

                    <option value="Receptionniste">
                      Receptionniste
                    </option>

                  </select>

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="
                    mt-8
                    w-full
                    bg-yellow-400
                    hover:bg-yellow-300
                    text-black
                    py-5
                    rounded-2xl
                    font-black
                    text-lg
                    transition
                    shadow-xl
                  "
                >
                  {selectedUser
                    ? "Modifier"
                    : "Créer"}
                </button>

              </form>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}