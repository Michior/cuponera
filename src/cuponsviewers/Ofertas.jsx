import { useState, useEffect } from "react";
import { OffertCard } from "./OffertCard";
import { fetchOffers } from "../hooks/fetchOffer";


export const Ofertas = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadOffers = async () => {
            try {
                const data = await fetchOffers();
                setOffers(data);
            } catch (error) {
                setError("Error cargando ofertas");
            } finally {
                setLoading(false);
            }
        };
        loadOffers();
    }, []);

    if (loading) return <p className="text-center">Cargando ofertas...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <>
            {/*<Filtro/>*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-15 py-5">
                {offers.length > 0 ? (
                    offers.map((offer) => <OffertCard key={offer.id} offer={offer} />)
                ) : (
                    <p className="text-center">No hay ofertas disponibles.</p>
                )}
            </div>
        </>
    );
};
