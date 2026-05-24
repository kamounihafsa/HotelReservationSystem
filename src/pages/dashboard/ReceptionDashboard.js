import {
  useEffect,
  useState
} from "react";

import DashboardLayout
from "../../layouts/DashboardLayout";

import API
from "../../services/api";

import {
  BedDouble,
  CalendarDays,
  Users,
  Activity,
  Hotel,
  Sparkles
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function ReceptionDashboard() {

  const [clients, setClients] =
    useState([]);

  const [reservations, setReservations] =
    useState([]);

  const [chambres, setChambres] =
    useState([]);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      // CLIENTS
      const clientsRes =
        await API.get("/Client");

      setClients(clientsRes.data);

      // RESERVATIONS
      const reservationsRes =
        await API.get("/reservations");

      setReservations(
        reservationsRes.data
      );

      // CHAMBRES
      const chambresRes =
        await API.get("/Chambre/all");

      setChambres(
        chambresRes.data
      );

    } catch (err) {

      console.log(err);
    }
  };

  // 🔥 CHAMBRES RESERVEES
  const reservedRoomNumbers =
    reservations
      .filter(
        r =>
          r.statut !== "CheckOut" &&
          r.statut !== "Cancelled"
      )
      .map(r => {

        // "Chambre 101 - Simple"
        const text = r.chambre;

        return text.split("-")[0]
          .replace("Chambre", "")
          .trim();
      });

  // 🔥 CHAMBRES DISPONIBLES
  const availableRooms =
    chambres.filter(
      c =>
        c.active &&
        !reservedRoomNumbers.includes(
          c.numero.toString()
        )
    );

  // STATS DATA
  const statsData = [

    {
      name: "Clients",
      value: clients.length
    },

    {
      name: "Reservations",
      value: reservations.length
    },

    {
      name: "Disponibles",
      value: availableRooms.length
    }

  ];

  // PIE DATA
  const pieData = [

    {
      name: "Disponibles",
      value: availableRooms.length
    },

    {
      name: "Réservées",
      value:
        chambres.length -
        availableRooms.length
    }

  ];

  const COLORS = [
    "#facc15",
    "#3f3f46"
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
            via-[#0B0B0B]
            to-[#1a1a1a]
            p-10
            shadow-[0_0_60px_rgba(250,204,21,0.05)]
          "
        >

          {/* GOLD LIGHT */}
          <div
            className="
              absolute
              top-[-120px]
              right-[-60px]
              w-[300px]
              h-[300px]
              bg-yellow-400/10
              rounded-full
              blur-[120px]
            "
          />

          <div
            className="
              absolute
              bottom-[-120px]
              left-[-60px]
              w-[300px]
              h-[300px]
              bg-yellow-600/10
              rounded-full
              blur-[120px]
            "
          />

          <div className="relative z-10">

            <div
              className="
                flex
                items-center
                gap-4
                mb-6
              "
            >

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
                  Luxury Reception
                </p>

                <h1
                  className="
                    text-5xl
                    font-black
                    text-white
                  "
                >
                  Reception Dashboard
                </h1>

              </div>

            </div>

            <p
              className="
                text-gray-400
                text-lg
                leading-8
                max-w-3xl
              "
            >
              Gestion premium des clients,
              réservations et chambres
              disponibles avec une
              expérience moderne et élégante.
            </p>

          </div>

        </div>

        {/* STATS */}
        <div
          className="
            grid
            lg:grid-cols-3
            gap-8
          "
        >

          {/* CLIENTS */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[35px]
              border
              border-yellow-500/10
              bg-gradient-to-br
              from-[#111111]
              to-[#1a1a1a]
              p-8
              shadow-2xl
            "
          >

            <div
              className="
                absolute
                top-[-40px]
                right-[-40px]
                w-40
                h-40
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

              <p className="text-gray-400">
                Clients
              </p>

              <h1
                className="
                  text-6xl
                  font-black
                  text-white
                  mt-4
                "
              >
                {clients.length}
              </h1>

            </div>

          </div>

          {/* RESERVATIONS */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[35px]
              border
              border-yellow-500/10
              bg-gradient-to-br
              from-[#111111]
              to-[#1a1a1a]
              p-8
              shadow-2xl
            "
          >

            <div
              className="
                absolute
                bottom-[-40px]
                right-[-40px]
                w-40
                h-40
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
                <CalendarDays size={30} />
              </div>

              <p className="text-gray-400">
                Réservations
              </p>

              <h1
                className="
                  text-6xl
                  font-black
                  text-white
                  mt-4
                "
              >
                {reservations.length}
              </h1>

            </div>

          </div>

          {/* AVAILABLE */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[35px]
              border
              border-yellow-500/10
              bg-gradient-to-br
              from-[#111111]
              to-[#1a1a1a]
              p-8
              shadow-2xl
            "
          >

            <div
              className="
                absolute
                top-[-40px]
                left-[-40px]
                w-40
                h-40
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
                <BedDouble size={30} />
              </div>

              <p className="text-gray-400">
                Chambres Disponibles
              </p>

              <h1
                className="
                  text-6xl
                  font-black
                  text-white
                  mt-4
                "
              >
                {availableRooms.length}
              </h1>

            </div>

          </div>

        </div>

        {/* CHARTS */}
        <div
          className="
            grid
            xl:grid-cols-2
            gap-8
          "
        >

          {/* AREA CHART */}
          <div
            className="
              bg-gradient-to-br
              from-[#111111]
              to-[#1a1a1a]
              border
              border-yellow-500/10
              rounded-[35px]
              p-8
              shadow-2xl
            "
          >

            <div
              className="
                flex
                items-center
                gap-4
                mb-8
              "
            >

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
                <Activity size={24} />
              </div>

              <div>

                <h2
                  className="
                    text-3xl
                    font-black
                    text-white
                  "
                >
                  Activité Générale
                </h2>

                <p className="text-gray-500">
                  Vue globale
                </p>

              </div>

            </div>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <AreaChart data={statsData}>

                <defs>

                  <linearGradient
                    id="goldGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#facc15"
                      stopOpacity={0.8}
                    />

                    <stop
                      offset="100%"
                      stopColor="#facc15"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid
                  stroke="#27272a"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                  stroke="#71717a"
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#facc15"
                  strokeWidth={4}
                  fill="url(#goldGradient)"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

          {/* PIE CHART */}
          <div
            className="
              bg-gradient-to-br
              from-[#111111]
              to-[#1a1a1a]
              border
              border-yellow-500/10
              rounded-[35px]
              p-8
              shadow-2xl
            "
          >

            <div
              className="
                flex
                items-center
                gap-4
                mb-8
              "
            >

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
                <Hotel size={24} />
              </div>

              <div>

                <h2
                  className="
                    text-3xl
                    font-black
                    text-white
                  "
                >
                  État des Chambres
                </h2>

                <p className="text-gray-500">
                  Disponibles vs réservées
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
                  innerRadius={85}
                  outerRadius={125}
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

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}