import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import fetchgetCoupon from "../hooks/fetchgetCoupon";

const CuponDetails = () => {
    const [coupon, setCoupon] = useState(null);
    const { couponCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            if (couponCode) {
                const data = await fetchgetCoupon(couponCode);
                setCoupon(data);
            }
        }
        fetchData();
    }, [couponCode]);

    if (!coupon) return <p className="text-center text-gray-600">Cargando información del cupón...</p>;

    return (
        <div className="relative bg-fondo p-4 rounded-lg shadow-md w-full h-auto mx-auto">
            <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg max-w-2xl">
                <img
                    src={"/public/img/Cuponazo.png"}
                    alt="Cupón"
                    className="w-full h-auto rounded-lg"
                />
                <h3 className="text-2xl font-semibold text-resaltador mb-2 mt-2 text-center">
                    {coupon.offerDetails?.title || "Título no disponible"}
                </h3>
                <p className="text-gray-700 text-lg text-center">
                    {coupon.offerDetails?.description || "Descripción no disponible"}
                </p>
                <p className="text-gray-700 text-lg text-center">
                    Precio Original: ${coupon.offerDetails?.originalPrice || "Precio no disponible"}
                </p><p className="text-gray-700 text-lg text-center">
                    Precio de Descuento: ${coupon.offerDetails?.discountPrice || 0 }
                </p>
                <p className="text-resaltador text-lg font-semibold mt-2 text-center">
                    Válido hasta {coupon.offerDetails?.validUntil ? new Date(coupon.offerDetails.validUntil).toLocaleDateString() : "Fecha no disponible"}
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

export default CuponDetails;
