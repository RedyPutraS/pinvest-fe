import Button from "components/button/button";
import PopupLogin from "components/popup-login/popup-login";
import { Textarea } from "components/textarea";
import { useAuthStore } from "hooks/use-auth-store";
import { useToast } from "hooks/use-toast";
import { usePostSubcomment } from "modules/feedback/api/subcomment-list";
import { useRef, useState } from "react";

type Props = {
  params: { slug: string; app: string };
  onSuccess?: () => void;
};

export const SubcommentBox = ({ params, onSuccess }: Props) => {
  const auth = useAuthStore();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const { toast } = useToast();
  const postComment = usePostSubcomment(params);
  const [comment, setComment] = useState("");
  const inputRef = useRef<any>();
  const handleSubmit = async () => {
    try {
      await postComment.mutateAsync({ comment });
      inputRef.current.value = "";
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
      <div className="mt-2">
        <Textarea
          ref={inputRef}
          className="mt-4"
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
