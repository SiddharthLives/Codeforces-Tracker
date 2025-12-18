import ContestRow from "./ContestRow";

function ContestTable({
  contests,
  contestProblems,
  submissionsMap,
  loadingContests,
}) {
  // Get all unique problem indices
  const allProblemIndices = [
    ...new Set(
      contests.flatMap((contest) =>
        (contestProblems[contest.id] || []).map((p) => p.index)
      )
    ),
  ].sort();

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-50 dark:bg-gray-900 z-10">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="sticky left-0 bg-gray-50 dark:bg-gray-900 text-left p-3 font-medium text-gray-700 dark:text-gray-300 min-w-[60px] border-r border-gray-200 dark:border-gray-700">
                #
              </th>
              <th className="sticky left-[60px] bg-gray-50 dark:bg-gray-900 text-left p-3 font-medium text-gray-700 dark:text-gray-300 min-w-[300px] border-r border-gray-200 dark:border-gray-700">
                Contest
              </th>
              {allProblemIndices.map((idx) => (
                <th
                  key={idx}
                  className="text-center p-3 font-medium text-gray-700 dark:text-gray-300 min-w-[140px]"
                >
                  {idx}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <ContestRow
                key={contest.id}
                contest={contest}
                index={index + 1}
                problems={contestProblems[contest.id]}
                submissionsMap={submissionsMap}
                isLoading={loadingContests.has(contest.id)}
                allProblemIndices={allProblemIndices}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContestTable;
