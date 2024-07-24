import type { CommentData } from "../api/comment-list";
import CommentItem from "./comment-item";
type Props = {
  commentList?: CommentData[];
  type: string;
  app: string;
};
const CommentList = ({ type, app, commentList }: Props) => {
  return (
    <div className="mb-10">
      {commentList &&
        commentList.map((comment, i) => (
          <CommentItem key={i} type={type} app={app} comment={comment} />
        ))}
    </div>
  );
};

export default CommentList;
