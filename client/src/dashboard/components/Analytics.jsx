import { useEffect, useState } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  Filler,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  Filler
);

const Analytics = ({ orders = [] }) => {
  const [revenueData, setRevenueData] = useState({});
  const [statusDistribution, setStatusDistribution] = useState({});
  const [paymentDistribution, setPaymentDistribution] = useState({});

  useEffect(() => {
    // Create last 7 days revenue structure
    const revenueMap = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split("T")[0];
      revenueMap[key] = 0;
    }

    const statusMap = {};
    const paymentMap = {};

    orders.forEach((order) => {
      const dateKey = new Date(order.date).toISOString().split("T")[0];
      if (revenueMap[dateKey] !== undefined) {
        revenueMap[dateKey] += parseFloat(order.total || 0);
      }

      statusMap[order.status] = (statusMap[order.status] || 0) + 1;
      paymentMap[order.payment] = (paymentMap[order.payment] || 0) + 1;
    });

    const labels = Object.keys(revenueMap).map((date) => {
      const d = new Date(date);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    });

    setRevenueData({
      labels,
      data: Object.values(revenueMap),
    });

    setStatusDistribution(statusMap);
    setPaymentDistribution(paymentMap);
  }, [orders]);

  useEffect(() => {
    if (
      revenueData.labels &&
      Object.keys(statusDistribution).length > 0 &&
      Object.keys(paymentDistribution).length > 0
    ) {
      createCharts();
    }
  }, [revenueData, statusDistribution, paymentDistribution]);

  const createCharts = () => {
    Chart.getChart("revenueChart")?.destroy();
    Chart.getChart("statusChart")?.destroy();
    Chart.getChart("paymentChart")?.destroy();

    const revenueCtx = document.getElementById("revenueChart");
    if (revenueCtx && revenueData.labels) {
      new Chart(revenueCtx, {
        type: "line",
        data: {
          labels: revenueData.labels,
          datasets: [
            {
              label: "Daily Revenue",
              data: revenueData.data,
              borderColor: "#6366f1",
              backgroundColor: "rgba(99, 102, 241, 0.1)",
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#6366f1",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 6,
              pointHoverRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: { display: false },
              border: { display: false },
            },
            y: {
              grid: { color: "rgba(0, 0, 0, 0.05)" },
              border: { display: false },
              ticks: {
                callback: function (value) {
                  return "₹" + value.toLocaleString();
                },
              },
            },
          },
        },
      });
    }

    const statusCtx = document.getElementById("statusChart");
    if (statusCtx && Object.keys(statusDistribution).length > 0) {
      new Chart(statusCtx, {
        type: "doughnut",
        data: {
          labels: Object.keys(statusDistribution),
          datasets: [
            {
              data: Object.values(statusDistribution),
              backgroundColor: [
                "#6366f1",
                "#f59e0b",
                "#10b981",
                "#ef4444",
                "#6b7280",
              ],
              borderWidth: 0,
              hoverOffset: 10,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "65%",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 20,
                usePointStyle: true,
                font: { size: 12 },
              },
            },
          },
        },
      });
    }

    const paymentCtx = document.getElementById("paymentChart");
    if (paymentCtx && Object.keys(paymentDistribution).length > 0) {
      new Chart(paymentCtx, {
        type: "doughnut",
        data: {
          labels: Object.keys(paymentDistribution),
          datasets: [
            {
              data: Object.values(paymentDistribution),
              backgroundColor: ["#10b981", "#fbbf24", "#ef4444", "#6b7280"],
              borderWidth: 0,
              hoverOffset: 10,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "65%",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 20,
                usePointStyle: true,
                font: { size: 12 },
              },
            },
          },
        },
      });
    }
  };

  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <article className="rounded-md bg-white p-6 shadow">
        <header className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Order Status Distribution
          </h3>
        </header>
        <div className="h-64">
          <canvas id="statusChart"></canvas>
        </div>
      </article>

      <article className="rounded-md bg-white p-6 shadow">
        <header className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Payment Status Distribution
          </h3>
        </header>
        <div className="h-64">
          <canvas id="paymentChart"></canvas>
        </div>
      </article>

      <article className="rounded-md bg-white p-6 shadow col-span-1 lg:col-span-2">
        <header className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
          <p className="text-gray-500">Past 7 days</p>
        </header>
        <div className="h-64">
          <canvas id="revenueChart"></canvas>
        </div>
      </article>
    </section>
  );
};

export default Analytics;
