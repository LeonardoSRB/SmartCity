import React, {useEffect, useState} from "react";
import "./temperatura.css";
import temperatureImage from "../images/temperatura_logo.png";
import {Line} from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

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

                const limitedData = data.slice(0, 20);  // Limita os dados a 20 itens

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
                    <th>ID do Sensor</th>
                    <th>Temperatura</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody id="corpo_tabela">
                {dados.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.valor}</td>
                        <td>{item.timestamp}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        <div id="temperatura_logo">
        <img src={temperatureImage} alt="termometro"></img>
        </div>
        <Line
        data={{
            labels: dados.map((item) => item.timestamp),
            datasets: [
                {
                    label: "Temperatura",
                    data: dados.map((item) => item.valor),
                    backgroundColor: "#ff3131",
                    borderColor: "#ff3131"
                }
            ]
        }

        }
        />
    </div>
    );
};

export default Temperatura