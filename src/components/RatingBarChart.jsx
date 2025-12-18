import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function RatingBarChart({ ratingStats }) {
  if (!ratingStats || ratingStats.data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-colors duration-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Problems by Rating
        </h2>
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    );
  }

  const data = {
    labels: ratingStats.labels,
    datasets: [
      {
        label: "Problems Solved",
        data: ratingStats.data,
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return `Rating: ${context[0].label}`;
          },
          label: function (context) {
            return `Problems: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Number of Problems",
        },
      },
      x: {
        title: {
          display: true,
          text: "Problem Rating",
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-colors duration-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Problems Solved by Rating
      </h2>
      <div style={{ height: "400px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default RatingBarChart;
