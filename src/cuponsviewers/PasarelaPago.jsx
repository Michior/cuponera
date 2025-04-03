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
        <div className="bg-fondo shadow-md h-screen m-0 p-3">
            <div className="container mx-auto p-4 bg-gray-800 rounded-lg shadow-lg max-w-2xl mt-5 m-3">
                <h2 className="text-3xl text-center text-white font-extrabold mb-4">Formulario de Compra de cupón</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="num_tarjeta" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white text-stone-50">Número de tarjeta</label>
                    <input
                        id="num_tarjeta"
                        type="text"
                        pattern="[0-9]{16}"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        required
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    />
                    {errorMessage && (
                        <div className="w-full">
                            <span className="block w-full bg-white border-l-4 border-resaltador text-resaltador p-2 mt-2" role="alert">{errorMessage}</span>
                        </div>
                    )}
    
                    <label htmlFor="nombre" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white mt-2 text-stone-50">Nombre del titular (como aparece en la tarjeta)</label>
                    <input
                        id="nombre"
                        type="text"
                        value={cardHolderName}
                        onChange={(e) => setCardHolderName(e.target.value)}
                        pattern="[^\d]*"
                        required
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    />
    
                    <div className="exp_cvv">
                        <div>
                            <label htmlFor="fecha_exp" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white mt-2 text-stone-50">Vence</label>
                            <input
                                id="fecha_exp"
                                type="month"
                                value={expirationDate}
                                onChange={handleExpirationDateChange}
                                required
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="cvv" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white mt-2 text-stone-50">CVV*</label>
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
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                            />
                        </div>
                    </div>
                    <br />
                    <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-fondo px-5 py-2.5 text-sm font-medium hover:bg-resaltador focus:outline-none focus:ring-4 focus:ring-white hover:text-white">Finalizar compra</button>
                </form>
            </div>
        </div>
    );    
}
