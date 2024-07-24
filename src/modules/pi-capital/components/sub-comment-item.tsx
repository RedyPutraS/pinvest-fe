import type { CommentData } from "../api/comment-list";

type Props = {
  comment: CommentData;
};
const CommentItem = ({ comment }: Props) => {
  return (
    <div className="mt-4 flex rounded-lg bg-pv-white-light">
      <div className="mr-3 w-3 rounded-l-lg bg-pv-blue-light"></div>
      <div className="w-full rounded-r-lg py-2">
        <div className="flex justify-between">
          <div className="flex">
            <div
              className={`flex h-[56px] w-[56px] items-center justify-center rounded-lg border ${
                comment.profile_picture ? "bg-white" : "bg-pv-blue-light"
              }`}
            >
              <img
                src={comment.profile_picture || "/assets/icon/user.svg"}
                alt=""
                className="h-[56px] w-[56px] rounded-lg object-cover"
              />
            </div>
            <div className="ml-4">
              <div className="text-[20px] font-medium">{comment.username}</div>
              <div className="flex items-center">
                <div className="text-sm text-pv-grey-medium3">
                  {comment.time}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-2 line-clamp-2">{comment.comment}</div>
      </div>
    </div>
  );
};

export default CommentItem;
