import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import fetchOfferDetails from "../hooks/fetchOffersDetails";

export default function OfferDetails() {
    const [offer, setOffer] = useState(null);
    const navigate = useNavigate();
    const { offerId } = useParams();
    const { selectOffer, token } = useContext(AuthContext);
    
    useEffect(() => {
        async function fetchData() {
            const data = await fetchOfferDetails(offerId);
            setOffer(data);
        }
        fetchData();
    }, [offerId]);

    if (!offer) return <p className="text-center text-gray-600">Cargando información de la oferta...</p>;
    
    const handleBuy = () => {
        if (!token) {
            alert("Debes iniciar sesión antes de comprar.");
            navigate("/cliente/login");
            return;
        }
        selectOffer(offerId);
        navigate(`/detalleOferta/${offerId}/buy`);
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="bg-white shadow-xl rounded-2xl max-w-lg p-6 border border-gray-200">
                <h2 className="text-3xl text-center font-extrabold text-blue-600 mb-4">Detalles de la Oferta</h2>
                <div className="flex justify-center">
                    <img src={"/public/img/Cuponazo.png"} alt="Cupón" className="w-80 h-48 object-cover rounded-lg shadow-md" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">{offer.offer.title}</h3>
                <p className="text-gray-600 text-lg mb-3">{offer.offer.description}</p>
                <p className="text-gray-500 line-through font-medium">Precio normal: ${offer.offer.originalPrice}</p>
                <p className="text-xl font-bold text-green-600">Precio con descuento: ${offer.offer.discountPrice}</p>
                <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                    <p className="text-lg font-semibold text-gray-700">Período de Validez</p>
                    <p className="text-gray-600">Desde {new Date(offer.offer.validFrom).toLocaleDateString()} hasta {new Date(offer.offer.validUntil).toLocaleDateString()}</p>
                </div>
                <button 
                    onClick={handleBuy} 
                    className="w-full mt-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-105"
                >
                    Comprar
                </button>
            </div>
        </div>
    );
};