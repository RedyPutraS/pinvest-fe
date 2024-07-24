import { cn } from "utils";
import type { FormEvent } from "react";
import { useContext, useState } from "react";
import ReactStars from "react-stars";
import { toast } from "hooks/use-toast";
import { useRatingMutation } from "../api/post-rating";
import { PageContext } from "components/page/page-context";

type Props = {
  showDialog: boolean;
  onClose: (val: boolean) => void;
};

interface FormData {
  rating: number;
  description: string;
}

const RatingDialog = ({ showDialog = false, onClose }: Props) => {
  const context = useContext(PageContext);
  const { mutateAsync } = useRatingMutation({ ...context });
  const initState = {
    rating: 0,
    description: "",
  };

  const [formData, setFormData] = useState<FormData>(initState);

  const handleCloseDialog = () => {
    setFormData({ ...initState });
    onClose(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutateAsync({
      rate: formData.rating,
      title: "",
      notes: formData.description,
    })
      .then(() => {
        toast({
          title: "Rating telah diberikan!",
        });
        handleCloseDialog();
      })
      .catch(() => {
        toast({
          title: "Gagal memberikan rating!",
        });
      });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (newRating: number) => {
    setFormData({ ...formData, rating: newRating });
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ",
        {
          hidden: !showDialog,
        }
      )}
    >
      <div className="z-10 rounded-md bg-white p-6 animate-in zoom-in-90">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between border-b-[1px] border-pv-grey-medium3">
            <h2 className="mb-2 text-lg font-medium">Berikan Rating</h2>
            <img
              onClick={handleCloseDialog}
              src="/assets/icon/close-dialog.svg"
              alt=""
              className="h-8 w-8 cursor-pointer p-1"
            />
          </div>
          <div className="flex w-[700px] flex-col">
            <ReactStars
              size={45}
              color1="#BFBFBF"
              color2="#F68500"
              value={formData.rating}
              onChange={handleRatingChange}
            />
            <div className="py-2">Masukkan Komentar</div>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="h-[120px] w-full rounded-md border border-pv-grey-medium1 px-4 py-2 hover:border-pv-grey-medium2 focus:outline-none focus:ring-1"
              placeholder="Masukkan Deskripsi Komentar"
            />
          </div>
          <div className="flex justify-end">
            <button className="mt-10 h-11 rounded-lg bg-pv-blue-dark px-8 py-2 text-sm font-light text-pv-white-pure hover:bg-pv-blue-light">
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingDialog;
