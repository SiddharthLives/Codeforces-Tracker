function ProblemCell({ problem, contestId, submissionsMap }) {
  if (!problem) {
    return (
      <td className="p-3 text-center">
        <span className="text-gray-400 dark:text-gray-600">-</span>
      </td>
    );
  }

  const { index, name, rating } = problem;
  const submissionKey = `${contestId}_${index}`;
  const submissions = submissionsMap[submissionKey] || [];
  const isSolved = submissions.some((s) => s.verdict === "OK");

  // Get color based on rating
  const getRatingColor = (rating) => {
    if (!rating) return "text-gray-500 dark:text-gray-400";
    if (rating < 1200) return "text-gray-500 dark:text-gray-400";
    if (rating < 1400) return "text-green-600 dark:text-green-500";
    if (rating < 1600) return "text-cyan-600 dark:text-cyan-500";
    if (rating < 1900) return "text-blue-600 dark:text-blue-500";
    if (rating < 2100) return "text-purple-600 dark:text-purple-500";
    if (rating < 2300) return "text-orange-600 dark:text-orange-500";
    return "text-red-600 dark:text-red-500";
  };

  const colorClass = getRatingColor(rating);
  const borderClass = isSolved
    ? "border-2 border-green-500 dark:border-green-400"
    : "border-2 border-transparent";

  const truncateName = (name, maxLength = 20) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + "...";
  };

  return (
    <td className="p-3 text-center">
      <a
        href={`https://codeforces.com/contest/${contestId}/problem/${index}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex flex-col items-center justify-center px-3 py-2 rounded w-[140px] min-h-[72px] ${borderClass} hover:opacity-80 transition-opacity`}
        title={`${name} (${rating || "N/A"})`}
      >
        <div className={`text-xs font-medium ${colorClass} w-full`}>
          <div className="font-semibold">{index}</div>
          <div className="truncate max-w-full mt-0.5">{truncateName(name)}</div>
          <div className="text-[10px] opacity-80">({rating || "N/A"})</div>
        </div>
      </a>
    </td>
  );
}

export default ProblemCell;
