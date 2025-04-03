import React from 'react';
import { useNavigate } from 'react-router';

const CuponCompradoDetalle = ({ coupon }) => {
    const navigate = useNavigate();

    if (!coupon) return <p className="text-center text-gray-600">Cargando detalles del cupón...</p>;

    return (
        <div className="relative bg-fondo p-4 rounded-lg shadow-md w-full h-auto mx-auto">
            <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg max-w-2xl">
                <h2 className="text-3xl text-center text-primary font-extrabold mb-4">
                    ¡Gracias por tu compra! Estos son los detalles de tu cupón:
                </h2>
                <img
                    src={"/public/img/Cuponazo.png"}
                    alt="Cupón"
                    className="w-full h-auto rounded-lg"
                />
                <h3 className="text-2xl font-semibold text-resaltador mb-2 mt-2 text-center">
                    {coupon.offerDetails.title}
                </h3>
                <p className="text-gray-700 text-lg text-center">{coupon.offerDetails.description || "Descripción no disponible"}</p>
                <p className="text-resaltador text-lg font-semibold mt-2 text-center">
                    Válido hasta {new Date(coupon.offerDetails.validUntil).toLocaleDateString()}
                </p>
                <p className="text-primary text-lg font-semibold capitalize text-center">
                    ¡Gracias por comprar con nosotros!
                </p>
                <button
                    onClick={() => navigate("/misCupones")}
                    className="bg-primary py-2.5 w-full mt-4 rounded-lg text-white text-center 
                               hover:bg-resaltador transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Regresar
                </button>
            </div>
        </div>
    );
};

export default CuponCompradoDetalle;
