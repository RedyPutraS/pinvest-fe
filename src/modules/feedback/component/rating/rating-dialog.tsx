import Button from "components/button/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/dialog";
import { Textarea } from "components/textarea";
import ReactStars from "react-stars";
import { useEffect, useState } from "react";
import { type PostRatingBody } from "modules/feedback/api/rating-submit";
import { useAuthStore } from "hooks/use-auth-store";
import { useRouter } from "next/router";
import { useToast } from "hooks/use-toast";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  onSubmit: (body: PostRatingBody) => void;
};

const RatingDialog = ({ isOpen, setIsOpen, onSubmit }: Props) => {
  const [notes, setNotes] = useState("");
  const [rate, setRate] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const auth = useAuthStore();
  useEffect(() => {
    if (auth.user) {
      return setIsLoggedIn(true);
    }
    return setIsLoggedIn(false);
  }, [auth.user]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>Berikan Rating</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Berikan Rating</DialogTitle>
          <div className="flex justify-between border-b-[1px] border-pv-grey-medium3"></div>
          <div className="relative">
            <div className="flex flex-col">
              <ReactStars
                size={45}
                color1="#BFBFBF"
                color2="#F68500"
                value={rate}
                onChange={setRate}
              />
            </div>
            <div className="py-2">Masukkan Komentar</div>
            <Textarea
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Masukkan Deskripsi Komentar"
            />
            <div className="flex justify-end">
              {isLoggedIn ? (
                <Button
                  className="mt-4"
                  onClick={() => onSubmit({ title: "", rate, notes })}
                >
                  Kirim
                </Button>
              ) : (
                <Button
                  className="mt-4"
                  onClick={() =>
                    router.push(`/auth/register`).then(() => {
                      toast.toast({
                        title:
                          "Mohon Untuk Login Atau Buat Akun Terlebih Dahulu",
                      });
                    })
                  }
                >
                  Kirim
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RatingDialog;
