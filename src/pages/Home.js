import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Header />

      <section className="bg-gray-100 h-screen flex flex-col justify-center items-center text-center">
        
        <h2 className="text-4xl font-bold mb-4">
          Bienvenue à Dar Hafsa
        </h2>

        <p className="text-lg text-gray-600 mb-6">
          Votre expérience de luxe commence ici
        </p>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <p><strong>Adresse :</strong> Rabat, Maroc</p>
          <p><strong>Téléphone :</strong> +212 6 00 00 00 00</p>
          <p><strong>Email :</strong> contact@darhafsa.com</p>
        </div>

      </section>
    </div>
  );
}