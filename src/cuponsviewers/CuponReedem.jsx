import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { Calendar, Tag } from "lucide-react";
    
export const CuponReedem = ({ coupon }) => {
  const navigate = useNavigate();
  const { selectCupon } = useContext(AuthContext);

  if (!coupon || coupon.couponState !== "USED") return null; // Filtrar para solo mostrar cupones válidos

  const handleCuponClick = () => {
    selectCupon(coupon.offerDetails.id);
    navigate(`/detalleCupon/${coupon.code}/detalle`);
  };

  const discountPercentage = Math.round(
    ((coupon.offerDetails.originalPrice - coupon.offerDetails.discountPrice) /
      coupon.offerDetails.originalPrice) *
      100
  );

  return (
    <div className="relative bg-red-100 p-5 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl">
      {/* Descuento en la esquina */}
      <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
        {discountPercentage}% OFF
      </div>

      {/* Imagen */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={"/public/img/Cuponazo.png"}
          alt="Cupón"
          className="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Contenido */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800 line-clamp-1 hover:text-blue-600 transition-colors">
          {coupon.offerDetails.title}
        </h3>

        <p className="text-gray-600 mt-2 text-sm line-clamp-2">
          {coupon.offerDetails.description}
        </p>

        {/* Estado del cupón */}
        <div className="flex items-center gap-2 mt-3">
          <Tag className="h-5 w-5 text-gray-400" />
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-200 text-red-800">
            Reclamado
          </span>
        </div>

        {/* Fecha de validez */}
        <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
          <Calendar className="h-5 w-5 text-gray-400" />
          <span>
            Válido hasta:{" "}
            {new Date(coupon.offerDetails.validUntil).toLocaleDateString()}
          </span>
        </div>

        {/* Botón */}
        <button
          className="mt-4 w-full bg-blue-600 text-white text-lg py-2 rounded-lg hover:bg-blue-700 transition-all"
          onClick={handleCuponClick}
        >
          Ver cupón
        </button>
      </div>
    </div>
  );
};

export default CuponReedem;