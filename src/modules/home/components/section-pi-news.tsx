import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Button from "components/button/button";
import PiNewsCard from "components/pi-news-card/pi-news-card";
import Stock from "components/stock/stock";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "components/tabs";
import Typo from "components/typo/typo";
import Link from "next/link";
import type { Key } from "react";
import { memo, useContext, useEffect, useState } from "react";
import { APP_NAME } from "utils/constants";
import type { PiNewsParams } from "../api/pi-news";
import { usePiNews } from "../api/pi-news";
import { ActiveTabContext } from "../context/active-tab-context";
import { PiNews } from "./program-menu-icon";
import PiNewsHeadlineCard from "components/pi-news-card/pi-news-headline-card";

type Props = {
  data: {
    app_name: string;
    category: {
      id: number;
      alias: string;
      category_name: string;
    }[];
  }[];
};
const SectionPiNews = ({ data }: Props) => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);

  const piNewsParams: PiNewsParams = {
    page: 1,
    limit: 4,
    category: "financialeconomic",
  };
  const [newPiNewsParams, setNewPiNewsParams] = useState(piNewsParams);
  const piNews = usePiNews(newPiNewsParams);
  const appName = data?.find(
    (app) => app.app_name.trim() === APP_NAME.news.trim()
  );
  console.log(appName);
  
  

  return (
    <div className="flex justify-center">
      <div
        className={`w-full bg-pv-white-pure p-3 xl:max-w-[1440px] xl:px-[70px]`}
      >
        <div className="block md:grid md:grid-cols-2 md:gap-5">
          <div className="md:col-span-2">
            <div className="mb-4 hidden items-center justify-between xl:flex">
              <PiNews />
            </div>
            <div className="flex items-center justify-between xl:hidden">
              <PiNews />
            </div>
            <Tabs
              onChangeTab={(tab) => {
                const alias = appName?.category[tab]?.alias;
                // const subcategory =
                //   (appName as any)?.category[tab]?.subcategory[0]?.alias ?? "";
                setActiveTab(alias || "");
                const param = { category: alias };
                // console.log(param);
                
                setNewPiNewsParams({ ...piNewsParams, ...param });
              }}
            >
              <TabList>
                {appName?.category.map((category, i) =>
                  category.category_name === "PiNSpire" ? null : (
                    <Tab key={i}>
                      <p className="text-[11px] md:text-xl md:font-medium mr-1">
                        {category.category_name}
                      </p>
                    </Tab>
                  )
                )}
              </TabList>
              <div className="h-3" />
              <div className="block gap-4 lg:grid lg:grid-cols-7">
                <div className="lg:col-span-5">
                  <TabPanels>
                    {appName?.category
                      .filter((cat) => cat.category_name !== piNewsParams.category)
                      .map((category) => {
                        return (
                          <TabPanel key={category.id}>
                            <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
                              <div className="col-span-3">
                              {piNews.data && piNews.data[0] && (
                                <>
                                {console.log("ahjsaj",piNews.data)
                                }
                                  <PiNewsHeadlineCard
                                    article={piNews.data[0]}
                                  />
                                </>
                              )}
                              </div>
                              <div className="hidden no-scrollbar md:flex md:flex-col justify-between">
                                {piNews.data?.map(
                                  (
                                    article: { id: Key | null | undefined },
                                    index: number
                                  ) =>
                                    index !== 0 && (
                                      <PiNewsCard
                                        key={article.id}
                                        article={article as never}
                                        withDescription={false}
                                      />
                                    )
                                )}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 md:hidden mt-3">
                              {piNews.data?.map((article) => (
                                <PiNewsCard
                                  key={article.id}
                                  article={article as never}
                                  imgClassName="h-[100px] xl:h-auto"
                                />
                              ))}
                            </div>
                          </TabPanel>
                        );
                      })}
                  </TabPanels>
                </div>
                <div className="lg:col-span-2 mt-5 lg:mt-0">
                  <Stock />
                </div>
              </div>
            </Tabs>
          </div>
        </div>
        <div className="mt-2 flex items-end justify-end text-gray-600 hover:text-pv-grey-dark3 xl:hidden ">
            <Link
              href={activeTab ? `/pi-news-category/${activeTab}` : `/pi-news`}
            >
              <Typo.S2 className="font-semibold">
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-end gap-2 rounded-md mt-10"
                >
                  Lihat semua
                  <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
              </Typo.S2>
            </Link>
          </div>
        <div className="mt-2 hidden items-center justify-end text-gray-600 hover:text-pv-grey-dark3 xl:flex">
          <Link
            href={activeTab ? `/pi-news-category/${activeTab}` : `/pi-news`}
          >
            <Typo.H6 className="m-0 font-semibold">
              <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-2 mt-10"
              >
                Lihat semua
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </Typo.H6>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(SectionPiNews);
