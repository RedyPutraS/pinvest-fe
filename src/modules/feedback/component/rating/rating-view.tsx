import { type RatingItem } from "modules/feedback/api/rating-list";
import RatingCard from "./rating-card";
import { useState } from "react";

type Props = {
  rating?: number;
  ratingCount?: number;
  ratingList?: RatingItem[];
  label?: string;
  collapse?: boolean;
};

const RatingView = ({
  ratingList,
  label = "Rating dan Komentar",
  collapse = true,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(collapse);

  if (!ratingList || ratingList.length === 0) {
    return null;
  }
  const limit = 6;
  const firstSixRatings = ratingList.slice(0, limit);
  const restOfRatings = ratingList.slice(limit);
  const isShown = ratingList.length > limit;

  return (
    <div>
      <div className="flex items-end justify-between lg:w-4/5 ">
        <h3 className="flex items-center gap-2 text-gray-600 lg:text-2xl">
          {label}
        </h3>
        <div
          className="mt-2 flex cursor-pointer justify-end text-sm text-pv-blue-dark hover:text-pv-blue-light"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isShown &&
            (isCollapsed
              ? "Lihat Komentar Lainnya"
              : "Sembunyikan Komentar Lainnya")}
        </div>
      </div>
      <div className="mt-5 block gap-6 text-gray-600 xl:grid xl:grid-cols-2">
        {firstSixRatings.map((item) => (
          <RatingCard key={item.id} ratingItem={item} />
        ))}
        {!isCollapsed &&
          restOfRatings.map((item) => (
            <RatingCard key={item.id} ratingItem={item} />
          ))}
      </div>
    </div>
  );
};

export default RatingView;
