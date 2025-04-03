import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import fetchgetCoupon from "../hooks/fetchgetCoupon";
import CuponCompradoDetalle from "./CuponCompradoDetalle";
//import { fetchgetCoupon } from "../hooks/fetchgetCoupon";
//import CuponCompradoDetalle from "../components/CuponCompradoDetalle";

const CuponAdquirido = () => {
    const [couponData, setCouponData] = useState(null);
    const { couponCode } = useParams();  

    useEffect(() => {
        async function fetchData() {
            if (couponCode) {
                const data = await fetchgetCoupon(couponCode);
                setCouponData(data);
            }
        }
        fetchData();
    }, [couponCode]);  

    if (!couponData) return <p className="text-center text-gray-600">Cargando información del cupón...</p>;  

    return <CuponCompradoDetalle coupon={couponData} />;  
};

export default CuponAdquirido;
