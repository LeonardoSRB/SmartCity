import React, {useEffect, useState} from "react";
import "./umidade.css";
import umidadeImage from "../images/umidade_logo.png";

const Umidade = () => { 
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

                const response = await fetch('http://127.0.0.1:8000/api/umidade/', {
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

                const limitedData = data.slice(0, 28);  // Limita os dados a 10 itens

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
    <div>
        <div id="div_tabela">
        <h1 id="titulo_umidade">Umidade</h1>
        <table id="tabela_umidade">
            <thead id="cabeca_tabela_umidade">
                <tr>
                    <th>ID</th>
                    <th>Umidade</th>
                    <th>Data</th>
                    <th>Sensor_id</th>
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
        <div id="umidade_logo">
        <img src={umidadeImage} alt="gota"></img>
        </div>
    </div>
    );
};

export default Umidade