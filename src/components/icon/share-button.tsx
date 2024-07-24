import { ShareContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";
import { cn } from "utils";

type Props = {
  type?: "filled" | "outlined" | "icon";
  path: string;
  className?: string;
};
const ShareButton = ({ type = "filled", path = "", className }: Props) => {
  const { openShareDialog } = useContext(ShareContext);
  let asset;
  const [url, setUrl] = useState(path);
  useEffect(() => {
    setUrl(window.location.origin + path);
  }, [path]);

  switch (type) {
    case "outlined":
      asset = "/assets/icon/share-button-outline.png";
      break;
    case "icon":
      asset = "/assets/icon/share.png";
      break;

    default:
      asset = "/assets/icon/share-button.png";
      break;
  }

  return (
    <>
      <img
        src={asset}
        alt="share"
        onClick={() => openShareDialog && openShareDialog(url)}
        className={cn("z-10 cursor-pointer w-[27px] h-[24px] lg:h-[35px]", className)}
      />
    </>
  );
};

export default ShareButton;
