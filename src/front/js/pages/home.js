import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import pastillas from "../../img/pastillas.webp";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [medicamento, setMedicamento] = useState("");
    const [resultado, setResultado] = useState(null);

    // Esta función maneja el envío del formulario
    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/entry/${medicamento}`);
        const data = await response.json();
        setResultado(data);
    };

    return (
        <div className="text-center mt-5">
            <h1> Mis Medicamentos</h1>
            <p>
                <img src={pastillas} />
            </p>

            {/* Aquí agregamos el formulario */}
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={medicamento}
                    onChange={(e) => setMedicamento(e.target.value)}
                    placeholder="Ingrese nombre del medicamento"
                />
                <button type="submit">Buscar</button>
            </form>

            {/* Aquí mostramos el resultado */}
            {resultado && (
                <div>
                    {/* Ajusta esto según cómo quieras mostrar los datos */}
                    <pre>{JSON.stringify(resultado, null, 2)}</pre>
                </div>
            )}

            <div className="alert alert-info">
                {store.message || "Loading message from the backend (make sure your python backend is running)..."}
            </div>
            <p>
                This boilerplate comes with lots of documentation:{" "}
                <a href="https://start.4geeksacademy.com/starters/react-flask">
                    Read documentation
                </a>
            </p>
        </div>
    );
};