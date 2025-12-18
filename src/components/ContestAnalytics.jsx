import { useState, useEffect, useMemo } from "react";
import ContestTabsNew from "./ContestTabsNew";
import ContestTable from "./ContestTable";
import PaginationControls from "./PaginationControls";

const CONTESTS_PER_PAGE = 15;
const TOTAL_PAGES = 3;

function ContestAnalytics({ contests, submissions }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Div2");
  const [currentPage, setCurrentPage] = useState(1);
  const [contestProblems, setContestProblems] = useState({});
  const [loadingContests, setLoadingContests] = useState(new Set());

  // Index submissions by (contestId, problemIndex)
  const submissionsMap = useMemo(() => {
    const map = {};
    if (!submissions) return map;

    submissions.forEach((sub) => {
      const key = `${sub.contestId}_${sub.problem.index}`;
      if (!map[key]) {
        map[key] = [];
      }
      map[key].push(sub);
    });
    return map;
  }, [submissions]);

  // Filter contests by type
  const filteredContests = useMemo(() => {
    if (!contests) return [];

    const typeFilter = (name) => {
      switch (activeTab) {
        case "Div1":
          return name.includes("Div. 1") && !name.includes("Div. 2");
        case "Div2":
          return name.includes("Div. 2") && !name.includes("Div. 1");
        case "Div3":
          return name.includes("Div. 3");
        case "Div4":
          return name.includes("Div. 4");
        case "Educational":
          return name.includes("Educational");
        case "Div1+Div2":
          return name.includes("Div. 1") && name.includes("Div. 2");
        case "Global":
          return name.includes("Global");
        case "Others":
          return (
            !name.includes("Div. 1") &&
            !name.includes("Div. 2") &&
            !name.includes("Div. 3") &&
            !name.includes("Div. 4") &&
            !name.includes("Educational") &&
            !name.includes("Global")
          );
        default:
          return true;
      }
    };

    return contests
      .filter((c) => typeFilter(c.name))
      .filter((c) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          c.name.toLowerCase().includes(query) ||
          c.id.toString().includes(query)
        );
      })
      .slice(0, CONTESTS_PER_PAGE * TOTAL_PAGES);
  }, [contests, activeTab, searchQuery]);

  // Paginated contests
  const paginatedContests = useMemo(() => {
    const start = (currentPage - 1) * CONTESTS_PER_PAGE;
    return filteredContests.slice(start, start + CONTESTS_PER_PAGE);
  }, [filteredContests, currentPage]);

  // Fetch contest problems
  const fetchContestProblems = async (contestId) => {
    if (contestProblems[contestId] || loadingContests.has(contestId)) return;

    setLoadingContests((prev) => new Set(prev).add(contestId));

    try {
      const response = await fetch(
        `https://codeforces.com/api/contest.standings?contestId=${contestId}&from=1&count=1`
      );
      const data = await response.json();

      if (data.status === "OK" && data.result.problems) {
        setContestProblems((prev) => ({
          ...prev,
          [contestId]: data.result.problems,
        }));
      }
    } catch (error) {
      console.error(`Error fetching contest ${contestId}:`, error);
    } finally {
      setLoadingContests((prev) => {
        const newSet = new Set(prev);
        newSet.delete(contestId);
        return newSet;
      });
    }
  };

  // Fetch problems for visible contests
  useEffect(() => {
    paginatedContests.forEach((contest) => {
      fetchContestProblems(contest.id);
    });
  }, [paginatedContests]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search by Contest Name or Id"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Showing{" "}
          {Math.min(filteredContests.length, CONTESTS_PER_PAGE * currentPage)}{" "}
          of {filteredContests.length}
        </span>
      </div>

      {/* Contest Type Tabs */}
      <ContestTabsNew activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Contest Table */}
      <ContestTable
        contests={paginatedContests}
        contestProblems={contestProblems}
        submissionsMap={submissionsMap}
        loadingContests={loadingContests}
      />

      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={Math.min(
          TOTAL_PAGES,
          Math.ceil(filteredContests.length / CONTESTS_PER_PAGE)
        )}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default ContestAnalytics;
