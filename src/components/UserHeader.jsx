import { getRatingColor, getRankTitle } from "../utils/helpers";

function UserHeader({ userInfo }) {
  if (!userInfo) return null;

  const { handle, rating, rank, maxRating, maxRank } = userInfo;
  const color = getRatingColor(rating);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color }}>
            {handle}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {getRankTitle(rank)}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold" style={{ color }}>
            {rating || "Unrated"}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Current Rating
          </div>
          {maxRating && (
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Peak: <span className="font-semibold">{maxRating}</span>
              <span className="text-xs ml-1">({getRankTitle(maxRank)})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
