import { useState } from "react";

type Props = {
  rating: number;
  onRatingChange: (newRating: number) => void;
};

const RatingInput = ({ rating, onRatingChange }: Props) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRatingClick = (newRating: number) => {
    onRatingChange(newRating);
  };

  const handleRatingHover = (newRating: number) => {
    setHoveredRating(newRating);
  };

  const handleRatingHoverEnd = () => {
    setHoveredRating(0);
  };

  const renderStar = (index: number) => {
    const filled = index <= (hoveredRating || rating);
    const classes = `text-pv-orange ${
      filled ? "fill-current" : "fill-gray-400"
    } h-10 w-10 cursor-pointer transition-colors duration-200`;

    return (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        className={classes}
        viewBox="0 0 20 20"
        onClick={() => handleRatingClick(index)}
        onMouseEnter={() => handleRatingHover(index)}
        onMouseLeave={handleRatingHoverEnd}
      >
        <path
          fillRule="evenodd"
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
    );
  };

  return (
    <div className="flex pt-4">
      {Array.from({ length: 5 }, (_, i) => renderStar(i + 1))}
    </div>
  );
};

export default RatingInput;
