import ProblemCell from "./ProblemCell";

function ContestRow({
  contest,
  index,
  problems,
  submissionsMap,
  isLoading,
  allProblemIndices,
}) {
  // Map problems by index for quick lookup
  const problemsMap = {};
  if (problems) {
    problems.forEach((p) => {
      problemsMap[p.index] = p;
    });
  }

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
      <td className="sticky left-0 bg-white dark:bg-gray-800 p-3 text-gray-600 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
        {index}
      </td>
      <td className="sticky left-[60px] bg-white dark:bg-gray-800 p-3 text-gray-700 dark:text-gray-300 font-medium border-r border-gray-200 dark:border-gray-700">
        <a
          href={`https://codeforces.com/contest/${contest.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {contest.name}
        </a>
      </td>
      {isLoading ? (
        <td
          colSpan={allProblemIndices.length}
          className="p-3 text-center text-gray-500 dark:text-gray-400"
        >
          Loading problems...
        </td>
      ) : (
        allProblemIndices.map((idx) => {
          const problem = problemsMap[idx];
          return (
            <ProblemCell
              key={idx}
              problem={problem}
              contestId={contest.id}
              submissionsMap={submissionsMap}
            />
          );
        })
      )}
    </tr>
  );
}

export default ContestRow;
