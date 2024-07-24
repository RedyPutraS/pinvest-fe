/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardBody, CardImage } from "components/card";
import ShareButton from "components/icon/share-button";
import StarEmpty from "components/icon/star-empty";
import StarFilled from "components/icon/star-filled";
import format from "date-fns/format";
import parse from "date-fns/parse";
import Image from "next/image";
import Link from "next/link";
import { id } from "date-fns/locale";

type Props = {
  articleId: number;
  title: string;
  thumbnail: string;
  description: string;
  subcategory: string;
  publishedAt?: string | null;
  rate?: any;
};

const ArticleItem = ({
  title,
  rate,
  thumbnail,
  description,
  subcategory,
  publishedAt,
  articleId,
}: Props) => {
  return (
    <Link href={`/pi-learning/article/${articleId}`}>
      <Card className="h-full shadow-md">
        <CardImage>
          <Image
            fill
            src={thumbnail}
            alt={`Thumbnail ${title}`}
            style={{ objectFit: "cover" }}
          />
        </CardImage>
        <CardBody>
          <div className="flex items-start justify-between">
            <Link href={`/pi-learning/article/${articleId}`}>
              <div className="text-md h-5 font-semibold text-gray-600 line-clamp-1 xl:min-h-[70px] xl:text-2xl xl:line-clamp-2">
                {title}
              </div>
            </Link>
            <ShareButton
              path={`/pi-learning/article/${articleId}`}
              className="w-6 xl:w-10"
            />
          </div>
          <p className="mt-4 text-neutral-400 line-clamp-3">{description}</p>
          <Link href={`/pi-learning/article/${articleId}`}>
            <div className="mb-2 flex items-center">
              <p className="mr-2 text-xs font-medium xl:text-base">Rating</p>

              {[...Array(5)].map((_, i) => {
                return rate < i + 1 ? (
                  <StarEmpty key={i} />
                ) : (
                  <StarFilled key={i} />
                );
              })}
              <p className="ml-2 text-xs font-medium xl:text-base">({rate})</p>
            </div>
          </Link>
          <div className="mt-4 flex flex-wrap gap-1">
            <span className="rounded-lg bg-blue-200 px-6 py-2 font-bold text-sky-800">
              {subcategory}
            </span>
          </div>
          <p className="mt-2 text-neutral-400">
            {publishedAt &&
              format(
                parse(publishedAt, "yyyy-MM-dd HH:mm:ss", new Date()),
                "iiii, dd MMMM yyyy, H:mm", {locale: id}
              )}
          </p>
        </CardBody>
      </Card>
    </Link>
  );
};

export default ArticleItem;
