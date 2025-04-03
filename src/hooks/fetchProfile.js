const obtenerPerfil = async () => {
    try {
        const response = await fetch("https://apiv1.lacuponera.store/api/v1/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}` // Asegúrate de que el token está almacenado
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener el perfil");
        }

        const perfil = await response.json();
        localStorage.setItem("client", JSON.stringify(perfil));
        console.log("Perfil guardado en localStorage", perfil);
    } catch (error) {
        console.error("Error al obtener el perfil:", error);
    }
};

// Llamar a la función al cargar la página o después del login
obtenerPerfil();