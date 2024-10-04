import { useToast } from "hooks/use-toast";
import { ShareContext } from "pages/_app";
import { useContext } from "react";
import { cn } from "utils";
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

const ShareDialog = () => {
  const { toast } = useToast();
  const { showDialog, url, setShowDialog } = useContext(ShareContext);
  return (
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
            onClick={() => setShowDialog && setShowDialog(false)}
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
            onClick={async () => {
              navigator.clipboard && (await navigator.clipboard.writeText(url));
              toast({
                title: "Disalin ke papan klip!",
              });
            }}
          >
            Salin Tautan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareDialog;
