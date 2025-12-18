import { useMemo, useState } from "react";

function ContestProblems({ contests, submissions }) {
  const [searchQuery, setSearchQuery] = useState("");

  const contestData = useMemo(() => {
    if (!contests || !submissions) return [];

    return contests.slice(0, 50).map((contest) => {
      const contestSubs = submissions.filter((s) => s.contestId === contest.id);

      // Get unique problems from this contest mapped by index
      const problemsMap = {};

      contestSubs.forEach((sub) => {
        const key = sub.problem.index;
        if (!problemsMap[key]) {
          // Determine status
          const allAttempts = contestSubs.filter(
            (s) => s.problem.index === key
          );
          const hasSolved = allAttempts.some((s) => s.verdict === "OK");

          let status = "not-attempted";
          if (hasSolved) {
            status = "solved";
          } else if (allAttempts.length > 0) {
            status = "wrong";
          }

          problemsMap[key] = {
            index: key,
            name: sub.problem.name,
            rating: sub.problem.rating || "N/A",
            status: status,
          };
        }
      });

      return {
        id: contest.id,
        name: contest.name,
        problemsMap: problemsMap,
      };
    });
  }, [contests, submissions]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return contestData;
    return contestData.filter((contest) =>
      contest.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [contestData, searchQuery]);

  const getStatusColor = (status) => {
    switch (status) {
      case "solved":
        return "text-green-600 dark:text-green-400";
      case "wrong":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  // Get all unique problem indices across all contests
  const allProblemIndices = useMemo(() => {
    const indices = new Set();
    filteredData.forEach((contest) => {
      Object.keys(contest.problemsMap).forEach((idx) => indices.add(idx));
    });
    return Array.from(indices).sort();
  }, [filteredData]);

  if (contestData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-colors duration-200">
        <p className="text-gray-500 dark:text-gray-400">
          No contests found for this category
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-colors duration-200">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search contests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left p-2 font-medium text-gray-700 dark:text-gray-300">
                #
              </th>
              <th className="text-left p-2 font-medium text-gray-700 dark:text-gray-300 min-w-[200px]">
                Contest
              </th>
              {allProblemIndices.map((idx) => (
                <th
                  key={idx}
                  className="text-center p-2 font-medium text-gray-700 dark:text-gray-300 min-w-[120px]"
                >
                  {idx}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((contest, index) => (
              <tr
                key={contest.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="p-2 text-gray-600 dark:text-gray-400">
                  {index + 1}
                </td>
                <td className="p-2 text-gray-700 dark:text-gray-300 font-medium">
                  {contest.name}
                </td>
                {allProblemIndices.map((idx) => {
                  const problem = contest.problemsMap[idx];
                  return (
                    <td key={idx} className="p-2 text-center">
                      {problem ? (
                        <a
                          href={`https://codeforces.com/contest/${contest.id}/problem/${idx}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block hover:underline font-medium ${getStatusColor(
                            problem.status
                          )}`}
                          title={`${problem.name} (${problem.rating})`}
                        >
                          <div>
                            {idx}. {problem.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            ({problem.rating})
                          </div>
                        </a>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-600">
                          N/A
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No contests found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
}

export default ContestProblems;
