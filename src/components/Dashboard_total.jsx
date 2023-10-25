import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { listSolicitudes } from "../services/turno.services";
import Chart from "chart.js/auto";
import "../styles/DashboardStyle.css";

const Dashboard_total = () => {
  const [solicitudesData, setSolicitudesData] = useState({
    pendiente: 0,
    realizado: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listSolicitudes();
        const data = await response.json();
        setSolicitudesData({
          pendiente: parseInt(data.pendiente),
          realizado: parseInt(data.realizado),
        });
      } catch (error) {
        console.error("Error al obtener datos de solicitudes:", error);
      }
    };

    fetchData();
  }, []); // Este efecto se ejecuta una vez al cargar el componente

  const chartData = {
    labels: ["Pendientes", "Realizadas"],
    datasets: [
      {
        label: "Total de Solicitudes",
        data: [solicitudesData.pendiente, solicitudesData.realizado],
        backgroundColor: ["#FF5733", "#33FF49"], // Colores para las barras
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard con todas las Solicitudes</h1>
      {solicitudesData && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default Dashboard_total;
