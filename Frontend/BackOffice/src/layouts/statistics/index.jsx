/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Button, CircularProgress, Paper } from '@material-ui/core';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

const StatisticsComponent = () => {
  const [statistics, setStatistics] = useState(null);
  const [showStatistics, setShowStatistics] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/candidature/statistics');
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    if (showStatistics) {
      fetchStatistics();
    }
  }, [showStatistics]);

  useEffect(() => {
    if (statistics) {
      const ctx = document.getElementById('statisticsChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Accepted', 'Rejected', 'Pending', 'Archived'],
          datasets: [{
            label: 'Candidature Statistics',
            data: [
              statistics.accepted,
              statistics.rejected,
              statistics.pending,
              statistics.archived
            ],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [statistics]);

  const handleShowStatistics = () => {
    setShowStatistics(true);
  };

  return (
    <DashboardLayout>
      <Paper elevation={3} style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Candidature Statistics</h2>
        {!showStatistics && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
           <Button
        variant="contained"
        color="primary"
        onClick={handleShowStatistics}
        sx={{ backgroundColor: "red", marginRight: "10px" }} // Bouton rouge avec un espace à droite
      >
        Voir
      </Button>
          </div>
        )}
        {showStatistics && statistics ? (
          <div style={{ height: '400px', position: 'relative' }}>
            <canvas id="statisticsChart" style={{ height: '100%' }}></canvas>
          </div>
        ) : (
          showStatistics && 
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {loading ? <CircularProgress /> : <p>Loading statistics...</p>}
          </div>
        )}
         <Button
        variant="contained"
        color="secondary"
        onClick={() => window.history.back()}
        sx={{ backgroundColor: "grey" }} // Bouton gris
      >
        Retour
      </Button>
      </Paper>
    </DashboardLayout>
  );
};

export default StatisticsComponent;