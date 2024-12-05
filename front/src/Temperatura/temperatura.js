import React, {useEffect, useState} from "react";
import "./temperatura.css";
import temperatureImage from "../images/temperatura_logo.png";
import {Chart as ChartJS} from "chart.js/auto";
import {Bar, Doughnut, Line, Pie} from "react-chartjs-2";


const Temperatura = () => { 
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const token = localStorage.getItem('accessToken'); 
                
                if (!token) {
                    throw new Error('Token não encontrado');
                }
                console.log("GamesToken: ", token)
                const response = await fetch('http://127.0.0.1:8000/api/temperatura/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Adiciona o token no cabeçalho da requisição
                        'Content-Type': 'application/json', // Indica que o tipo de conteúdo da requisição é JSON
                    },
                });
                console.log("Calvo: ", response)
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados');
                }

                const data = await response.json();

                const limitedData = data.slice(0, 20);  // Limita os dados a 10 itens

                setDados(limitedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // A requisição terminou (com sucesso ou erro)
            }
        };

        fetchDados();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>
    }

    return (
    <div id="div_pai">
        <div id="div_tabela">
        <h1 id="titulo_temperatura">Temperatura</h1>
        <table id="tabela_temperatura">
            <thead id="cabeca_tabela_temperatura">
                <tr>
                    <th>ID</th>
                    <th>Temperatura</th>
                    <th>Sensor_id</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody id="corpo_tabela">
                {dados.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.valor}</td>
                        <td>{item.timestamp}</td>
                        <td>{item.sensor}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        <div id="temperatura_logo">
        <img src={temperatureImage} alt="termometro"></img>
        </div>
        <Pie
        data={{
            labels: dados.map((item) => (item.id)),
            datasets: [
                {
                    label: "Sensor: " + item.id,
                    data: item.valor
                }
            ]
        }}
        />
        
    </div>
    );
};

export default Temperatura