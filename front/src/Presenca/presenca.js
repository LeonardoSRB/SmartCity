import React, {useEffect, useState} from "react";
import "./presenca.css";
import presencaImage from "../images/presenca_logo.png";
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

const Presenca = () => { 
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

                const response = await fetch('http://127.0.0.1:8000/api/contador/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Adiciona o token no cabeçalho da requisição
                        'Content-Type': 'application/json', // Indica que o tipo de conteúdo da requisição é JSON
                    },
                });

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
        <h1 id="titulo_presenca">Presença</h1>
        <table id="tabela_presenca">
            <thead id="cabeca_tabela_presenca">
                <tr>
                    <th>ID do sensor</th>
                    <th>Presença</th>
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
        <div id="presenca_logo">
        <img src={presencaImage} alt="pessoas"></img>
        </div>
        <Line
        data={{
            labels: dados.map((item) => item.timestamp),
            datasets: [
                {
                    label: "Presença",
                    data: dados.map((item) => item.valor),
                    backgroundColor: "#00bf63",
                    borderColor: "#00bf63"
                }
            ]
        }

        }
        />
    </div>
    );
};

export default Presenca