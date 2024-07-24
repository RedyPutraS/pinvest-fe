import { useState } from "react";
import type { CommentData } from "../api/comment-list";
import { useSubCommentList } from "../api/subcomment-list";
import SubCommentItem from "./sub-comment-item";
import SubCommentDialog from "./subcomment-dialog";

type Props = {
  type: string;
  app: string;
  comment: CommentData;
};
const CommentItem = ({ app, comment }: Props) => {
  // const params: CommentLikeParams = {
  //   id: comment.id,
  //   type: type,
  //   app: app,
  // };
  // const { data: commentLike } = useCommentLike(params);

  const { data: subCommentList, refetch } = useSubCommentList({
    id: comment.id.toString(),
    app: app,
  });
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      {openDialog && (
        <SubCommentDialog
          showDialog={openDialog}
          onClose={function (): void {
            setOpenDialog(false);
            refetch();
          }}
          id={comment.id.toString()}
          app={app}
        />
      )}
      <div className="border-b-[1px] border-pv-grey-medium2 pt-6 pb-4">
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
              <div className="font-medium xl:text-xl">{comment.username}</div>
              <div className="flex items-center">
                <div className="text-xs text-pv-grey-medium3 xl:text-sm">
                  {comment.time}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div></div>
            <div className="grid grid-cols-2 gap-1">
              <img
                src="/assets/icon/chat-circle.svg"
                alt=""
                className="w-5 xl:w-auto"
              />
              <span className="text-sm xl:text-base">{comment.subcomment}</span>
            </div>
            {/* <div className="grid grid-cols-2 gap-1">
              <img src="/assets/icon/thumb-up.svg" alt="" />0
            </div> */}
          </div>
        </div>
        <div className="py-4 text-sm xl:text-base">{comment.comment}</div>
        <div
          className="flex cursor-pointer"
          onClick={() => setOpenDialog(true)}
        >
          {/* <div className="mr-6 flex cursor-pointer">
            <img src="/assets/icon/like-outlined.svg" alt="" />
            <div className="pl-2">Suka</div>
          </div> */}
          <div className="flex cursor-pointer items-center">
            <img src="/assets/icon/chat-outlined.svg" alt="" />
            <div className="pl-2 text-xs xl:text-base">Balasan</div>
          </div>
        </div>
      </div>
      <div>
        {subCommentList &&
          subCommentList.map((subComment, i) => (
            <SubCommentItem key={i} comment={subComment as never} />
          ))}
      </div>
    </div>
  );
};

export default CommentItem;
