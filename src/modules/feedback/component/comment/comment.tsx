import { useCommentList } from "modules/feedback/api/comment-list";
import { CommentBox } from "./comment-box";
import { CommentList } from "./comment-list";
import { useState } from "react";

type Props = {
  type: string;
  app: string;
  slug: string;
  visible?: boolean;
};

export const FeedbackComment: React.FC<Props> = ({
  type,
  app,
  slug,
  visible = false,
}) => {
  const commentList = useCommentList({ type, app, slug });
  const [collapse, setCollapse] = useState(true);

  return (
    <div>
      {visible && (
        <>
          <CommentBox
            params={{ slug, app, type }}
            onSuccess={async () => {
              await new Promise((resolve) => {
                setTimeout(resolve, 1000);
              });
              commentList.refetch();
              setCollapse(false);
            }}
          />
          <CommentList
            params={{ app, slug }}
            comments={commentList.data}
            collapse={collapse}
          />
        </>
      )}
    </div>
  );
};
