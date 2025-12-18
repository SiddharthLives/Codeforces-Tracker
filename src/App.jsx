import { useState } from "react";
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
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Codeforces Analytics Dashboard
          </h1>
          <p className="text-gray-600">
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
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
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
          <div className="text-center py-12 text-gray-500">
            <p>Enter a Codeforces handle to view analytics</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
