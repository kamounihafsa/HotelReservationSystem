import { useEffect, useState } from "react";
import API from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function ReceptionChambres() {

  const [chambres, setChambres] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const fetch = async () => {

      try {

        if (search.trim() === "") {

          const res = await API.get("/Chambre/all");

          setChambres(res.data);

        } else {

          const res = await API.get(
            `/Chambre/search?term=${search}`
          );

          setChambres(res.data);
        }

      } catch (err) {

        console.log(err);
      }
    };

    fetch();

  }, [search]);

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

          <div className="flex justify-between items-center flex-wrap gap-5">

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
                Chambres
              </h1>

              <p className="text-gray-400 mt-3 text-lg">
                Consultation des chambres disponibles
              </p>

            </div>

            <div
              className="
                bg-yellow-400
                text-black
                px-8
                py-5
                rounded-3xl
                shadow-xl
                text-center
              "
            >

              <p className="text-4xl font-black">
                {chambres.length}
              </p>

              <p className="font-semibold">
                Chambres
              </p>

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
            placeholder="Rechercher une chambre..."
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

        {/* CARDS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

          {chambres.map((c) => (

            <div
              key={c.id}
              className="
                relative
                overflow-hidden
                bg-white
                rounded-[26px]
                border
                border-gray-200
                p-5
                shadow-md
                hover:-translate-y-1
                hover:shadow-xl
                transition-all
                duration-300
              "
            >

              {/* GOLD LINE */}
              <div
                className="
                  absolute
                  top-0
                  left-0
                  w-full
                  h-1
                  bg-gradient-to-r
                  from-yellow-300
                  via-yellow-500
                  to-yellow-300
                "
              />

              {/* TOP */}
              <div className="flex justify-between items-start">

                <div>

                  <p
                    className="
                      text-yellow-500
                      uppercase
                      tracking-[4px]
                      text-xs
                      font-bold
                      mb-2
                    "
                  >
                    Dar Hafsa
                  </p>

                  <h2 className="text-2xl font-black text-black">
                    Chambre {c.numero}
                  </h2>

                  <p className="text-gray-500 mt-1">

                    {
                      {
                        0: "Simple",
                        1: "Double",
                        2: "Suite"
                      }[c.type]
                    }

                  </p>

                </div>

                <span
                  className={`
                    px-5
                    py-2
                    rounded-full
                    text-sm
                    font-bold
                    ${
                      c.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {c.active
                    ? "Disponible"
                    : "Désactivée"}
                </span>

              </div>

              {/* INFOS */}
              <div className="grid grid-cols-2 gap-4 mt-7">

                <div
                  className="
                    bg-gray-50
                    border
                    border-gray-100
                    rounded-2xl
                    p-4
                  "
                >

                  <p className="text-gray-400 text-sm">
                    Étage
                  </p>

                  <h3 className="text-2xl font-black mt-1">
                    {c.etage}
                  </h3>

                </div>

                <div
                  className="
                    bg-black
                    rounded-2xl
                    p-5
                  "
                >

                  <p className="text-gray-400 text-sm">
                    Capacité
                  </p>

                  <h3 className="text-2xl font-black text-yellow-400 mt-1">
                    {c.capacite} Pers.
                  </h3>

                </div>

              </div>

              {/* DESCRIPTION */}
              <div
                className="
                  mt-6
                  bg-[#fafafa]
                  border
                  border-gray-100
                  rounded-2xl
                  p-5
                "
              >

                <p className="text-gray-600 leading-7">
                  {c.description || "Aucune description"}
                </p>

              </div>

              {/* EQUIPEMENTS */}
              <div className="flex flex-wrap gap-3 mt-6">

                {c.equipements?.map((e, index) => (

                  <span
                    key={index}
                    className="
                      bg-yellow-50
                      border
                      border-yellow-200
                      text-yellow-700
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-semibold
                    "
                  >
                    {typeof e === "string"
                      ? e
                      : e.nom}
                  </span>

                ))}

              </div>

            </div>
          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}