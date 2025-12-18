import { formatTime } from "../utils/helpers";

function RatingAnalytics({ ratingAnalytics, div2TimeStats }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-200">
      <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
        Rating Analytics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Peak Rating
          </div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {ratingAnalytics.peak || "N/A"}
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Max Rise
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            +{ratingAnalytics.maxRise || 0}
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Max Drop
          </div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {ratingAnalytics.maxDrop || 0}
          </div>
        </div>
      </div>

      {div2TimeStats && (
        <>
          <h3 className="text-lg font-semibold mb-3 dark:text-gray-100">
            Div-2 Average Solve Time
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Problem A
              </div>
              <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {div2TimeStats.avgA > 0
                  ? formatTime(div2TimeStats.avgA)
                  : "N/A"}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {div2TimeStats.countA} contests
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Problem B
              </div>
              <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {div2TimeStats.avgB > 0
                  ? formatTime(div2TimeStats.avgB)
                  : "N/A"}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {div2TimeStats.countB} contests
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RatingAnalytics;
