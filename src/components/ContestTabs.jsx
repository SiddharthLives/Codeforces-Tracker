import { useState } from "react";
import { filterContestsByType } from "../utils/analytics";

const CONTEST_TYPES = [
  "Div1",
  "Div2",
  "Div3",
  "Div1+Div2",
  "Global",
  "Educational",
];

function ContestTabs({ contests, submissions, onSelectContest }) {
  const [activeTab, setActiveTab] = useState("Div2");

  const handleTabClick = (type) => {
    setActiveTab(type);
    const filtered = filterContestsByType(contests, type);
    onSelectContest(filtered);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Contest Analytics</h2>
      <div className="flex flex-wrap gap-2">
        {CONTEST_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => handleTabClick(type)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ContestTabs;
