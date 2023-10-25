import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { listSolicitudes } from "../services/turno.services";
import { listMunicipio } from "../services/municipio.services";
import Chart from "chart.js/auto";
import "../styles/DashboardStyle.css";

const Dashboard = () => {
  const [solicitudesData, setSolicitudesData] = useState({
    pendiente: 0,
    realizado: 0,
  });
  const [selectedMunicipio, setSelectedMunicipio] = useState(null);
  const [municipios, setMunicipios] = useState([]);

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

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        const response = await listMunicipio();
        const data = await response.json();
        setMunicipios(data);
      } catch (error) {
        console.error("Error al obtener la lista de municipios:", error);
      }
    };

    fetchMunicipios();
  }, []); // Este efecto se ejecuta una vez al cargar el componente

  const handleMunicipioChange = async (idMunicipio) => {
    try {
      const API = "https://apiticketturno-production.up.railway.app";
      const response = await fetch(
        `${API}/turno/statusPorMunicipio/${idMunicipio}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setSolicitudesData({
        pendiente: parseInt(data.pendiente),
        realizado: parseInt(data.realizado),
      });
    } catch (error) {
      console.error(
        "Error al obtener datos de solicitudes por municipio:",
        error
      );
    }
  };

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
      <h1>Dashboard de Solicitudes</h1>
      <select onChange={(e) => handleMunicipioChange(e.target.value)}>
        <option value="">Selecciona un municipio</option>
        {municipios.map((municipio) => (
          <option key={municipio.idMunicipio} value={municipio.idMunicipio}>
            {municipio.nombre}
          </option>
        ))}
      </select>
      {solicitudesData && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default Dashboard;
