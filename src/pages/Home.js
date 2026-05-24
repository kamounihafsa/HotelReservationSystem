import Header from "../components/Header";

import {
  Hotel,
  Sparkles,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

export default function Home() {

  return (

    <div className="bg-black text-white overflow-hidden">

      <Header />

      {/* HERO SECTION */}
      <section
        className="
          relative
          h-screen
          flex
          items-center
          justify-center
          text-center
        "
      >

        {/* BACKGROUND */}
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Hotel"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
        />

        {/* OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-black/70
          "
        />

        {/* CONTENT */}
        <div className="relative z-10 px-6 max-w-5xl">

          <p
            className="
              text-yellow-400
              tracking-[6px]
              uppercase
              mb-4
              text-sm
            "
          >
            Hôtel de Luxe • Maroc
          </p>

          <h1
            className="
              text-6xl
              md:text-8xl
              font-black
              leading-tight
              mb-6
            "
          >
            DAR <span className="text-yellow-400">HAFSA</span>
          </h1>

          <p
            className="
              text-gray-300
              text-xl
              max-w-2xl
              mx-auto
              leading-relaxed
              mb-10
            "
          >
            Découvrez une expérience hôtelière unique,
            élégante et moderne où le luxe rencontre
            le confort absolu.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">

            <button
              className="
                bg-yellow-400
                text-black
                px-8
                py-4
                rounded-2xl
                font-bold
                hover:scale-105
                transition-all
                duration-300
                shadow-2xl
                shadow-yellow-500/20
              "
            >
              Réserver Maintenant
            </button>

            <button
              className="
                border
                border-white/30
                px-8
                py-4
                rounded-2xl
                backdrop-blur-md
                hover:bg-white
                hover:text-black
                transition-all
                duration-300
              "
            >
              Découvrir
            </button>

          </div>

        </div>

      </section>

      {/* LUXURY INFO */}
      <section className="py-24 bg-[#0B0B0B]">

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            grid
            md:grid-cols-3
            gap-10
          "
        >

          {/* CARD 1 */}
          <div
            className="
              relative
              overflow-hidden
              bg-gradient-to-br
              from-[#151515]
              to-[#0c0c0c]
              border
              border-yellow-500/10
              rounded-[35px]
              p-10
              hover:-translate-y-3
              transition-all
              duration-500
              shadow-2xl
            "
          >

            {/* GLOW */}
            <div
              className="
                absolute
                top-[-50px]
                right-[-50px]
                w-40
                h-40
                bg-yellow-400/10
                rounded-full
                blur-3xl
              "
            />

            {/* ICON */}
            <div
              className="
                relative
                z-10
                w-20
                h-20
                rounded-3xl
                bg-yellow-400/10
                border
                border-yellow-400/20
                flex
                items-center
                justify-center
                text-yellow-400
                mb-8
              "
            >
              <Hotel size={40} />
            </div>

            <h3
              className="
                text-3xl
                font-black
                mb-5
                text-white
              "
            >
              Chambres Premium
            </h3>

            <p
              className="
                text-gray-400
                leading-8
                text-lg
              "
            >
              Suites modernes avec confort haut
              de gamme et ambiance raffinée.
            </p>

          </div>

          {/* CARD 2 */}
          <div
            className="
              relative
              overflow-hidden
              bg-gradient-to-br
              from-[#151515]
              to-[#0c0c0c]
              border
              border-purple-500/10
              rounded-[35px]
              p-10
              hover:-translate-y-3
              transition-all
              duration-500
              shadow-2xl
            "
          >

            {/* GLOW */}
            <div
              className="
                absolute
                bottom-[-50px]
                left-[-50px]
                w-40
                h-40
                bg-purple-500/10
                rounded-full
                blur-3xl
              "
            />

            {/* ICON */}
            <div
              className="
                relative
                z-10
                w-20
                h-20
                rounded-3xl
                bg-purple-500/10
                border
                border-purple-500/20
                flex
                items-center
                justify-center
                text-purple-400
                mb-8
              "
            >
              <Sparkles size={40} />
            </div>

            <h3
              className="
                text-3xl
                font-black
                mb-5
                text-white
              "
            >
              Expérience Luxe
            </h3>

            <p
              className="
                text-gray-400
                leading-8
                text-lg
              "
            >
              Design élégant, atmosphère calme
              et service professionnel exceptionnel.
            </p>

          </div>

          {/* CARD 3 */}
          <div
            className="
              relative
              overflow-hidden
              bg-gradient-to-br
              from-[#151515]
              to-[#0c0c0c]
              border
              border-cyan-500/10
              rounded-[35px]
              p-10
              hover:-translate-y-3
              transition-all
              duration-500
              shadow-2xl
            "
          >

            {/* GLOW */}
            <div
              className="
                absolute
                top-[-50px]
                left-[-50px]
                w-40
                h-40
                bg-cyan-500/10
                rounded-full
                blur-3xl
              "
            />

            {/* ICON */}
            <div
              className="
                relative
                z-10
                w-20
                h-20
                rounded-3xl
                bg-cyan-500/10
                border
                border-cyan-500/20
                flex
                items-center
                justify-center
                text-cyan-400
                mb-8
              "
            >
              <MapPin size={40} />
            </div>

            <h3
              className="
                text-3xl
                font-black
                mb-5
                text-white
              "
            >
              Localisation
            </h3>

            <div
              className="
                space-y-5
                text-gray-400
                text-lg
              "
            >

              <div className="flex items-center gap-4">

                <MapPin
                  size={20}
                  className="text-cyan-400"
                />

                <span>Rabat, Maroc</span>

              </div>

              <div className="flex items-center gap-4">

                <Phone
                  size={20}
                  className="text-cyan-400"
                />

                <span>
                  +212 6 00 00 00 00
                </span>

              </div>

              <div className="flex items-center gap-4">

                <Mail
                  size={20}
                  className="text-cyan-400"
                />

                <span>
                  contact@darhafsa.com
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}