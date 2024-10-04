import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/select";
import React, { useState } from "react";
import { usePiCircleArticle } from "modules/pi-circle/pi-circle-article";
import { PiCircleForumCard } from "components/pi-circle-card/pi-circle-forum-card";
import { usePiCircleSubCategory } from "modules/pi-circle/pi-circle-subcategory";
import ForumForm from "components/forum-form/forum-form";
import Button from "components/button/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export const PiCircleForum = () => {
  const [subcategory, setSubCategory] = useState<string>();
  const [sort, setFilter] = useState<string>("new");
  const [search, setSearch] = useState<string>("");
  const [active, setActive] = React.useState("1");

  const { data } = usePiCircleArticle({
    category: "forum",
    sort: sort,
    search: search,
    subcategory: subcategory,
    limit: 9,
    page: active,
  });

  const total_page = data?.page.total_page ?? 0;

  const { data: categories, refetch } = usePiCircleSubCategory({
    categoryId: "18",
  });
  console.log(categories);
  

  const handleSortChange = (sort: string) => {
    setFilter(sort);
  };

  const handleCategoryChange = (subcategory: string) => {
    setSubCategory(subcategory);
  };

  const reset = () => {
    setFilter("new");
    setSubCategory(undefined);
    setSearch("");
  };

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

    setActive((activeNumber + 1).toString());
  };
  const prev = () => {
    const activeNumber = Number(active);
    if (activeNumber == 1) return;

    setActive((activeNumber - 1).toString());
  };

  return (
    <div>
      <div className="flex gap-5 xl:mt-5 xl:flex-wrap">
        <div className="flex flex-1 justify-end space-x-2">
          <Select value={sort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Terbaru" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">Terbaru</SelectItem>
              <SelectItem value="popular">Terpopuler</SelectItem>
              {/* <SelectItem value="filter-asc">A-Z</SelectItem>
              <SelectItem value="filter-desc">Z-A</SelectItem> */}
            </SelectContent>
          </Select>

          <Select value={subcategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Semua</SelectItem>
              {categories?.map((category, i) => (
                <SelectItem key={i} value={`${category.alias}`}>
                  {category.subcategory_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button onClick={reset} className="mb-3">
            <span className="text-xs font-medium text-pv-blue-dark xl:text-base">
              Reset
            </span>
          </button>
        </div>
        <div className="hidden xl:block">
          <ForumForm refetch={refetch} />
        </div>
        {/* <div className="hidden w-full min-w-[250px] xl:block xl:w-fit">
          <SearchInput onChangeText={handleSearchChange} />
        </div> */}
      </div>
      {/* <div className="mt-4 w-full min-w-[250px] xl:hidden xl:w-fit">
        <SearchInput onChangeText={handleSearchChange} />
      </div> */}
      <div className="mb-2 mt-4 flex justify-end xl:hidden">
        <ForumForm refetch={refetch} />
      </div>
      <div>
        <div className="mt-4 xl:mt-10">
          {data?.data?.map((group) => (
            <PiCircleForumCard key={group.id} article={group as never} />
          ))}
        </div>
      </div>
      {
        total_page > 1 && (
          <>
            <div className="mt-5 hidden justify-center xl:flex">
            {
              Number(active) !== 1 && (
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center gap-2 rounded-full"
                  onClick={prev}
                  disabled={active === "1"}
                >
                  <div className="flex">
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />{" "}
                    {/* <span className="ml-2">Sebelumnya</span> */}
                  </div>
                </Button>
              )
            }

              <div className="mx-4 flex items-center gap-2">
                {data?.page?.links[0]?.label == null ? (
                  <Button {...getItemProps("1")}>{data?.page?.current_page}</Button>
                ) : (
                  data?.page?.links?.map((items, i) => (
                    <Button key={i} {...getItemProps(items?.label)}>
                      {items?.label}
                    </Button>
                  ))
                )}
              </div>

              {
                Number(active) !== total_page && (
                  <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-2 rounded-full"
                    onClick={next}
                    disabled={active == data?.page?.total_page.toString()}
                  >
                    <div className="flex">
                      {/* <span className="mr-2">Selanjutnya</span> */}
                      <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </div>
                  </Button>
                )
              }
            </div>
            <div className="mx-auto mt-5 flex justify-center xl:hidden">
            {
              Number(active) !== 1 && (
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center gap-2 rounded-full px-3 text-xs"
                  onClick={prev}
                  disabled={active === "1"}
                >
                  <div className="flex">
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />{" "}
                    {/* <span className="ml-2">Sebelumnya</span> */}
                  </div>
                </Button>
              )
            }
              <div className="mx-4 flex items-center gap-2">
                {data?.page?.links[0]?.label == null ? (
                  <Button {...getItemProps("1")}>{data?.page?.current_page}</Button>
                ) : (
                  <Button {...getItemProps(data?.page?.current_page.toString())}>
                    {data?.page?.current_page}
                  </Button>
                )}
              </div>
              {
                Number(active) !== total_page && (
                  <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-2 rounded-full px-3 text-xs"
                    onClick={next}
                    disabled={active == data?.page?.total_page.toString()}
                  >
                    <div className="flex">
                      {/* <span className="mr-2">Selanjutnya</span> */}
                      <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </div>
                  </Button>
                )
              }
            </div>
          </>
        )
      }
    </div>
  );
};
