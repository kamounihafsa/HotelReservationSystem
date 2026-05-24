import {
  useEffect,
  useState
} from "react";

import DashboardLayout
from "../../layouts/DashboardLayout";

import API
from "../../services/api";

import {
  Users,
  BedDouble,
  Wallet,
  TrendingUp,
  Hotel,
  Sparkles,
  Activity
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function AdminDashboard() {

  const [users, setUsers] =
    useState([]);

  const [chambres, setChambres] =
    useState([]);

  const [reservations, setReservations] =
    useState([]);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const usersRes =
        await API.get("/users");

      setUsers(usersRes.data);

      const chambresRes =
        await API.get("/Chambre/all");

      setChambres(chambresRes.data);

      const reservationsRes =
        await API.get("/reservations");

      setReservations(
        reservationsRes.data
      );

    } catch (err) {

      console.log(err);
    }
  };

  // 🔥 TOTAL REVENUE
  const totalRevenue =
    reservations.reduce(
      (sum, r) =>
        sum +
        (
          r.facture?.montantTotal || 0
        ),
      0
    );

  // 🔥 FORMAT
  const revenueFormatted =
    totalRevenue.toFixed(2);

  // 🔥 ACTIVE / DISABLED
  const activeRooms =
    chambres.filter(
      c => c.active
    ).length;

  const disabledRooms =
    chambres.filter(
      c => !c.active
    ).length;

  // 🔥 BAR DATA
  const statsData = [

    {
      name: "Users",
      value: users.length
    },

    {
      name: "Rooms",
      value: chambres.length
    },

    {
      name: "Revenue",
      value:
        Number(
          (
            totalRevenue / 1000
          ).toFixed(2)
        )
    }

  ];

  // 🔥 PIE DATA
  const pieData = [

    {
      name: "Actives",
      value: activeRooms
    },

    {
      name: "Disabled",
      value: disabledRooms
    }

  ];

  // 🔥 COLORS
  const COLORS = [
    "#facc15",
    "#a855f7"
  ];

  return (

    <DashboardLayout>

      <div className="space-y-10">

        {/* HERO */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-yellow-500/10
            bg-gradient-to-br
            from-[#111111]
            via-[#161616]
            to-[#0B0B0B]
            p-10
            shadow-[0_0_80px_rgba(250,204,21,0.08)]
          "
        >

          {/* GLOW */}
          <div
            className="
              absolute
              top-[-80px]
              right-[-80px]
              w-[250px]
              h-[250px]
              bg-yellow-400/10
              rounded-full
              blur-3xl
            "
          />

          <div
            className="
              absolute
              bottom-[-80px]
              left-[-80px]
              w-[250px]
              h-[250px]
              bg-purple-500/10
              rounded-full
              blur-3xl
            "
          />

          <div
            className="
              relative
              z-10
              flex
              justify-between
              items-center
              flex-wrap
              gap-8
            "
          >

            {/* LEFT */}
            <div>

              <div className="flex items-center gap-4 mb-5">

                <div
                  className="
                    w-16
                    h-16
                    rounded-3xl
                    bg-yellow-400/10
                    border
                    border-yellow-400/20
                    flex
                    items-center
                    justify-center
                    text-yellow-400
                  "
                >
                  <Sparkles size={30} />
                </div>

                <div>

                  <p
                    className="
                      uppercase
                      tracking-[6px]
                      text-yellow-400
                      text-sm
                      mb-2
                    "
                  >
                    Luxury Administration
                  </p>

                  <h1
                    className="
                      text-6xl
                      font-black
                      text-white
                      leading-none
                    "
                  >
                    Admin Dashboard
                  </h1>

                </div>

              </div>

              <p
                className="
                  text-gray-400
                  text-lg
                  max-w-2xl
                  leading-8
                "
              >
                Gestion intelligente de votre hôtel premium
                avec suivi des revenus, chambres,
                utilisateurs et statistiques globales.
              </p>

            </div>

            {/* RIGHT CARD */}
            <div
              className="
                bg-white/[0.04]
                border
                border-white/10
                rounded-3xl
                p-6
                backdrop-blur-xl
                min-w-[280px]
              "
            >

              <div className="flex items-center gap-3 mb-4">

                <Activity
                  className="
                    text-green-400
                  "
                />

                <p className="text-white font-bold">
                  Système Status
                </p>

              </div>

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span className="text-gray-400">
                    Utilisateurs
                  </span>

                  <span className="text-white font-bold">
                    {users.length}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-400">
                    Chambres
                  </span>

                  <span className="text-white font-bold">
                    {chambres.length}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-400">
                    Revenue
                  </span>

                  <span className="text-yellow-400 font-black">
                    {revenueFormatted} DH
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* CARDS */}
        <div
          className="
            grid
            lg:grid-cols-3
            gap-8
          "
        >

          {/* USERS */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[35px]
              p-8
              bg-gradient-to-br
              from-[#181818]
              to-[#0f0f0f]
              border
              border-yellow-500/10
              shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-500
            "
          >

            <div
              className="
                absolute
                top-[-60px]
                right-[-60px]
                w-44
                h-44
                bg-yellow-400/10
                rounded-full
                blur-3xl
              "
            />

            <div className="relative z-10">

              <div
                className="
                  w-16
                  h-16
                  rounded-3xl
                  bg-yellow-400/10
                  border
                  border-yellow-400/20
                  flex
                  items-center
                  justify-center
                  text-yellow-400
                  mb-6
                "
              >
                <Users size={30} />
              </div>

              <p className="text-gray-400 text-lg">
                Utilisateurs
              </p>

              <h1
                className="
                  text-6xl
                  font-black
                  text-white
                  mt-4
                "
              >
                {users.length}
              </h1>

            </div>

          </div>

          {/* ROOMS */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[35px]
              p-8
              bg-gradient-to-br
              from-[#181818]
              to-[#0f0f0f]
              border
              border-purple-500/10
              shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-500
            "
          >

            <div
              className="
                absolute
                top-[-60px]
                right-[-60px]
                w-44
                h-44
                bg-purple-500/10
                rounded-full
                blur-3xl
              "
            />

            <div className="relative z-10">

              <div
                className="
                  w-16
                  h-16
                  rounded-3xl
                  bg-purple-500/10
                  border
                  border-purple-500/20
                  flex
                  items-center
                  justify-center
                  text-purple-400
                  mb-6
                "
              >
                <BedDouble size={30} />
              </div>

              <p className="text-gray-400 text-lg">
                Chambres
              </p>

              <h1
                className="
                  text-6xl
                  font-black
                  text-white
                  mt-4
                "
              >
                {chambres.length}
              </h1>

            </div>

          </div>

          {/* REVENUE */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[35px]
              p-8
              bg-gradient-to-br
              from-yellow-400
              via-yellow-500
              to-orange-500
              shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-500
            "
          >

            <div
              className="
                absolute
                top-[-50px]
                right-[-50px]
                w-44
                h-44
                bg-white/20
                rounded-full
                blur-3xl
              "
            />

            <div className="relative z-10">

              <div
                className="
                  w-16
                  h-16
                  rounded-3xl
                  bg-black/10
                  border
                  border-black/10
                  flex
                  items-center
                  justify-center
                  text-black
                  mb-6
                "
              >
                <Wallet size={30} />
              </div>

              <p className="text-black/70 text-lg">
                Revenue Total
              </p>

              <h1
                className="
                  text-5xl
                  font-black
                  text-black
                  mt-4
                "
              >
                {revenueFormatted} DH
              </h1>

            </div>

          </div>

        </div>

        {/* CHARTS */}
        <div
          className="
            grid
            lg:grid-cols-2
            gap-8
          "
        >

          {/* BAR CHART */}
          <div
            className="
              bg-gradient-to-br
              from-[#151515]
              to-[#0d0d0d]
              border
              border-yellow-500/10
              rounded-[35px]
              p-8
              shadow-2xl
            "
          >

            <div className="flex items-center gap-4 mb-10">

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-yellow-400/10
                  border
                  border-yellow-400/20
                  flex
                  items-center
                  justify-center
                  text-yellow-400
                "
              >
                <TrendingUp size={26} />
              </div>

              <div>

                <h2
                  className="
                    text-3xl
                    font-black
                    text-white
                  "
                >
                  Global Statistics
                </h2>

                <p className="text-gray-500">
                  Vue analytique globale
                </p>

              </div>

            </div>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <BarChart data={statsData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#222"
                />

                <XAxis
                  dataKey="name"
                  stroke="#888"
                />

                <Tooltip
                  contentStyle={{
                    background:
                      "#111",
                    border:
                      "1px solid #333",
                    borderRadius:
                      "20px",
                    color:
                      "#fff"
                  }}
                />

                <Bar
                  dataKey="value"
                  radius={[14, 14, 0, 0]}
                  fill="#facc15"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* PIE */}
          <div
            className="
              bg-gradient-to-br
              from-[#151515]
              to-[#0d0d0d]
              border
              border-purple-500/10
              rounded-[35px]
              p-8
              shadow-2xl
            "
          >

            <div className="flex items-center gap-4 mb-10">

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-purple-500/10
                  border
                  border-purple-500/20
                  flex
                  items-center
                  justify-center
                  text-purple-400
                "
              >
                <Hotel size={26} />
              </div>

              <div>

                <h2
                  className="
                    text-3xl
                    font-black
                    text-white
                  "
                >
                  Rooms Status
                </h2>

                <p className="text-gray-500">
                  Chambres actives et désactivées
                </p>

              </div>

            </div>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                >

                  {
                    pieData.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[index]
                          }
                        />

                      )
                    )
                  }

                </Pie>

                <Legend />

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}