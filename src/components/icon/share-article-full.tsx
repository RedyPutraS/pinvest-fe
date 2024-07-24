import { useEffect, useState } from "react";
import { cn } from "utils";
import Button from "components/button/button";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import { useRouter } from "next/router";
import { toast } from "hooks/use-toast";
type Props = {
  type?: "filled" | "outlined" | "icon";
  path?: string;
  className?: string;
};
const ShareArticleFull = ({ type = "icon", path = "", className }: Props) => {
  let asset;
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();
  const [url, setUrl] = useState(path);
  useEffect(() => {
    if (!url) {
      setUrl(window.location.origin + router.asPath);
    }
  }, [router.asPath, url]);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.canShare?.()) {
      navigator.share({ url });
    }

    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Salin Tautan Success",
      });
    });
  };

  switch (type) {
    case "outlined":
      asset = "/assets/icon/share-button-outline.svg";
      break;
    case "icon":
      asset = "/assets/icon/share.svg";
      break;

    default:
      asset = "/assets/icon/share-button.svg";
      break;
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50",
          {
            hidden: !showDialog,
          }
        )}
      >
        <div className="z-10 w-[90%] rounded-md bg-white p-6 animate-in zoom-in-90 xl:w-[400px]">
          <div className="flex justify-between border-b-[1px] border-pv-grey-medium3">
            <h2 className="mb-2 text-lg font-medium">Bagikan</h2>
            <img
              onClick={() => setShowDialog(false)}
              src="/assets/icon/close-dialog.svg"
              alt=""
              className="h-8 w-8 cursor-pointer p-1"
            />
          </div>
          <div className="mt-4 grid grid-cols-5 gap-1 xl:grid-cols-6">
            <LinkedinShareButton url={url}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <FacebookShareButton
              url={url}
              quote={"pinvest "}
              hashtag={"#pinvest"}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={url}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton url={url} title={"pinvest"} separator=":: ">
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <button
              className="btn btn-primary modal-footer-button text-xs xl:col-span-2 xl:text-base"
              onClick={handleShare}
            >
              Salin Tautan
            </button>
          </div>
        </div>
      </div>
      <Button
        className="flex w-full items-center"
        color="blue"
        variant="outlined"
        onClick={() => setShowDialog(true)}
      >
        <p className="mx-auto flex">
          Bagikan
          <img
            className={cn("z-10 ml-4 cursor-pointer", className)}
            src={asset}
            alt="share"
          />
        </p>
      </Button>
    </>
  );
};

export default ShareArticleFull;
