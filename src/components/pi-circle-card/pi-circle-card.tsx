/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardImage, CardBody } from "components/card";
import ShareButton from "components/icon/share-button";
import StarEmpty from "components/icon/star-empty";
import StarFilled from "components/icon/star-filled";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "utils";
type Props = {
  article: any;
  className?: string;
  onInquiry: (id: string) => void;
  overrideLink?: string;
};
export function PiCircleCard({ article, className, overrideLink }: Props) {
  const router = useRouter();
  return (
    <div>
      <Card
        className={cn(
          className,
          "mb-1 w-auto rounded-t-lg bg-pv-white-light opacity-90 shadow-md ring-gray-200 hover:opacity-100 hover:ring-2"
        )}
      >
        <CardImage className="relative aspect-auto">
          <img
            onClick={() =>
              router.push(overrideLink ?? `/pi-circle/${article.id}`)
            }
            src={article.thumbnail_image}
            alt={article.title}
            className="h-[105px] md:h-[230px] w-full cursor-pointer rounded-t-lg object-cover xl:h-[235px]"
          />
        </CardImage>
        <CardBody className="p-2 xl:p-4">
          <div className="flex items-start justify-between">
            <Link href={`/pi-circle/${article.id}`}>
              <div className="text-md h-5 font-semibold text-gray-600 line-clamp-1 xl:min-h-[70px] xl:text-2xl xl:line-clamp-2">
                {article.title}
              </div>
            </Link>
            <ShareButton
              path={overrideLink ?? `/pi-circle/${article.id}`}
              className="md:w-7 xl:w-10"
            />
          </div>
          <div
            className="cursor-pointer "
            onClick={() =>
              router.push(overrideLink ?? `/pi-circle/${article.id}`)
            }
          >
            <p className="mt-4 text-neutral-400 line-clamp-3">
              {article.description}
            </p>
            <Link href={overrideLink ?? `/pi-circle/${article.id}`}>
              <div className="mb-2 flex items-center">
                <p className="mr-2 text-xs font-medium text-gray-600 xl:text-base">
                  Rating
                </p>

                {[...Array(5)].map((_, i) => {
                  return article.rate < i + 1 ? (
                    <StarEmpty key={i} />
                  ) : (
                    <StarFilled key={i} />
                  );
                })}
                <p className="ml-2 text-xs font-medium xl:text-base">
                  ({article.rate})
                </p>
              </div>
            </Link>
            <div className="hidden xl:block">
              {article?.address && (
                <div className="my-4 flex">
                  <div className="flex-none">
                    <img
                      className="mr-2 w-6"
                      src="/assets/icon/map-trifold.svg"
                      alt="location"
                    />
                  </div>
                  <div className="min-h-[60px] flex-auto text-sm text-pv-grey-medium2 line-clamp-3">
                    {article?.address ?? ""}
                  </div>
                </div>
              )}
            </div>
            <div className="flex py-2 pr-2 xl:justify-end">
              <button className="block xl:hidden">
                <div className="flex text-[10px] font-bold text-pv-cyan">
                  Baca Selengkapnya
                  <img
                    className="ml-1 w-2"
                    src="/assets/icon/arrow-right.svg"
                    alt="readmore"
                  />
                </div>
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            {article?.category_name !== "Forum" ? (
              <div>
                <button
                  onClick={() => router.push(`/pi-circle/${article.id}`)}
                  className="z-20 hidden rounded-lg bg-pv-blue-dark px-6 py-2 text-sm font-semibold text-pv-white-pure hover:bg-pv-blue-light md:block"
                >
                  Inquiry
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
