import { formatTime } from "../utils/helpers";

function RatingAnalytics({ ratingAnalytics, div2TimeStats }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-colors duration-200">
      <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-gray-100">
        Rating Analytics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
            Peak Rating
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {ratingAnalytics.peak || "N/A"}
          </div>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
            Max Rise
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            +{ratingAnalytics.maxRise || 0}
          </div>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
            Max Drop
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {ratingAnalytics.maxDrop || 0}
          </div>
        </div>
      </div>

      {div2TimeStats && (
        <>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Div-2 Average Solve Time
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                Problem A
              </div>
              <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {div2TimeStats.avgA > 0
                  ? formatTime(div2TimeStats.avgA)
                  : "N/A"}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {div2TimeStats.countA} contests
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                Problem B
              </div>
              <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
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
