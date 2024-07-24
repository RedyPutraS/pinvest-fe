import StarEmpty from "components/icon/star-empty";
import StarFilled from "components/icon/star-filled";
import type { Rating } from "../api/rating-list";
type Props = {
  rating: Rating;
};
const RatingItem = ({ rating }: Props) => {
  return (
    <div className="col-span-1 border-t-[1px] border-pv-grey-light3 pt-4 pl-2 hover:bg-pv-white-light">
      <div className="mb-2 flex ">
        <div className="flex flex-1 items-center">
          <div
            className={`flex h-[56px] w-[56px] items-center justify-center rounded-lg border ${
              rating.profile_picture ? "bg-white" : "bg-pv-blue-light"
            } `}
          >
            <img
              src={rating.profile_picture || "/assets/icon/user.svg"}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-[20px] font-medium">{rating.author}</div>
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => {
                  return rating.rate < i + 1 ? (
                    <StarEmpty key={i} />
                  ) : (
                    <StarFilled key={i} className="text-pv-orange" />
                  );
                })}
              </div>
              <div className="pl-2 text-sm text-pv-grey-medium3">
                {rating.time}
              </div>
            </div>
          </div>
        </div>
        <div>
          <img src="/assets/icon/dots-three-vertical.svg" alt="" />
        </div>
      </div>
      <div className="font-medium line-clamp-1">{rating.title}</div>
      <div className=" line-clamp-2">{rating.notes}</div>
    </div>
  );
};

export default RatingItem;
