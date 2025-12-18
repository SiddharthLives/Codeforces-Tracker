import { getRatingColor, getRankTitle } from "../utils/helpers";

function UserHeader({ userInfo }) {
  if (!userInfo) return null;

  const { handle, rating, rank, maxRating, maxRank } = userInfo;
  const color = getRatingColor(rating);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color }}>
            {handle}
          </h1>
          <p className="text-gray-600 mt-1">{getRankTitle(rank)}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold" style={{ color }}>
            {rating || "Unrated"}
          </div>
          <div className="text-sm text-gray-500">Current Rating</div>
          {maxRating && (
            <div className="text-sm text-gray-600 mt-2">
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
