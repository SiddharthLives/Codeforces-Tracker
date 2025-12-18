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
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6 transition-colors duration-200">
      <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
        Contest Analytics
      </h2>
      <div className="flex flex-wrap gap-2">
        {CONTEST_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => handleTabClick(type)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
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
