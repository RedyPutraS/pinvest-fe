/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "components/button/button";
import PopupLogin from "components/popup-login/popup-login";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/select";
import { useAuthStore } from "hooks/use-auth-store";
import { useDisclosure } from "hooks/use-disclosure";
import { toast } from "hooks/use-toast";
import { useForumPostMutation } from "modules/forum/forum";
import FileUploader from "modules/pi-capital/components/file-uploader";
import { usePiCircleSubCategory } from "modules/pi-circle/pi-circle-subcategory";
import { useState, type FormEvent } from "react";
import { cn } from "utils";

type Props = {
  refetch: () => void;
};

function ForumForm({ refetch }: Props) {
  const auth = useAuthStore();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const { isOpen, setIsOpen } = useDisclosure();
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState("");
  const post = useForumPostMutation();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.sub_category) {
      setError("Silahkan pilih kategori");
      return;
    }
    post
      .mutateAsync({ ...formData })
      .then(() => {
        toast({
          title: "Forum post berhasil!",
        });
        setIsOpen(false);
        setError("");
        refetch();
      })
      .catch(() => {
        toast({
          title: "Forum post gagal!",
        });
      });
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubCategoryChange = (sub: string) => {
    setFormData({ ...formData, sub_category: sub });
    setError("");
  };
  const { data: subCategories } = usePiCircleSubCategory({
    categoryId: "18",
  });
  return (
    <>
      {isLoginPopupOpen && (
        <PopupLogin onClose={() => setIsLoginPopupOpen(false)} />
      )}
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50",
          {
            hidden: !isOpen,
          }
        )}
      >
        <div className="z-10 max-h-[80%] w-[90%] overflow-y-auto rounded-md bg-white p-4 animate-in zoom-in-90 xl:max-w-xl">
          <div className="flex justify-between">
            <h2 className="mb-2 text-lg font-semibold">Buat Topik</h2>
            <img
              onClick={() => setIsOpen(false)}
              src="/assets/icon/close-dialog.svg"
              alt=""
              className="h-8 w-8 cursor-pointer p-1"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <Select onValueChange={handleSubCategoryChange}>
                <SelectTrigger className="w-full text-base">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua</SelectItem>
                  {subCategories?.map((sub, i) => (
                    <SelectItem
                      className="text-base"
                      key={i}
                      value={`${sub.alias}`}
                    >
                      {sub.subcategory_name}
                    </SelectItem>
                  ))}
                </SelectContent>
                <input
                  type="text"
                  name="kategori_lainnya"
                  value={formData.kategori_lainnya}
                  onChange={handleChange}
                  placeholder="Kategori Lainya"
                  className={cn(
                    "mb-2 w-full border-b-[1px] border-pv-grey-medium1 px-4 py-2 hover:border-pv-grey-medium2 focus:outline-none focus:ring-1",
                    {
                      hidden: formData.sub_category !== "kategorilainnya",
                    }
                  )}
                />
              </Select>
              {error && <div className="text-pv-red">{error}</div>}
            </div>
            <p className="my-3">Thumbnail Image</p>
            <FileUploader
              file={formData.thumbnail_image}
              placeholder="Pilih Atau Tarik Gambar"
              onChange={function (file: File): void {
                setFormData({ ...formData, thumbnail_image: file });
              }}
            />
            <p className="my-3">Cover Image</p>
            <FileUploader
              file={formData.cover_image}
              placeholder="Pilih Atau Tarik Gambar"
              onChange={function (file: File): void {
                setFormData({ ...formData, cover_image: file });
              }}
            />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Judul"
              className="mb-2 w-full border-b-[1px] border-pv-grey-medium1 px-4 py-2 hover:border-pv-grey-medium2 focus:outline-none focus:ring-1"
            />

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="h-[80px] w-full border-b-[1px] border-pv-grey-medium1 px-4 py-2 hover:border-pv-grey-medium2 focus:outline-none focus:ring-1"
              placeholder="Deskripsi"
            />
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="mb-2 h-[80px] w-full border-b-[1px] border-pv-grey-medium1 px-4 py-2 hover:border-pv-grey-medium2 focus:outline-none focus:ring-1"
              placeholder="Konten"
            />
            <div className="mb-2 flex justify-end">
              <Button type="submit">Kirim</Button>
            </div>
          </form>
        </div>
      </div>
      <Button
        onClick={() => {
          auth.user ? setIsOpen(true) : setIsLoginPopupOpen(true);
        }}
      >
        Buat Topik
      </Button>
    </>
  );
}

export default ForumForm;
