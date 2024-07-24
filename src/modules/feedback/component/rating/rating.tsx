import { useDisclosure } from "hooks/use-disclosure";
import { useToast } from "hooks/use-toast";
import { useRating } from "modules/feedback/api/rating";
import { useRatingList } from "modules/feedback/api/rating-list";
import {
  type PostRatingBody,
  usePostRating,
} from "modules/feedback/api/rating-submit";
import RatingComment from "./rating-comment";
import RatingView from "./rating-view";
import { useState } from "react";

type Props = {
  type: string;
  app: string;
  slug: string;
  label?: string;
  withLike?: boolean;
};

export const FeedbackRating: React.FC<Props> = ({
  type,
  app,
  slug,
  label,
  withLike = true,
}) => {
  const rating = useRating({ type, app, slug });
  const ratingList = useRatingList({ type, app, slug });
  const postRating = usePostRating({ type, app, slug });
  const ratingModal: any = useDisclosure();
  const [collapse, setcollapse] = useState(true);
  const { toast } = useToast();

  const handlePostRating = (body: PostRatingBody) => {
    postRating
      .mutateAsync(body)
      .then(async () => {
        toast({
          title: "Rating telah diberikan!",
        });
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        setcollapse(false);
        ratingList.refetch();
      })
      .catch(() => {
        toast({
          title: "Gagal memberikan rating!",
        });
      });
  };

  return (
    <>
      <RatingComment
        isOpen={ratingModal.isOpen}
        setIsOpen={ratingModal.setIsOpen}
        onSubmit={handlePostRating}
        withRating={withLike}
      />
      <RatingView
        ratingCount={rating.data?.count ?? 0}
        rating={rating.data?.total ?? 0}
        ratingList={ratingList.data}
        label={label}
        collapse={collapse}
      />
    </>
  );
};
