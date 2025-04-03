import React, { useEffect, useState } from "react";
import { fetchCoupon } from "../hooks/fetchCoupon";
import { CuponCard } from "./CuponCard";

export const Cupones = () => {
    const [coupons, setCoupons] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCoupons = async () => {
            const { coupons, error } = await fetchCoupon();
            setCoupons(coupons);
            setError(error);
        };
        getCoupons();
    }, []);

    if (error) return <p className="text-red-600">Error: {error}</p>;
    if (!coupons.length) return <p className="text-gray-500">No hay cupones disponibles.</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-15 py-5">
            {coupons.map((coupon) => (
                <CuponCard key={coupon.id} coupon={coupon} />
            ))}
        </div>
    );
};