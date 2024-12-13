import React from "react";
import {Chart as ChartJS} from "chart.js/auto";
import {Bar, Doughnut, Line, Pie} from "react-chartjs-2";

 const dashboard = () => {
    return (
        <div className="Container">
            <Pie
             data={{
                labels: ["Temperatura, Umidade, Luminosidade, Presenca"]
             }}
            />
            

        </div>
    )
 }