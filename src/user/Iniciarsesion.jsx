import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

export const IniciarSesion = () => {
    const { login, setProfile } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const fetchUserProfile = async (token) => {
        try {
            const response = await fetch("https://apiv1.lacuponera.store/api/v1/profile", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Error al obtener el perfil");
            }

            const client = await response.json();
            setProfile(client);  // Guarda el perfil en el contexto
        } catch (error) {
            console.error("Error obteniendo el perfil:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("https://apiv1.lacuponera.store/api/v1/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "Error en el inicio de sesión");
            }

            login({ token: data.token });  // Guarda el token en el contexto
            await fetchUserProfile(data.token);  // Luego obtiene el perfil

            navigate("/misCupones");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Iniciar Sesión</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Correo</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded mt-2" placeholder="Correo electrónico" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Contraseña</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded mt-2" placeholder="Contraseña" />
                </div>
                <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded">Iniciar Sesión</button>
            </form>
        </div>
    );
};
