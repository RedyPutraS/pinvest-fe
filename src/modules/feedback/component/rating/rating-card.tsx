import { formatRelative, parseISO } from "date-fns";
import id from "date-fns/locale/id";
import { type RatingItem } from "modules/feedback/api/rating-list";
import ReactStars from "react-stars";

type Props = {
  ratingItem: RatingItem;
};
const RatingCard = ({ ratingItem }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { author, title, notes, rate, created_at } = ratingItem;
  return (
    <div className="border-t-2 py-6">
      <p className="text-xl font-semibold">{author}</p>
      <div className="flex items-center text-gray-600">
        <ReactStars
          edit={false}
          value={rate}
          color1="#BFBFBF"
          color2="#F68500"
          size={20}
        />
        <p className="ml-1 text-sm text-pv-grey-medium3">
          {created_at &&
            formatRelative(parseISO(created_at), new Date(), { locale: id })}
        </p>
      </div>
      <p className="mt-2 text-sm text-pv-grey-medium3">{notes}</p>
    </div>
  );
};

export default RatingCard;
