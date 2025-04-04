import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { validarVacíos, verificarFechaExpiracion, verificarNumeros } from "../validaciones";
import { fetchBuyCoupon } from "../hooks/fetchBuyCoupon";

export default function PasarelaPago() {
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolderName, setCardHolderName] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const {offerId} = useParams();

    const handleCardNumberChange = (e) => {
        const value = e.target.value;
        setCardNumber(value);
        if (value.length !== 16) {
            setErrorMessage("El número de tarjeta debe tener 16 dígitos.");
        } else {
            setErrorMessage("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const couponCode = await fetchBuyCoupon(offerId);

        let errores = [];
        if (validarVacíos(cardNumber)) errores.push(validarVacíos(cardNumber));
        if (validarVacíos(cardHolderName)) errores.push(validarVacíos(cardHolderName));
        if (validarVacíos(expirationDate)) errores.push(validarVacíos(expirationDate));
        if (validarVacíos(cvv)) errores.push(validarVacíos(cvv));
        if (verificarNumeros(cvv)) errores.push(verificarNumeros(cvv));
        if (verificarNumeros(cardNumber)) errores.push(verificarNumeros(cardNumber));

        if (errores.length > 0) {
            setErrorMessage(errores.join(" | "));
            return;
        }

        if (offerId) {
            console.log(couponCode)
            navigate(`/detalleCupon/${couponCode}`);
        } else {
            console.error("offerId no encontrado.");
        }
    };

    const handleExpirationDateChange = (e) => {
        const value = e.target.value;
        setExpirationDate(value);
        const error = verificarFechaExpiracion(value);
        setErrorMessage(error);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center p-5">
            <div className="bg-white shadow-lg rounded-lg max-w-lg w-full p-6">
                <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">Formulario de Compra de Cupón</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        {/* Número de tarjeta */}
                        <div>
                            <label htmlFor="num_tarjeta" className="text-sm font-medium text-gray-600">Número de tarjeta</label>
                            <input
                                id="num_tarjeta"
                                type="text"
                                pattern="[0-9]{16}"
                                placeholder="xxxx-xxxx-xxxx-xxxx"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                required
                                className="block w-full mt-2 p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Mensaje de error */}
                        {errorMessage && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                {errorMessage}
                            </div>
                        )}

                        {/* Nombre del titular */}
                        <div>
                            <label htmlFor="nombre" className="text-sm font-medium text-gray-600">Nombre del titular (como aparece en la tarjeta)</label>
                            <input
                                id="nombre"
                                type="text"
                                value={cardHolderName}
                                onChange={(e) => setCardHolderName(e.target.value)}
                                pattern="[^\d]*"
                                required
                                className="block w-full mt-2 p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Fecha de expiración y CVV */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="fecha_exp" className="text-sm font-medium text-gray-600">Vence</label>
                                <input
                                    id="fecha_exp"
                                    type="month"
                                    value={expirationDate}
                                    onChange={handleExpirationDateChange}
                                    required
                                    className="block w-full mt-2 p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="cvv" className="text-sm font-medium text-gray-600">CVV*</label>
                                <input
                                    type="password"
                                    id="cvv"
                                    placeholder="•••"
                                    pattern="[0-9]{3}"
                                    min="100"
                                    max="999"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    required
                                    className="block w-full mt-2 p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Botón de envío */}
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Finalizar compra
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
