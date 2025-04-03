export const fetchOffers = async () => {
    try {
        const response = await fetch("https://apiv1.lacuponera.store/api/v1/offers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la request Nahomi: ${response.status}`);
        }

        const data = await response.json();
        console.log("Ofertas recibidas:", data);

        // Verificar que la API devuelve un array
        return Array.isArray(data.offers) ? data.offers : [];
    } catch (error) {
        console.error(`Error en fetchOffers: ${error.message}`);
        return [];
    }
};
