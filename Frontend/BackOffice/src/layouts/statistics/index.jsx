/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";

// Import MUI components
import Grid from "@mui/material/Grid";

// Import Material Dashboard 2 React components
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Chart } from "chart.js";
import API_URLS from "apiUrls";

function Statistics() {
  // State to store role statistics
  const [roleStatistics, setRoleStatistics] = useState([]);
  // State to store total number of users
  const [totalUsers, setTotalUsers] = useState(0);

  // Function to fetch role statistics and total number of users from the server
  const fetchData = async () => {
    try {
      // Fetch role statistics
      const roleStatsResponse = await axios.get(API_URLS.userRoleStatistics);
      setRoleStatistics(roleStatsResponse.data);

      // Fetch total number of users
      const totalUsersResponse = await axios.get(API_URLS.totalUsers);
      setTotalUsers(totalUsersResponse.data.totalUsers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Effect to fetch role statistics and total number of users when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Effect to render the charts when role statistics or total number of users change
  useEffect(() => {
    renderCharts();
  }, [roleStatistics, totalUsers]);

  // Function to render both pie and bar charts
  const renderCharts = () => {
    renderBarChart();
  };

 

  // Function to render the role statistics bar chart
  const renderBarChart = () => {
    const ctx = document.getElementById("roleBarChart");

    if (ctx) {
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: roleStatistics.map((stat) => stat._id),
          datasets: [
            {
              label: 'Role Count',
              data: roleStatistics.map((stat) => stat.count),
              backgroundColor: [
                "#FF5733", // Vivid Red
                "#E82227", // Dark Red
                "#FFAF9F", // Rose
                "#F99999", // Coral Red
                "#FA8072", // Light Salmon
                "#F08080", // Light Coral
              ],
            },
          ],
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
          },
        },
      });
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3} className="graph-container">
          <h2>User Statistics</h2>
          <p>Total Users: {totalUsers}</p>
          <div className="graph-wrapper">
            <canvas id="roleBarChart"></canvas> {/* New canvas for the bar chart */}
          </div>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Statistics;
