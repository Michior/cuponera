import React, { useContext } from "react";
import { UserIcon } from "@heroicons/react/20/solid";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";



export const MiPerfil = () => {
    const { client, logout } = useContext(AuthContext);

    if (!client) {
        return (
            <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-gray-700 text-lg">Sesión inactiva.</p>
                <NavLink to="/cliente/login" className="bg-primary text-white px-4 py-2 rounded">
                Iniciar Sesión
                </NavLink>
            </div>
            
            </>
        );
    } 

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">Perfil de Usuario</h2>
                <div className="text-center">
                    <UserIcon className="w-24 h-24 text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">{client.email}</p>
                    <p className="text-lg font-semibold">{client.firstName} {client.lastName}</p>
                    <p className="text-gray-500">{client.phone}</p>
                    <p className="text-gray-500">{client.DUI}</p>
                </div>
                <button
                    onClick={logout}
                    className="w-full mt-4 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default MiPerfil;
