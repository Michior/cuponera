import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [client, setClient] = useState(null);
    const [token, setToken] = useState(null);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [selectedCupon, setSelectedCupon] = useState(null);

    useEffect(() => {
        const storedClient = localStorage.getItem("client");
        const storedToken = localStorage.getItem("token");

        if (storedClient && storedToken) {
            setClient(JSON.parse(storedClient));
            setToken(storedToken);
        }
    }, []);

    const login = ({ token, client }) => {
        if (token) {
            setToken(token);
            localStorage.setItem("token", token);
        }
        if (client) {
            setClient(client);
            localStorage.setItem("client", JSON.stringify(client));
        }
    };

    const logout = () => {
        setToken(null);
        setClient(null);
        setSelectedOffer(null);
        setSelectedCupon(null);
        localStorage.removeItem("token");
        localStorage.removeItem("client");
    };

    const setProfile = (profile) => {
        setClient(profile);
        localStorage.setItem("client", JSON.stringify(profile));
    };

    const selectOffer = (couponId) => setSelectedOffer(couponId);
    const selectCupon = (couponCode) => setSelectedCupon(couponCode);

    return (
        <AuthContext.Provider value={{ client, token, login, logout, setProfile, selectedOffer, selectOffer, selectedCupon, selectCupon }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
