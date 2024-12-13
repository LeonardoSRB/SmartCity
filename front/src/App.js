import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home"; 
import Login from "./login/sign_in";
import Register from "./login/sign_up";
import Temperatura from "./Temperatura/temperatura";
import Umidade from "./Umidade/umidade";
import Luminosidade from "./luminosidade/luminosidade";
import Presenca from "./Presenca/presenca"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/temperatura/" element={<Temperatura />} />
        <Route path="/umidade/" element={<Umidade />}/>
        <Route path="/luminosidade/" element={<Luminosidade/>}/>
        <Route path="/presenca/" element={<Presenca/>}/>
      </Routes>
    </Router>
  );
};

export default App;