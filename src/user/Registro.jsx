import React, { useState } from "react";
import { useNavigate } from "react-router";

export const Registro = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        DUI: ""
    });

    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        for (const [key, value] of Object.entries(formData)) {
            if (!value) {
                const fieldNames = {
                    email: "Correo electrónico",
                    password: "Contraseña",
                    firstName: "Nombre",
                    lastName: "Apellido",
                    phone: "Teléfono",
                    DUI: "DUI"
                };
                setError(`Por favor, completa el campo: ${fieldNames[key]}`);
                return;
            }
        }
    
        setError("");
        setMensaje("");
    
        try {
            console.log("Enviando datos:", JSON.stringify(formData)); // <-- Verifica aquí
    
            const response = await fetch("https://apiv1.lacuponera.store/api/v1/register/client", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            });
    
            const data = await response.json();
            console.log("Respuesta del servidor:", data); // <-- Verifica la respuesta
    
            if (response.ok) {
                setMensaje("Registro exitoso.");
                setFormData({
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    phone: "",
                    DUI: ""
                });
                navigate('/cliente/login');
            } else {
                setError(data.message || "Error en el registro.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setError("No se pudo conectar con el servidor.");
        }
    };
    

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Registro de Cliente</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {mensaje && <p className="text-green-500 text-sm mb-4">{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded mt-2" placeholder="Correo electrónico" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded mt-2" placeholder="Contraseña" />
                </div>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700">Name</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded mt-2" placeholder="Nombre" />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700">Lastname</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded mt-2" placeholder="Apellido" />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700">Phone</label>
                    <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded mt-2" placeholder="Teléfono" />
                </div>
                <div className="mb-4">
                    <label htmlFor="DUI" className="block text-gray-700">DUI</label>
                    <input type="text" id="DUI" name="DUI" value={formData.DUI} onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded mt-2" placeholder="DUI" />
                </div>
                <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded">Register</button>
                {/*<button type="button" className="w-full bg-red-700 text-white py-2 rounded my-4" onClick={() => navigate('/empleado/registro')}>Registro de empleado</button>*/}
            </form>
        </div>
    );
};
