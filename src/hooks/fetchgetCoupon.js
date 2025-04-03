export async function fetchgetCoupon(couponCode) {
    try {
        const token = localStorage.getItem("token");

        if (!token) throw new Error("No hay token de autenticación.");

        const response = await fetch(`https://apiv1.lacuponera.store/api/v1/coupons/${couponCode}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) throw new Error("Error al obtener los detalles del cupón");

        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error al obtener los detalles:", err.message);
        return null;
    }
};

export default fetchgetCoupon;
