import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import temperaturaImage from "../images/temperatura_logo.png"
import umidadeImage from "../images/umidade_logo.png";
import luminosidadeImage from "../images/luminosidade_logo.png";
import presencaImage from "../images/presenca_logo.png";


const App = () => {
    const navigate = useNavigate();


    return (

        <div id="sensores">
            <h1>Para dados mais específicos selecione um dos sensores</h1>
            <div id="botoes">
            <button onClick={()=>navigate("/temperatura")} class="botao" id="temperatura"> 
            <img src={temperaturaImage} alt="temperatura_logo"></img>
            Temperatura
            </button>
            <button onClick={()=>navigate("/umidade")} class="botao" id="umidade">
            <img src={umidadeImage} alt="umidade_logo"></img>
            Umidade
            </button>
            <button onClick={()=>navigate("/luminosidade")} class="botao" id="luminosidade">
            <img src={luminosidadeImage} alt="luminosidade_logo"></img>
            Luminosidade
            </button>
            <button onClick={()=>navigate("/presenca")} class="botao" id="contador">
            <img src={presencaImage} alt="presenca_logo"></img>
            Presença
            </button>
            </div>
        </div>
    );
  };
  
  export default App;