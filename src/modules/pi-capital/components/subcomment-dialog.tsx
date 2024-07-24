import { cn } from "utils";
import type { FormEvent } from "react";
import { useState } from "react";
import { toast } from "hooks/use-toast";
import { usePostSubComment } from "../api/post-sub-comment";

type Props = {
  showDialog: boolean;
  onClose: (val: boolean) => void;
  id: string;
  app: string;
};

const SubCommentDialog = ({ showDialog = false, onClose, id, app }: Props) => {
  const [comment, setComment] = useState<string>("");

  const handleCloseDialog = () => {
    setComment("");
    onClose(false);
  };

  const postSubComment = usePostSubComment({ id, app });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postSubComment
      .mutateAsync({ sub_comment: comment })
      .then(() => {
        handleCloseDialog();
        toast({
          title: "Komentar telah diberikan!",
        });
      })
      .catch(() => {
        toast({
          title: "Gagal memberikan komentar!",
        });
      });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = event.target;
    setComment(value);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50",
        {
          hidden: !showDialog,
        }
      )}
    >
      <div className="z-10 rounded-md bg-white p-6 animate-in zoom-in-90">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between border-pv-grey-medium3">
            <h2 className="mb-2 text-lg font-medium">Komentar</h2>
            <img
              onClick={handleCloseDialog}
              src="/assets/icon/close-dialog.svg"
              alt=""
              className="h-8 w-8 cursor-pointer p-1"
            />
          </div>
          <div className="mb-4 flex w-[700px] flex-col">
            <textarea
              id="notes"
              name="notes"
              value={comment}
              onChange={handleChange}
              className="h-[120px] w-full rounded-md border border-pv-grey-medium1 px-4 py-2 hover:border-pv-grey-medium2 focus:outline-none focus:ring-1"
              placeholder="Masukkan Komentar Disini"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!comment}
              className="h-11 rounded-lg bg-pv-blue-dark px-8 py-2 text-sm font-light text-pv-white-pure hover:bg-pv-blue-light"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubCommentDialog;
