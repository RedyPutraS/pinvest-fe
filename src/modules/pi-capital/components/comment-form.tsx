import type { FormEvent } from "react";
import { useContext, useState } from "react";
import useCommentMutation from "../api/post-comment";
import { toast } from "hooks/use-toast";
import { PageContext } from "components/page/page-context";
type Props = {
  onSuccess: () => void;
};
const CommentForm = ({ onSuccess }: Props) => {
  const context = useContext(PageContext);
  const [formData, setFormData] = useState({
    comment: "",
  });
  const { mutateAsync } = useCommentMutation({ ...context });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutateAsync({ comment: formData.comment })
      .then(() => {
        toast({
          title: "Komentar telah diberikan!",
        });
        onSuccess();
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
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 font-medium xl:mb-10 xl:text-2xl">Komentar</div>
      <div className="mb-10 flex">
        <div className="flex h-[56px] w-[56px] items-center justify-center rounded-lg bg-pv-blue-light">
          <img src="/assets/icon/user.svg" alt="" />
        </div>
        <div className="ml-4 flex w-full flex-col items-end justify-end">
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-xs focus:outline-none focus:ring-1 xl:text-base"
            placeholder="Masukkan Komentar Disini"
          />
          <div>
            <button
              type="submit"
              className="mt-4 rounded-md bg-pv-blue-dark px-8 py-2 text-xs font-light text-pv-white-pure hover:bg-pv-blue-light xl:h-[56px] xl:rounded-lg xl:text-base"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
