import type { Rating } from "../api/rating-list";
import RatingItem from "./rating-item";

type Props = {
  ratingList?: Rating[];
};
const RatingList = ({ ratingList }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-10">
      {ratingList &&
        ratingList.map((rating, i) => <RatingItem key={i} rating={rating} />)}
    </div>
  );
};

export default RatingList;
