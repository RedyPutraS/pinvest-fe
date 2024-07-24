import Button from "components/button/button";
import RenderHtml from "components/render-html";
import { useRouter } from "next/router";
import { cn } from "utils";
type Props = {
  title: string;
  image: string;
  description: string;
  reverse?: boolean;
  path: string;
};

const CollabsItem = ({
  title,
  image,
  description,
  reverse = false,
  path,
}: Props) => {
  const router = useRouter();
  return (
    <div
      className={cn("mb-32 flex", reverse ? "flex-row-reverse" : "flex-row")}
    >
      <div className="basis-1/2">
        <img src={image} alt={""} />
      </div>
      <div className="basis-1/2">
        <h1 className="mb-6 text-4xl font-semibold">{title}</h1>
        <RenderHtml html={description} className="mb-6 text-pv-grey-medium3" />
        <Button
          onClick={() => router.push(path)}
          variant="solid"
          color="blue"
          size="m"
          className="font-normal"
        >
          Pelajari Lebih Lanjut
        </Button>
      </div>
    </div>
  );
};

export default CollabsItem;
