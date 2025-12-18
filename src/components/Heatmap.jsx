import { useMemo } from "react";

function Heatmap({ heatmapData }) {
  const currentYear = new Date().getFullYear();

  const { grid, maxCount } = useMemo(() => {
    if (!heatmapData) return { grid: [], maxCount: 0 };

    // Get all dates in current year
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date();

    const dateArray = [];
    let maxCount = 0;

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = d.toISOString().split("T")[0];
      const count = heatmapData[dateStr] || 0;
      maxCount = Math.max(maxCount, count);

      dateArray.push({
        date: dateStr,
        count: count,
        day: d.getDay(),
        week: Math.floor((d - startDate) / (7 * 24 * 60 * 60 * 1000)),
      });
    }

    return { grid: dateArray, maxCount };
  }, [heatmapData, currentYear]);

  const getColor = (count) => {
    if (count === 0) return "#ebedf0";
    const intensity = Math.min(count / Math.max(maxCount, 1), 1);
    if (intensity < 0.25) return "#9be9a8";
    if (intensity < 0.5) return "#40c463";
    if (intensity < 0.75) return "#30a14e";
    return "#216e39";
  };

  const weeks = useMemo(() => {
    const weekMap = {};
    grid.forEach((cell) => {
      if (!weekMap[cell.week]) weekMap[cell.week] = [];
      weekMap[cell.week].push(cell);
    });
    return Object.values(weekMap);
  }, [grid]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-200">
      <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
        Submission Activity ({currentYear})
      </h2>
      <div className="overflow-x-auto">
        <div className="inline-flex gap-1">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                const cell = week.find((c) => c.day === day);
                return (
                  <div
                    key={day}
                    className="w-3 h-3 rounded-sm"
                    style={{
                      backgroundColor: cell ? getColor(cell.count) : "#ebedf0",
                    }}
                    title={
                      cell ? `${cell.date}: ${cell.count} submissions` : ""
                    }
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
          <span>Less</span>
          <div className="flex gap-1">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: "#ebedf0" }}
            />
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: "#9be9a8" }}
            />
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: "#40c463" }}
            />
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: "#30a14e" }}
            />
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: "#216e39" }}
            />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

export default Heatmap;
