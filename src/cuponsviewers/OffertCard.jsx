import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

export const OffertCard = ({ offer }) => {
  const navigate = useNavigate();
  const { selectOffer } = useContext(AuthContext);

  if (!offer) return null;

  const handleOfferClick = () => {
    selectOffer(offer.id);
    navigate(`/detalleOferta/${offer.id}`);
  };

  return (
    <div className="relative bg-fondo p-4 rounded-lg shadow-md w-full h-auto mx-auto">
      <div className="absolute top-2 right-2 bg-resaltador text-white text-sm font-bold px-2 py-1 rounded-full">
        <p>
          {Math.round(
            ((offer.originalPrice - offer.discountPrice) / offer.originalPrice) * 100
          )}%
        </p>
      </div>
      <div className="h-auto">
        <img src={offer.imageUrl || "./public/img/Cuponazo.png"} alt="Cupón" className="place-self-center w-auto h-40" />
        <p className="mt-3 font-bold">{offer.title}</p>
        <p className="font-semibold">{offer.enterpriseCode}</p>
        {offer.redeemed ? (
          <p className="font-bold text-red-600">Reclamado</p>
        ) : (
          <p className="font-bold text-green-600">Vigente</p>
        )}
        <p>Válido hasta: {new Date(offer.validUntil).toLocaleDateString()}</p>
      </div>
      <button
        className="bg-primary h-7 w-full mt-4 rounded text-white items-center text-center hover:bg-resaltador transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-96"
        onClick={handleOfferClick}
      >
        Ver oferta
      </button>
    </div>
  );
};