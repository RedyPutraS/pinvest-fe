import { cn } from "utils";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import FileUploader from "./file-uploader";
import type { InquiryBodyType } from "../api/inquiry";
import { useInquiryMutation } from "../api/inquiry";
import { toast } from "hooks/use-toast";
import { useRouter } from "next/router";
import { useAuthStore } from "hooks/use-auth-store";

type Props = {
  showDialog: boolean;
  onClose: (val: boolean) => void;
  id: string;
  app: string;
};

const InquiryDialog = ({ showDialog = false, onClose, id, app }: Props) => {
  const initState: InquiryBodyType = {
    notes: "",
    file: null,
    app: app,
    article_id: id,
  };
  const [formData, setFormData] = useState<InquiryBodyType>(initState);

  const handleCloseDialog = () => {
    setFormData({ ...initState });
    onClose(false);
  };

  const postInquiry = useInquiryMutation();
  const router = useRouter();

  const auth = useAuthStore();

  useEffect(() => {
    if (showDialog && !auth.user) {
      router.push("/auth/login");
    }
  }, [auth.user, router, showDialog]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postInquiry
      .mutateAsync(formData)
      .then(() => {
        toast({
          title: "Inquiry berhasil!",
        });
        handleCloseDialog();
      })
      .catch(() => {
        toast({
          title: "Inquiry gagal!",
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
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50",
        {
          hidden: !showDialog,
        }
      )}
    >
      <div className="z-10 w-[90%] rounded-md bg-white p-6 animate-in zoom-in-90 xl:w-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between border-b-[1px] border-pv-grey-medium3">
            <h2 className="mb-2 text-lg font-medium">Inquiry</h2>
            <img
              onClick={handleCloseDialog}
              src="/assets/icon/close-dialog.svg"
              alt=""
              className="h-8 w-8 cursor-pointer p-1"
            />
          </div>
          <div className="flex flex-col xl:w-[700px]">
            <div className="pt-6 pb-2">Tujuan Inquiry</div>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="h-[120px] w-full rounded-md border border-pv-grey-medium1 px-4 py-2 hover:border-pv-grey-medium2 focus:outline-none focus:ring-1"
              placeholder="Masukkan Tujuan Inquiry"
            />
            <div className="py-3 pt-6">File Pendukung</div>
            <FileUploader
              file={formData.file}
              onChange={function (file: File): void {
                setFormData({ ...formData, file: file });
              }}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="h-11 rounded-lg bg-pv-blue-dark px-8 py-2 text-sm font-light text-pv-white-pure hover:bg-pv-blue-light mt-2"
            >
              Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryDialog;
