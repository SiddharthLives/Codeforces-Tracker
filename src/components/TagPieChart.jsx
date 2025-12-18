import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function TagPieChart({ tagStats }) {
  if (!tagStats || tagStats.labels.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-200">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
          Problem Tags
        </h2>
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    );
  }

  // Generate colors for each tag
  const colors = tagStats.labels.map((_, i) => {
    const hue = (i * 137.5) % 360; // Golden angle for good distribution
    return `hsl(${hue}, 70%, 60%)`;
  });

  const data = {
    labels: tagStats.labels,
    datasets: [
      {
        label: "Problems Solved",
        data: tagStats.data,
        backgroundColor: colors,
        borderColor: colors.map((c) => c.replace("60%", "50%")),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 12,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-200">
      <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
        Problem Tags Distribution
      </h2>
      <div style={{ height: "400px" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default TagPieChart;
