const CONTEST_TYPES = [
  { id: "Div1", label: "Div. 1" },
  { id: "Div2", label: "Div. 2" },
  { id: "Div3", label: "Div. 3" },
  { id: "Div4", label: "Div. 4" },
  { id: "Educational", label: "Educational" },
  { id: "Div1+Div2", label: "Div. 1 + Div. 2" },
  { id: "Global", label: "Global" },
  { id: "Others", label: "Others" },
];

function ContestTabsNew({ activeTab, setActiveTab }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="flex flex-wrap gap-2">
        {CONTEST_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveTab(type.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === type.id
                ? "text-gray-900 dark:text-white bg-gray-900 dark:bg-white"
                : "text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ContestTabsNew;
