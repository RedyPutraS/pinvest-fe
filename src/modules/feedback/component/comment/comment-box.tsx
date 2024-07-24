import Button from "components/button/button";
import PopupLogin from "components/popup-login/popup-login";
import { Textarea } from "components/textarea";
import { useAuthStore } from "hooks/use-auth-store";
import { useToast } from "hooks/use-toast";
import { usePostComment } from "modules/feedback/api/comment-submit";
import { useRef, useState } from "react";

type Props = {
  params: { slug: string; app: string; type: string };
  onSuccess?: () => void;
};

export const CommentBox = ({ params, onSuccess }: Props) => {
  const auth = useAuthStore();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const { toast } = useToast();
  const postComment = usePostComment(params);
  const [comment, setComment] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textRef = useRef<any>();

  const handleSubmit = async () => {
    textRef.current.value = "";
    try {
      await postComment.mutateAsync({ comment });
      toast({
        title: "Komentar telah diberikan!",
      });
      onSuccess?.();
    } catch (err) {
      toast({
        title: "Gagal memberikan komentar!",
      });
    }
  };

  return (
    <>
      {isLoginPopupOpen && (
        <PopupLogin onClose={() => setIsLoginPopupOpen(false)} />
      )}
      <div className="mt-20">
        <h3 className="flex items-center gap-2 text-2xl text-gray-600">
          Komentar
        </h3>
        <Textarea
          ref={textRef}
          className="mt-10"
          placeholder="Berikan Komentar Disini"
          onChange={(e) => setComment(e.target.value)}
          disabled={postComment.isLoading}
        />
        <div className="flex justify-end">
          <Button
            className="mt-4"
            onClick={() =>
              auth.user ? handleSubmit() : setIsLoginPopupOpen(true)
            }
            disabled={postComment.isLoading}
          >
            Kirim
          </Button>
        </div>
      </div>
    </>
  );
};
