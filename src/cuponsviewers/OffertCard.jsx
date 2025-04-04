import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { Clock, Scissors } from "lucide-react";

export const OffertCard = ({ offer }) => {
  const navigate = useNavigate();
  const { selectOffer } = useContext(AuthContext);

  if (!offer) return null;

  const handleOfferClick = () => {
    selectOffer(offer.id);
    navigate(`/detalleOferta/${offer.id}`);
  };

  // Calcular porcentaje de descuento de forma segura
  const discountPercentage = Math.round(((offer.originalPrice - offer.discountPrice) / offer.originalPrice) * 100);

  // Calcular días restantes de forma segura
  const validUntil = offer.validUntil ? new Date(offer.validUntil) : new Date();
  const daysLeft = Math.ceil((validUntil - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="relative bg-white border border-dashed border-green-600 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative overflow-hidden">

        <img
          src={"./public/img/Cuponazo.png"}
          alt={offer.title || "Cupón"}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        />

        <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start">

          <div className="flex items-center justify-center bg-orange-600 text-white rounded-full h-12 w-12 font-bold text-lg">
            <span>{discountPercentage}%</span>
          </div>
        </div>

        {/* Elementos decorativos de cupón */}
        <div className="absolute -left-3 top-1/2 w-6 h-6 bg-white rounded-full border-l border-dashed border-green-600"></div>
        <div className="absolute -right-3 top-1/2 w-6 h-6 bg-white rounded-full border-r border-dashed border-green-600"></div>
        <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-white opacity-50"></div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1 hover:text-green-600 transition-colors">
            {offer.title || "Cupón sin título"}
          </h3>
          {/* <span className={offer.redeemed ? "bg-red-500 text-white px-2 py-1 rounded" : "bg-green-500 text-white px-2 py-1 rounded"}>
            {offer.redeemed ? "Utilizado" : "Activo"}
          </span> */}
        </div>

        <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
          {offer.description || "Sin descripción"}
        </p>

        <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
          Precio Original: $ {offer.originalPrice || "Sin descripción"}
        </p>

        <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
          Precio Descuento: $ {offer.discountPrice || "0.00"}
        </p>

        {/* <div className="flex items-center text-sm text-gray-500 mb-2">
          <Scissors className="h-4 w-4 mr-1 text-green-600" />
          <span>
            Código: <span className="font-mono font-bold">{offer.code}</span>
          </span>
        </div> */}

        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1 text-green-600" />
          <span>{daysLeft > 0 ? `Válido por ${daysLeft} día${daysLeft !== 1 ? "s" : ""}` : "Expira hoy"}</span>
        </div>
      </div>

      <div className="p-4">
        <button
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
          onClick={handleOfferClick}
        >
          Ver oferta
        </button>
      </div>
    </div>
  );
};
