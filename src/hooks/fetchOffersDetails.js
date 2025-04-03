export const fetchOfferDetails = async (offerId) => {
    
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`https://apiv1.lacuponera.store/api/v1/offers/${offerId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }

        const data = await response.json();
        console.log("Detalles de la oferta:", data);
        return data;
    } catch (error) {
        console.error(`Error al obtener detalles de la oferta: ${error.message}`);
        return null;
    }
};

export default fetchOfferDetails;