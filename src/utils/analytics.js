import { getUniqueProblems } from "./helpers";

// Process tag statistics from submissions
export const processTagStats = (submissions) => {
  const acceptedSubs = submissions.filter((sub) => sub.verdict === "OK");
  const uniqueProblems = getUniqueProblems(acceptedSubs);

  const tagCount = {};
  uniqueProblems.forEach((sub) => {
    if (sub.problem.tags) {
      sub.problem.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    }
  });

  // Sort by count descending
  const sorted = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);

  return {
    labels: sorted.map(([tag]) => tag),
    data: sorted.map(([, count]) => count),
  };
};

// Process rating-wise problem stats
export const processRatingStats = (submissions) => {
  const acceptedSubs = submissions.filter((sub) => sub.verdict === "OK");
  const uniqueProblems = getUniqueProblems(acceptedSubs);

  const ratingCount = {};
  uniqueProblems.forEach((sub) => {
    const rating = sub.problem.rating;
    if (rating) {
      ratingCount[rating] = (ratingCount[rating] || 0) + 1;
    }
  });

  // Create array for ratings 800-3500 in steps of 100
  const labels = [];
  const data = [];
  for (let r = 800; r <= 3500; r += 100) {
    labels.push(r.toString());
    data.push(ratingCount[r] || 0);
  }

  return { labels, data };
};

// Process heatmap data for current year
export const processHeatmapData = (submissions) => {
  const currentYear = new Date().getFullYear();
  const dailyCount = {};

  submissions.forEach((sub) => {
    const date = new Date(sub.creationTimeSeconds * 1000);
    if (date.getFullYear() === currentYear) {
      const dateStr = date.toISOString().split("T")[0];
      dailyCount[dateStr] = (dailyCount[dateStr] || 0) + 1;
    }
  });

  return dailyCount;
};

// Calculate average time to solve A and B in Div-2 contests
export const calculateAvgTimeForDiv2 = (contests, submissions) => {
  const div2Contests = contests.filter(
    (c) => c.name.includes("Div. 2") && c.phase === "FINISHED"
  );

  const timesA = [];
  const timesB = [];

  div2Contests.forEach((contest) => {
    const contestId = contest.id;
    const startTime = contest.startTimeSeconds;

    const contestSubs = submissions.filter(
      (s) => s.contestId === contestId && s.verdict === "OK"
    );

    // Find first AC for problem A
    const solvedA = contestSubs.find((s) => s.problem.index === "A");
    if (solvedA) {
      const timeA = solvedA.creationTimeSeconds - startTime;
      if (timeA > 0) timesA.push(timeA);
    }

    // Find first AC for problem B
    const solvedB = contestSubs.find((s) => s.problem.index === "B");
    if (solvedB) {
      const timeB = solvedB.creationTimeSeconds - startTime;
      if (timeB > 0) timesB.push(timeB);
    }
  });

  const avgA =
    timesA.length > 0 ? timesA.reduce((a, b) => a + b, 0) / timesA.length : 0;
  const avgB =
    timesB.length > 0 ? timesB.reduce((a, b) => a + b, 0) / timesB.length : 0;

  return { avgA, avgB, countA: timesA.length, countB: timesB.length };
};

// Calculate rating analytics
export const calculateRatingAnalytics = (ratingHistory) => {
  if (!ratingHistory || ratingHistory.length === 0) {
    return { peak: 0, maxRise: 0, maxDrop: 0 };
  }

  let peak = 0;
  let maxRise = 0;
  let maxDrop = 0;

  ratingHistory.forEach((contest) => {
    peak = Math.max(peak, contest.newRating);
    const change = contest.newRating - contest.oldRating;
    maxRise = Math.max(maxRise, change);
    maxDrop = Math.min(maxDrop, change);
  });

  return { peak, maxRise, maxDrop };
};

// Filter contests by type
export const filterContestsByType = (contests, type) => {
  const patterns = {
    Div1: /Div\.\s*1(?!\+)/i,
    Div2: /Div\.\s*2(?!\+)/i,
    Div3: /Div\.\s*3/i,
    "Div1+Div2": /Div\.\s*1\s*\+\s*Div\.\s*2/i,
    Global: /Global/i,
    Educational: /Educational/i,
  };

  return contests.filter(
    (c) => c.phase === "FINISHED" && patterns[type]?.test(c.name)
  );
};
