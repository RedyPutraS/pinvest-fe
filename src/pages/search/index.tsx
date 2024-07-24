/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "components/input/input";
import { PiLearningCard } from "components/pi-learning-card/pi-learning-card";
import { WebinarCard } from "components/pi-learning-card/webinar-card";
import useDebounce from "hooks/use-debounce";
import { useSearch } from "modules/search/search";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { cn } from "utils";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const debounceValue = useDebounce(searchText, 500);
  const { data, refetch } = useSearch({ search: searchText });
  const router = useRouter();
  const onChangeText = (text: string) => {
    setSearchText(text);
    if (text.length > 2) {
      refetch();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onChangeText?.(debounceValue), [debounceValue]);

  return (
    <>
      <div className={cn("z-50 bg-white")}>
        <div className="flex cursor-pointer justify-end p-4">
          <img
            src="/assets/icon/close.svg"
            className="h-10 w-10 "
            onClick={() => router.back()}
            alt={"close icon"}
          />
        </div>
        <div className="px-[20%]">
          <Input
            placeholder="Search"
            name="searchbar"
            classNameContainer="bg-pv-grey-light1 hover:bg-pv-white-pure"
            className="bg-inherit text-[16px] placeholder:font-light"
            preInput={
              <img
                src="/assets/icon/magnify.svg"
                alt="search icon"
                className="mr-2"
              />
            }
            onChange={(e) => setSearchText(e.target.value)}
          />
          <h1 className="mt-4 text-lg">Result :</h1>
          {data?.length === 0 ? (
            <div className="flex justify-center">
              Hasil pencarian tidak ada.
            </div>
          ) : (
            <div className="grid grid-cols-4">
              {data?.map((item: any, i) => (
                <div key={i}>
                  {item.result_type === "article" ? (
                    <PiLearningCard
                      key={item.id}
                      id={item.id.toString()}
                      title={item.title}
                      description={item.description}
                      thumbnail={item.thumbnail_image}
                      subcategory={item.subcategory_name ?? ""}
                      publishedAt={item.publish_at}
                    />
                  ) : (
                    <WebinarCard
                      key={i}
                      event={item as never}
                      category={item.result_type}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
