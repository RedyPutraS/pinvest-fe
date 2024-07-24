import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/select";
import React, { useState } from "react";
import { usePiCircleArticle } from "modules/pi-circle/pi-circle-article";
import { PiCircleCard } from "components/pi-circle-card/pi-circle-card";
import { usePiCircleSubCategory } from "modules/pi-circle/pi-circle-subcategory";
import InquiryDialog from "modules/pi-capital/components/inquiry-dialog";
import Button from "components/button/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export const PiCircleDirectory = () => {
  const [subcategory, setSubCategory] = useState<string>();
  const [sort, setFilter] = useState<string>();
  const [search, setSearch] = useState<string>();
  const [active, setActive] = React.useState("1");

  const { data } = usePiCircleArticle({
    sort: sort,
    page: active,
    category: "directory",
    search: search,
    subcategory: subcategory,
    limit: 9,
  });

  const { data: categories } = usePiCircleSubCategory({
    categoryId: "17",
  });

  const handleSortChange = (sort: string) => {
    setFilter(sort);
  };

  const handleCategoryChange = (subcategory: string) => {
    setSubCategory(subcategory);
  };

  const reset = () => {
    setFilter(undefined);
    setSubCategory(undefined);
    setSearch(undefined);
  };

  const [selectedId, setSelectedId] = useState<string>("");
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);

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
      <InquiryDialog
        id={selectedId}
        app={"picircle"}
        showDialog={inquiryDialogOpen}
        onClose={function (val: boolean): void {
          setInquiryDialogOpen(val);
        }}
      />
      <div className="mt-5 flex-wrap xl:flex">
        <div className="flex flex-1 justify-end">
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Terbaru" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">Terbaru</SelectItem>
              <SelectItem value="popular">Terpopuler</SelectItem>
              {/* <SelectItem value="title-asc">A-Z</SelectItem>
              <SelectItem value="title-desc">Z-A</SelectItem> */}
            </SelectContent>
          </Select>

          <Select onValueChange={handleCategoryChange}>
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
          <button onClick={reset}>
            <span className="text-xs font-medium text-pv-blue-dark xl:text-base">
              Reset
            </span>
          </button>
        </div>

        {/* <div className="w-full min-w-[50px] max-w-full  xl:w-[450px]">
          <SearchInput onChangeText={handleSearchChange} />
        </div> */}
      </div>

      <div>
        <div className="mt-6 grid grid-cols-2  gap-4 xl:mt-10 xl:grid-cols-3">
          {data?.data?.map((group) => (
            <PiCircleCard
              key={group.id}
              article={group as never}
              onInquiry={(id) => {
                setSelectedId(id);
                setInquiryDialogOpen(true);
              }}
            />
          ))}
        </div>
      </div>
      <div className="mt-5 hidden justify-center xl:flex">
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2 rounded-full"
          onClick={prev}
          disabled={active === "1"}
        >
          <div className="flex">
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />{" "}
            <span className="ml-2">Sebelumnya</span>
          </div>
        </Button>

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
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2 rounded-full"
          onClick={next}
          disabled={active == data?.page?.total_page.toString()}
        >
          <div className="flex">
            <span className="mr-2">Selanjutnya</span>
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </div>
        </Button>
      </div>
      <div className="mx-auto mt-5 flex justify-center xl:hidden">
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2 rounded-full px-3 text-xs"
          onClick={prev}
          disabled={active === "1"}
        >
          <div className="flex">
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />{" "}
            <span className="ml-2">Sebelumnya</span>
          </div>
        </Button>

        <div className="mx-4 flex items-center gap-2">
          {data?.page?.links[0]?.label == null ? (
            <Button {...getItemProps("1")}>{data?.page?.current_page}</Button>
          ) : (
            <Button {...getItemProps(data?.page?.current_page.toString())}>
              {data?.page?.current_page}
            </Button>
          )}
        </div>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2 rounded-full px-3 text-xs"
          onClick={next}
          disabled={active == data?.page?.total_page.toString()}
        >
          <div className="flex">
            <span className="mr-2">Selanjutnya</span>
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </div>
        </Button>
      </div>
    </div>
  );
};
