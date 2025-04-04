import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

export const CuponCard = ({ coupon }) => {
    const navigate = useNavigate();
    const {selectCupon} = useContext(AuthContext);


    if (!coupon) return null;

    const handleCuponClick = () => {
        selectCupon(coupon.offerDetails.id);
        navigate(`/detalleCupon/${coupon.code}/detalle`);
    }

    return (
        <div className="relative bg-fondo2 p-4 rounded-lg shadow-md w-full h-auto mx-auto">
            <div className="absolute top-2 right-2 bg-resaltador2 text-white text-sm font-bold px-2 py-1 rounded-full">
                <p>{Math.round(((coupon.offerDetails.discountPrice * 1) / coupon.offerDetails.originalPrice) * 100)}%</p>
            </div>
            <div className="h-auto">
                <img src={"./public/img/Cuponazo.png"} alt="Cupón" className="w-full h-40 object-cover rounded-md" />
                <p className="mt-3 font-bold">{coupon.offerDetails.title}</p>
                <p className="text-black">{coupon.offerDetails.description}</p>
                <p
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${
                    coupon.couponState === "VALID"
                      ? "bg-green-200 text-green-800"
                      : coupon.couponState === "reclamado"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                    Cupon {coupon.couponState}
                </p>

                <p>Válido hasta: {new Date(coupon.offerDetails.validUntil).toLocaleDateString()}</p>
            </div>
            <button
                className="bg-primary2 h-7 w-full mt-4 rounded text-white items-center text-center hover:bg-resaltador2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-96"
                onClick={handleCuponClick} 
            >
                Ver cupón
            </button>
        </div>
    );
};