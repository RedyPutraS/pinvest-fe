import { Card, CardImage, CardBody } from "components/card";
import ShareButton from "components/icon/share-button";
import RenderHtml from "components/render-html";
import { format, parse as dateParse } from "date-fns";
import { useRouter } from "next/router";

type Props = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  subcategory: string;
  publishedAt?: string | null;
  rate?: any;
};
export function PiNewsSearchCard({
  id,
  title,
  thumbnail,
  description,
  publishedAt,
  subcategory,
}: Props) {
  const router = useRouter();

  return (
    <div className="mb-1 cursor-pointer pt-4">
      <Card className="mx-2 mt-4 shadow-md ring-gray-200 hover:ring-2">
        <CardImage className="aspect-auto">
          <img
            src={thumbnail}
            alt={title}
            className="h-[100px] w-full cursor-pointer rounded-t-lg object-cover xl:h-[235px]"
            onClick={() => router.push(`/pi-news/${id}`)}
          />
        </CardImage>
        <CardBody className="p-2 xl:p-4">
          <div className="flex items-start justify-between">
            <p
              onClick={() => router.push(`/pi-news/${id}`)}
              className="text-md h-5 font-semibold text-gray-600 line-clamp-1 xl:min-h-[60px] xl:text-[24px] xl:line-clamp-2"
            >
              {title}
            </p>
            <ShareButton path={`/pi-news/${id}`} className="w-6 xl:w-10" />
          </div>
          <p
            onClick={() => router.push(`/pi-news/${id}`)}
            className="mt-1  h-20 text-[10px] text-pv-grey-medium2 line-clamp-3 xl:h-[60px] xl:text-sm"
          >
            <RenderHtml html={description ?? ""} />
          </p>
          <div
            className="mb-2 mt-4 flex flex-wrap gap-1"
            onClick={() => router.push(`/pi-news/${id}`)}
          >
            <div className="cursor-pointer rounded bg-pv-blue-dark bg-opacity-25 px-4 py-1 text-[10px] font-semibold text-pv-blue-dark hover:opacity-70 xl:rounded-lg xl:px-6 xl:py-2 xl:text-sm">
              {subcategory}
            </div>
          </div>
          <p
            className="mt-2 text-[8px] text-pv-grey-medium2 xl:mt-0 xl:min-h-[20px] xl:text-sm"
            onClick={() => router.push(`/pi-news/${id}`)}
          >
            {publishedAt &&
              format(
                dateParse(publishedAt, "yyyy-MM-dd HH:mm:ss", new Date()),
                "iiii, dd MMMM yyyy, H:mm"
              )}
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
