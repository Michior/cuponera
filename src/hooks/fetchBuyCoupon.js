// Fetch para comprar la oferta (Cupón)
export async function fetchBuyCoupon(offerId) {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("No hay token de autenticación.");
        }

        const response = await fetch(`https://apiv1.lacuponera.store/api/v1/offers/${offerId}/buy`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }); 

        if (!response.ok) {
            throw new Error("Error al comprar la oferta");
        }

        const data = await response.json();
        return data.couponCode; // Devuelve el couponCode
    } catch (err) {
        console.error("Error en la compra:", err.message);
        return null;
    }
}
