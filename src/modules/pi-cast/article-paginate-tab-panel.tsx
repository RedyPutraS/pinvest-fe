import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Button from "components/button/button";
import PiNspireCard from "components/pi-news-card/pi-inspire-card";
import { usePiCastPaginateArticle } from "modules/home/api/pi-news-paginate";
import React, { useEffect, useRef } from "react";

const ArticlePaginateTabPanel = () => {
  const [active, setActive] = React.useState("1");
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(active);
  }, [active])

  const { data, isInitialLoading } = usePiCastPaginateArticle({
    page: active,
    category: "pinspire",
    limit: 12,
  });

  const getItemProps = (index: string) =>
    ({
      variant: active === index ? "filled" : "text",
      color: active === index ? "bg-red-800" : "bg-blue-800",
      onClick: () => {
        if (index == "...") {
          return;
        }
        setActive(index);
      },
      className: "rounded-full",
    } as any);
  const next = () => {
    const activeNumber = Number(active);
    if (activeNumber == data?.page?.total_page) return;

    window.scrollTo(0, 0);
    setActive((activeNumber + 1).toString());
  };
  const prev = () => {
    const activeNumber = Number(active);
    if (activeNumber == 1) return;

    setActive((activeNumber - 1).toString());
  };
  return (
    <div className="mt-4">
      {isInitialLoading ? (
        <h4 className="py-4 text-center text-lg">Mohon Tunggu...</h4>
      ) : (
        <div>
          <div className="gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
            {data?.data?.map((article) => (
              <PiNspireCard
                key={article.id}
                article={article as never}
                imgClassName="xl:h-[240px]"
                variant="large"
                isCardHeight={true}
              />
            ))}
          </div>
          <div className="mt-5 flex justify-center">
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-2 rounded-full"
              onClick={prev}
              disabled={active === "1"}
            >
              <div className="hidden md:block">
                <div className="flex">
                  <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />{" "}
                  <span className="ml-2">Sebelumnya</span>
                </div>
              </div>
              <div className="md:hidden">
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
              </div>
            </Button>

            <div className="mx-4 flex items-center gap-2">
              {data?.page?.links[0]?.label == null ? (
                <Button {...getItemProps("1")}>
                  {data?.page?.current_page}
                </Button>
              ) : (
                data?.page?.links?.map((items, i) => (
                  <Button key={i} {...getItemProps(items?.label)}>
                    {items?.label}
                  </Button>
                ))
              )}
            </div>
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-2 rounded-full"
              onClick={next}
              disabled={active == data?.page?.total_page.toString()}
            >
              <div className="hidden md:block">
                <div className="flex">
                  <span className="mr-2">Selanjutnya</span>
                  <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </div>
              </div>
              <div className="md:hidden">
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlePaginateTabPanel;
