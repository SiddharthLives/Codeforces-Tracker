import { useState, useEffect } from "react";
import HandleInput from "./components/HandleInput";
import UserHeader from "./components/UserHeader";
import TagPieChart from "./components/TagPieChart";
import RatingBarChart from "./components/RatingBarChart";
import Heatmap from "./components/Heatmap";
import ContestTabs from "./components/ContestTabs";
import ContestProblems from "./components/ContestProblems";
import RatingAnalytics from "./components/RatingAnalytics";
import {
  getUserInfo,
  getUserRating,
  getUserSubmissions,
  getContestList,
} from "./utils/api";
import {
  processTagStats,
  processRatingStats,
  processHeatmapData,
  calculateRatingAnalytics,
  calculateAvgTimeForDiv2,
} from "./utils/analytics";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [tagStats, setTagStats] = useState(null);
  const [ratingStats, setRatingStats] = useState(null);
  const [heatmapData, setHeatmapData] = useState(null);
  const [ratingAnalytics, setRatingAnalytics] = useState(null);
  const [div2TimeStats, setDiv2TimeStats] = useState(null);
  const [contests, setContests] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedContests, setSelectedContests] = useState([]);

  useEffect(() => {
    console.log("Dark mode changed to:", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    console.log("Toggle clicked, current darkMode:", darkMode);
    setDarkMode((prev) => !prev);
  };

  const handleSubmit = async (handle) => {
    setLoading(true);
    setError("");
    setUserInfo(null);
    setTagStats(null);
    setRatingStats(null);
    setHeatmapData(null);
    setRatingAnalytics(null);
    setDiv2TimeStats(null);

    try {
      // Fetch all data
      const [user, rating, subs, contestList] = await Promise.all([
        getUserInfo(handle),
        getUserRating(handle).catch(() => []), // Handle unrated users
        getUserSubmissions(handle),
        getContestList(),
      ]);

      setUserInfo(user);
      setSubmissions(subs);
      setContests(contestList);

      // Process statistics
      const tags = processTagStats(subs);
      const ratings = processRatingStats(subs);
      const heatmap = processHeatmapData(subs);
      const ratingStats = calculateRatingAnalytics(rating);
      const div2Stats = calculateAvgTimeForDiv2(contestList, subs);

      setTagStats(tags);
      setRatingStats(ratings);
      setHeatmapData(heatmap);
      setRatingAnalytics(ratingStats);
      setDiv2TimeStats(div2Stats);
    } catch (err) {
      setError(
        err.message ||
          "Failed to fetch data. Please check the handle and try again."
      );
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Codeforces Analytics Dashboard
            </h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Analyze your Codeforces performance and track your progress
          </p>
        </div>

        <HandleInput onSubmit={handleSubmit} />

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {userInfo && !loading && (
          <div className="space-y-6">
            <UserHeader userInfo={userInfo} />

            {ratingAnalytics && (
              <RatingAnalytics
                ratingAnalytics={ratingAnalytics}
                div2TimeStats={div2TimeStats}
              />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TagPieChart tagStats={tagStats} />
              <RatingBarChart ratingStats={ratingStats} />
            </div>

            <Heatmap heatmapData={heatmapData} />

            {contests.length > 0 && (
              <>
                <ContestTabs
                  contests={contests}
                  submissions={submissions}
                  onSelectContest={setSelectedContests}
                />
                <ContestProblems
                  contests={selectedContests}
                  submissions={submissions}
                />
              </>
            )}
          </div>
        )}

        {!userInfo && !loading && !error && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>Enter a Codeforces handle to view analytics</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
