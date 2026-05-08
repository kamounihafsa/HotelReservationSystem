import { useEffect, useState, useCallback } from "react";
import API from "../../services/api";

export default function Users() {

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

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

      // 🔍 SEARCH USERNAME
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

  // 🔥 CHANGE INPUTS
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
  };

  // 🔥 DISABLE
  const disableUser = async (id) => {

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

    <div className="p-6">

      {/* TITLE */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Gestion Utilisateurs
        </h1>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          shadow-xl
          rounded-2xl
          p-6
          mb-8
        "
      >

        <div className="grid grid-cols-3 gap-4">

          {/* USERNAME */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="
              border
              p-3
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-black
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
              border
              p-3
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-black
            "
          />

          {/* ROLE */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="
              border
              p-3
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-black
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
            mt-5
            bg-black
            hover:bg-gray-800
            text-white
            px-6
            py-3
            rounded-xl
            transition
          "
        >
          {selectedUser
            ? "Modifier Utilisateur"
            : "Créer Utilisateur"}
        </button>

      </form>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Rechercher par username..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          border
          p-3
          rounded-xl
          w-1/3
          mb-6
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-black
        "
      />

      {/* TABLE */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-black text-white">

            <tr>

              <th className="p-4">
                Username
              </th>

              <th className="p-4">
                Password
              </th>

              <th className="p-4">
                Role
              </th>

              <th className="p-4">
                Statut Password
              </th>

              <th className="p-4">
                Statut
              </th>

              <th className="p-4">
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
                    text-center
                    hover:bg-gray-50
                    transition
                  "
                >

                  {/* USERNAME */}
                  <td className="p-4 font-medium">
                    {u.username}
                  </td>

                  {/* PASSWORD */}
                  <td className="p-4 tracking-widest">
                    ********
                  </td>

                  {/* ROLE */}
                  <td className="p-4">
                    {u.role}
                  </td>

                  <td className="p-4">

  {u.mustChangePassword ? (

    <span
      className="
        bg-red-100
        text-red-700
        px-3
        py-1
        rounded-full
        text-sm
        font-semibold
      "
    >
      Non changé
    </span>

  ) : (

    <span
      className="
        bg-green-100
        text-green-700
        px-3
        py-1
        rounded-full
        text-sm
        font-semibold
      "
    >
      Changé
    </span>

  )}

</td>

                  {/* STATUS */}
                  <td className="p-4">

                    {u.actif ? (

                      <span
                        className="
                          bg-green-100
                          text-green-700
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-semibold
                        "
                      >
                        Actif
                      </span>

                    ) : (

                      <span
                        className="
                          bg-red-100
                          text-red-700
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-semibold
                        "
                      >
                        Désactivé
                      </span>

                    )}

                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 flex justify-center gap-2 flex-wrap">

                    {/* EDIT */}
                    <button
                      onClick={() => editUser(u)}
                      className="
                        bg-yellow-400
                        hover:bg-yellow-500
                        px-4
                        py-2
                        rounded-lg
                        transition
                      "
                    >
                      Modifier
                    </button>

                    {/* ACTIVE / DISABLE */}
                    {u.actif ? (

                      <button
                        onClick={() =>
                          disableUser(u.id)
                        }
                        className="
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          px-4
                          py-2
                          rounded-lg
                          transition
                        "
                      >
                        Désactiver
                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          reactivateUser(u.id)
                        }
                        className="
                          bg-green-600
                          hover:bg-green-700
                          text-white
                          px-4
                          py-2
                          rounded-lg
                          transition
                        "
                      >
                        Réactiver
                      </button>

                    )}

                  </td>

                </tr>
              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="
                    p-8
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
  );
}