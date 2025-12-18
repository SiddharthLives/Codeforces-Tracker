import { useState } from "react";

function HandleInput({ onSubmit }) {
  const [handle, setHandle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!handle.trim()) {
      setError("Please enter a Codeforces handle");
      return;
    }

    onSubmit(handle.trim());
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="handle"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Codeforces Handle
          </label>
          <input
            type="text"
            id="handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="Enter username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Analyze
        </button>
      </form>
    </div>
  );
}

export default HandleInput;
