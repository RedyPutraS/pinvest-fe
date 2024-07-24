import { type CommentItemType } from "modules/feedback/api/comment-list";
import { CommentItem } from "./comment-item";
import { useState } from "react";

type Props = {
  comments?: CommentItemType[];
  params: { slug: string; app: string };
  collapse?: boolean;
};

export const CommentList = ({
  comments = [],
  params,
  collapse = true,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(collapse);
  const limit = 3;
  const firstThreeComments = comments.slice(0, limit);
  const restOfComments = comments.slice(limit);
  const isShown = comments.length > limit;

  return (
    <div>
      {firstThreeComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} params={params} />
      ))}
      {!isCollapsed &&
        restOfComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} params={params} />
        ))}
      {comments && comments.length > 0 && (
        <div
          className="mt-2 flex cursor-pointer justify-center text-lg text-pv-blue-dark hover:text-pv-blue-light"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isShown &&
            (isCollapsed
              ? "Lihat Komentar Lainnya"
              : "Sembunyikan Komentar Lainnya")}
        </div>
      )}
    </div>
  );
};
