import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
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
  const [activePage, setActivePage] = useState("stats");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activePage={activePage}
        setActivePage={setActivePage}
        onFindHandle={(closeModal) => (
          <HandleInput
            onSubmit={(handle) => {
              handleSubmit(handle);
              closeModal(false);
            }}
          />
        )}
      />

      <div className="container mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 dark:border-gray-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading data...
            </p>
          </div>
        )}

        {error && (
          <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {userInfo && !loading && (
          <div className="space-y-8">
            <UserHeader userInfo={userInfo} />

            {/* Contest Analytics Page */}
            {activePage === "contest-analytics" && (
              <div className="space-y-6">
                {contests.length > 0 ? (
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
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                      No contest data available
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Stats Page */}
            {activePage === "stats" && (
              <div className="space-y-8">
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
              </div>
            )}
          </div>
        )}

        {!userInfo && !loading && !error && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Click "Find Handle" to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
