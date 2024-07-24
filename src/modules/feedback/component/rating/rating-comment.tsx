import Button from "components/button/button";
import PopupLogin from "components/popup-login/popup-login";
import { Textarea } from "components/textarea";
import { useAuthStore } from "hooks/use-auth-store";
import { type PostRatingBody } from "modules/feedback/api/rating-submit";
import { useEffect, useRef, useState } from "react";
import ReactStars from "react-stars";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  onSubmit: (body: PostRatingBody) => void;
  withRating?: boolean;
};

const RatingComment = ({ onSubmit, withRating = true }: Props) => {
  const [notes, setNotes] = useState("");
  const [rate, setRate] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = useAuthStore();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const textRef = useRef<any>();
  useEffect(() => {
    if (auth.user) {
      return setIsLoggedIn(true);
    }
    return setIsLoggedIn(false);
  }, [auth.user]);

  return (
    <div className="lg:mt-10">
      {isLoginPopupOpen && (
        <PopupLogin onClose={() => setIsLoginPopupOpen(false)} />
      )}
      {withRating && <div className="text-gray-600 mt-2">Berikan Rating</div>}
      {withRating && (
        <div className="wlg:-4/5 mt-2 flex justify-between border-b-[1px] border-pv-grey-medium3"></div>
      )}
      <div className="lg:w-4/5">
        {withRating && (
          <div className="flex flex-col">
            <ReactStars
              half={false}
              size={32}
              color1="#BFBFBF"
              color2="#F68500"
              value={rate}
              onChange={(val) => {
                setError(null);
                setRate(val);
              }}
            />
            <div className="text-red-600">{error}</div>
          </div>
        )}
        <>
          <div className="py-2 text-gray-600">Masukkan Komentar</div>
          <Textarea
            ref={textRef}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Masukkan Deskripsi Komentar"
          />
        </>
        <div className="flex justify-end">
          {isLoggedIn ? (
            <Button
              className="mt-4"
              onClick={() => {
                setError("Rating tidak boleh kosong");
                if (rate === 0) return;
                textRef.current.value = "";
                onSubmit({ title: "", rate, notes });
                setError(null);
                setRate(0);
              }}
            >
              Kirim
            </Button>
          ) : (
            <Button className="mt-4" onClick={() => setIsLoginPopupOpen(true)}>
              Kirim
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingComment;
