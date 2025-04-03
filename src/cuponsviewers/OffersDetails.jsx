import { useState, useEffect, useContext, use } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import fetchOfferDetails from "../hooks/fetchOffersDetails";

export default function OfferDetails() {
    const [offer, setOffer] = useState(null);
    const navigate = useNavigate();
    const { offerId } = useParams();
    const { selectOffer } = useContext(AuthContext); 
    

    useEffect(() => {
        async function fetchData() {
            const data = await fetchOfferDetails(offerId);
            setOffer(data);
        }
        fetchData();
    }, [offerId]);

    if (!offer) return <p>Cargando información de la oferta...</p>;
    
    return (
        <div className="relative bg-fondo p-4 rounded-lg shadow-md w-full h-auto mx-auto">
            <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg max-w-2xl">
                <h2 className="text-3xl text-center text-primary font-extrabold mb-4">Detalles de la Oferta</h2>
                <img src={"/public/img/Cuponazo.png"} alt="Cupón" className="place-self-center w-auto h-40" />
                <h3 className="text-2xl font-semibold text-resaltador mb-2 mt-2">{offer.offer.title}</h3>
                <p className="text-lg">{offer.offer.description}</p>
                <p className="font-bold line-through">Precio normal: ${offer.offer.originalPrice}</p>
                <p className="text-xl font-bold text-primary">Precio con descuento: ${offer.offer.discountPrice}</p>
                <p className="text-lg font-bold mt-2">Período de Validez</p>
                <p className="mt-1">Válido desde {new Date(offer.offer.validFrom).toLocaleDateString()} hasta {new Date(offer.offer.validUntil).toLocaleDateString()}</p>

                <button 
                    onClick={() => {
                        selectOffer(offerId);
                        navigate(`/detalleOferta/${offerId}/buy`);
                    }} 
                    className="bg-primary py-2.5 w-full mt-4 rounded-lg text-white text-center hover:bg-resaltador transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-96"
                >
                    Comprar
                </button>
            </div>
        </div>
    );
}
