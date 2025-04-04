import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const CuponCompradoDetalle = ({ coupon }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const container = document.querySelector('.confetti-container');
        if (container) {
            container.innerHTML = "";
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement("div");
                confetti.className = "confetti";
                confetti.style.left = `${Math.random() * 100}%`;
                container.appendChild(confetti);
            }
        }
    }, []);

    if (!coupon) return <p className="text-center text-gray-600">Cargando detalles del cupón...</p>;

    return (
        <div className="relative bg-gradient-to-b from-fondo to-white min-h-screen p-6 flex items-center justify-center">
            <div className="confetti-container absolute top-0 left-0 w-full h-full pointer-events-none z-10"></div>

            <div className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-2xl w-full z-20">
                <h2 className="text-3xl text-center text-primary font-extrabold mb-4">
                    🎉 ¡Gracias por tu compra!
                </h2>
                <img
                    src={"/public/img/Cuponazo.png"}
                    alt="Cupón"
                    className="w-full h-auto rounded-lg border border-gray-200 shadow-sm"
                />
                <h3 className="text-2xl font-bold text-resaltador my-4 text-center">
                    {coupon.offerDetails.title}
                </h3>
                <p className="text-gray-700 text-lg text-center mb-2">
                    {coupon.offerDetails.description || "Descripción no disponible"}
                </p>
                <p className="text-resaltador text-md font-semibold text-center">
                    Válido hasta{" "}
                    <span className="text-primary font-bold">
                        {new Date(coupon.offerDetails.validUntil).toLocaleDateString()}
                    </span>
                </p>
                <p className="text-primary text-lg font-semibold mt-4 text-center">
                    ¡Esperamos que disfrutes tu cupón! 💖
                </p>
                <button
                    onClick={() => navigate("/misCupones")}
                    className="bg-primary mt-6 py-2.5 w-full rounded-xl text-white font-semibold hover:bg-resaltador transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Ver mis cupones
                </button>
            </div>
        </div>
    );
};

export default CuponCompradoDetalle;
