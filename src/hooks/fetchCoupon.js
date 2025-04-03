import { useState } from "react";

export const fetchCoupon = async () => {
    const token = localStorage.getItem("token");

    {/*const token = localStorage.getItem("token")*/}
    
    try {
        const response = await fetch("https://apiv1.lacuponera.store/api/v1/coupons", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la request: ${response.status}`);
        }

        const data = await response.json();
        //console.log("Cupones obtenidos:", data);
        return { coupons: data || [], error: null };
    } catch (error) {
        console.error(`Error al obtener los cupones: ${error.message}`);
        return { coupons: [], error: error.message };
    }
};
