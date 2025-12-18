import { useMemo } from "react";

function ContestProblems({ contests, submissions }) {
  const contestData = useMemo(() => {
    if (!contests || !submissions) return [];

    return contests.slice(0, 20).map((contest) => {
      const contestSubs = submissions.filter((s) => s.contestId === contest.id);

      // Get unique problems from this contest
      const problems = [];
      const problemSet = new Set();

      contestSubs.forEach((sub) => {
        const key = sub.problem.index;
        if (!problemSet.has(key)) {
          problemSet.add(key);

          // Determine status
          let status = "not-attempted";
          const allAttempts = contestSubs.filter(
            (s) => s.problem.index === key
          );
          const hasSolved = allAttempts.some((s) => s.verdict === "OK");

          if (hasSolved) {
            status = "solved";
          } else if (allAttempts.length > 0) {
            status = "wrong";
          }

          problems.push({
            index: key,
            status: status,
          });
        }
      });

      // Sort problems by index
      problems.sort((a, b) => a.index.localeCompare(b.index));

      return {
        id: contest.id,
        name: contest.name,
        problems: problems,
      };
    });
  }, [contests, submissions]);

  const getStatusColor = (status) => {
    switch (status) {
      case "solved":
        return "bg-green-500 text-white";
      case "wrong":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-800 text-white";
    }
  };

  if (contestData.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-500">No contests found for this category</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Contests</h3>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {contestData.map((contest) => (
          <div key={contest.id} className="border-b pb-3">
            <div className="text-sm font-medium text-gray-700 mb-2">
              {contest.name}
            </div>
            <div className="flex flex-wrap gap-2">
              {contest.problems.length > 0 ? (
                contest.problems.map((prob) => (
                  <span
                    key={prob.index}
                    className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(
                      prob.status
                    )}`}
                  >
                    {prob.index}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">No submissions</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContestProblems;
