import { type CommentItemType } from "modules/feedback/api/comment-list";
import { useSubcommentList } from "modules/feedback/api/subcomment-list";
import { useState } from "react";
import { SubcommentBox } from "./subcomment-box";
import SubcommentItem from "./subcomment-item";

type Props = {
  comment: CommentItemType;
  params: { slug: string; app: string };
};

export const CommentItem = ({
  comment: { id, profile_picture, username, time, comment, author },
  params: { app },
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { data, refetch } = useSubcommentList({ slug: id.toString(), app });
  return (
    <>
      <div className="border-b-[0.5px] border-black py-4">
        <div className="flex items-center">
          {profile_picture && (
            <img
              src={profile_picture}
              alt={username ?? ""}
              className="h-14 w-14 overflow-hidden rounded-lg object-cover"
            />
          )}
          <div className="ml-2">
            <p className="text-dark3 font-semibold">{author}</p>
            <p className="text-medium3">{time}</p>
          </div>
        </div>
        <p className="mt-4">{comment}</p>
      </div>
      <div className="pl-8">
        {data && data.length > 0 && (
          <div
            className="mt-2 flex cursor-pointer justify-end text-sm text-pv-blue-dark hover:text-pv-blue-light"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? "Lihat" : "Sembunyikan"} Balasan
          </div>
        )}
        {!isCollapsed &&
          data?.map((subcomment) => (
            <SubcommentItem
              key={subcomment.id}
              profilePicture={subcomment.profile_picture}
              name={subcomment.reply_name}
              time={subcomment.time}
              subcomment={subcomment.sub_comment}
            />
          ))}
        <SubcommentBox
          onSuccess={async () => {
            await new Promise((resolve) => {
              setTimeout(resolve, 1000);
            });
            setIsCollapsed(false);
            refetch();
          }}
          params={{ slug: id.toString(), app }}
        />
      </div>
    </>
  );
};
