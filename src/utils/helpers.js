// Get color based on rating
export const getRatingColor = (rating) => {
  if (!rating || rating < 1200) return "#808080"; // Gray
  if (rating < 1400) return "#008000"; // Green
  if (rating < 1600) return "#03A89E"; // Cyan
  if (rating < 1900) return "#0000FF"; // Blue
  if (rating < 2100) return "#AA00AA"; // Purple
  if (rating < 2300) return "#FF8C00"; // Orange
  if (rating < 2400) return "#FF6347"; // Orange Red
  return "#FF0000"; // Red
};

// Get rank title based on rating
export const getRankTitle = (rank) => {
  const rankMap = {
    newbie: "Newbie",
    pupil: "Pupil",
    specialist: "Specialist",
    expert: "Expert",
    "candidate master": "Candidate Master",
    master: "Master",
    "international master": "International Master",
    grandmaster: "Grandmaster",
    "international grandmaster": "International Grandmaster",
    "legendary grandmaster": "Legendary Grandmaster",
  };
  return rankMap[rank?.toLowerCase()] || rank || "Unrated";
};

// Format time in seconds to readable format
export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

// Convert UNIX timestamp to date string
export const timestampToDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString();
};

// Get unique problems from submissions
export const getUniqueProblems = (submissions) => {
  const problemSet = new Set();
  return submissions.filter((sub) => {
    const key = `${sub.problem.contestId}-${sub.problem.index}`;
    if (!problemSet.has(key)) {
      problemSet.add(key);
      return true;
    }
    return false;
  });
};
