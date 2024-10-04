import { Card, CardBody, CardImage } from "components/card";
import PageBody from "components/page/page-body";
import PopupBanner from "components/popup-banner";
import { Tabs } from "components/tabs";
import { TabDropdown } from "components/tabs/tab-dropdown";
import { TabListHeader } from "components/tabs/tab-list-header";
import { useAds } from "modules/ads/ads";
import { usePiNews } from "modules/home/api/pi-news";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "utils";
import { useApps } from "utils/api/get-apps";
import { APP_NAME } from "utils/constants";

const PiNewsCategory = () => {
  const APP = "pinews";
  const { data: ads } = useAds({
    appName: APP,
  });
  const appList = useApps();
  const appData = appList.data;
  const appName = appData?.find(
    (app) => app.app_name.trim() === APP_NAME.news.trim()
  );
  const router = useRouter();
  const { category } = router.query;
  
  const piNews = usePiNews({
    page: 1,
    limit: 100,
    category: category as any,
  });
  // console.log("Pinews",piNews);
  
  return (
    <>
      <div className="sticky left-0 right-0 top-14 z-20 flex h-16 justify-center bg-white xl:top-20">
        <PopupBanner app={APP} />
        <Tabs>
          <TabListHeader>
            {appName?.category.map((category, i) => (
                  category?.alias === 'pinspire' ? null : (
                    <TabDropdown
                      key={i}
                      subcategorys={category?.subcategory}
                      alias={category?.alias}
                    >
                      <div className="text-md xl:text-xl xl:font-medium">
                        {category?.category_name}
                      </div>
                  </TabDropdown>
                )
              ))}
          </TabListHeader>
        </Tabs>
      </div>
      <PageBody>
        <div className="mb-8 hidden grid-cols-7 gap-6 pt-3 lg:grid lg:w-2/3 xl:w-full">
          <div className="mx-auto w-full md:col-span-5">
            <div className="flex-1">
              {piNews.data
                ?.filter((v) => v.id)
                .map((g, i) => {
                  if (i == 0) {
                    return (
                      <div
                        key={i}
                        className="text-md xl:text-xl xl:font-medium"
                      >
                        <Link
                          href={`/pi-news/${g.id}`}
                          key={g.id}
                          className={cn("md:col-span-2", "md:row-span-2")}
                        >
                          <Card className="max-w-auto min-h-full">
                            <CardImage>
                              <Image
                                fill
                                quality={100}
                                src={g.thumbnail_image ?? ""}
                                alt={`Thumbnail ${g.title}`}
                                style={{ objectFit: "fill" }}
                              />
                            </CardImage>
                            <CardBody>
                              <p className="text-xl text-sky-800">{g.title}</p>
                              <p className="mb-4 truncate text-gray-600">
                                {g.description}
                              </p>
                              <p className="text-sm text-green-500">
                                {g.subcategory_name}
                              </p>
                            </CardBody>
                          </Card>
                        </Link>
                      </div>
                    );
                  } else {
                  }
                })}
              <div className="flex">
                <div className="px-auto grid grid-cols-1 gap-4 py-4 md:grid-cols-6">
                  {piNews.data
                    ?.filter((v) => v.id)
                    .map((item, index) => {
                      if (index == 0) {
                      } else {
                        return (
                          <Link
                            href={`/pi-news/${item.id}`}
                            key={item.id}
                            className={cn("md:col-span-2", "md:row-span-2")}
                          >
                            <Card className="min-h-full max-w-2xl">
                              <CardImage>
                                <Image
                                  fill
                                  src={item.thumbnail_image}
                                  alt={`Thumbnail ${item.title}`}
                                  style={{ objectFit: "cover" }}
                                />
                              </CardImage>
                              <CardBody>
                                <p className="h-14 text-xl text-sky-800 line-clamp-2">
                                  {item.title}
                                </p>
                                <p className="mb-4 text-gray-600 line-clamp-2">
                                  {item.description}
                                </p>
                                <p className="text-sm text-green-500">
                                  {item.subcategory_name}
                                </p>
                              </CardBody>
                            </Card>
                          </Link>
                        );
                      }
                    })}
                </div>
              </div>
            </div>

            <div className="sm:flex md:hidden">
              <div className="mx-auto w-full rounded ">
                <div className="items-center">
                  {ads
                    ?.filter((v) => v.type === "vertical")
                    .map((ad, i) => (
                      <div key={i} className="mb-6">
                        <a href={ad.url}>
                          <img
                            className="mx-auto w-full"
                            src={ad.image}
                            alt=""
                          />
                        </a>
                      </div>
                    ))}
                </div>

                <div className="items-center">
                  <div className="relative my-4 flex justify-center whitespace-nowrap py-2 text-start text-2xl text-sky-800 transition-all before:absolute before:bottom-0 before:z-0 before:h-2 before:w-full before:rounded before:bg-sky-800">
                    Latest News
                  </div>
                  <div>
                    {piNews.data
                      ?.filter((v) => v.publish_at)
                      .map((item, index) => {
                        const isLarge = index === 1;
                        return (
                          <Link
                            href={`/pi-news/${item.id}`}
                            key={item.id}
                            className={cn(
                              isLarge && "md:col-span-2",
                              isLarge && "md:row-span-2"
                            )}
                          >
                            <Card className="mx-auto my-4 w-full">
                              <CardImage>
                                <Image
                                  fill
                                  src={item.thumbnail_image}
                                  alt={`Thumbnail ${item.title}`}
                                  style={{ objectFit: "cover" }}
                                />
                              </CardImage>
                              <CardBody>
                                <p className="text-xl text-sky-800">
                                  {item.title}
                                </p>
                                {isLarge && (
                                  <p className="mb-4 truncate text-gray-600">
                                    {item.description}
                                  </p>
                                )}
                                <p className="text-sm text-green-500">
                                  {item.subcategory_name}
                                </p>
                              </CardBody>
                            </Card>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex">
            <div className="">
              <div className="items-center">
                {ads
                  ?.filter((v) => v.type === "vertical")
                  .map((ad, i) => (
                    <div key={i} className="mb-6">
                      <a href={ad.url}>
                        <img className="mx-auto w-full" src={ad.image} alt="" />
                      </a>
                    </div>
                  ))}
              </div>

              <div className="items-center">
                <div className="relative my-4 flex justify-center whitespace-nowrap py-2 text-start text-2xl text-sky-800 transition-all before:absolute before:bottom-0 before:z-0 before:h-2 before:w-full before:rounded before:bg-sky-800">
                  Latest News
                </div>
                <div>
                  {piNews.data
                    ?.filter((v) => v.publish_at)
                    .map((item, index) => {
                      const isLarge = index === 1;
                      return (
                        <Link
                          href={`/pi-news/${item.id}`}
                          key={item.id}
                          className={cn(
                            isLarge && "md:col-span-2",
                            isLarge && "md:row-span-2"
                          )}
                        >
                          <Card className="my-4 w-full xl:w-80">
                            <CardImage>
                              <Image
                                fill
                                src={item.thumbnail_image}
                                alt={`Thumbnail ${item.title}`}
                                style={{ objectFit: "cover" }}
                              />
                            </CardImage>
                            <CardBody>
                              <p className="text-xl text-sky-800">
                                {item.title}
                              </p>
                              {isLarge && (
                                <p className="mb-4 truncate text-gray-600">
                                  {item.description}
                                </p>
                              )}
                              <p className="text-sm text-green-500">
                                {item.subcategory_name}
                              </p>
                            </CardBody>
                          </Card>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-3 lg:hidden">
          <div>
            {piNews.data
              ?.filter((v) => v.id)
              .map((g, i) => (
                <div key={i} className="text-md xl:text-xl xl:font-medium">
                  <Link
                    href={`/pi-news/${g.id}`}
                    key={g.id}
                    className={cn("md:col-span-2", "md:row-span-2")}
                  >
                    <Card className="max-w-auto min-h-full">
                      <CardImage>
                        <Image
                          fill
                          quality={100}
                          src={g.thumbnail_image ?? ""}
                          alt={`Thumbnail ${g.title}`}
                          style={{ objectFit: "fill" }}
                        />
                      </CardImage>
                      <CardBody>
                        <p className="text-xl text-sky-800">{g.title}</p>
                        <p className="mb-4 truncate text-gray-600">
                          {g.description}
                        </p>
                        <p className="text-sm text-green-500">
                          {g.subcategory_name}
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                </div>
              ))}
          </div>
          <div>
            <div className="items-center">
              {ads
                ?.filter((v) => v.type === "vertical")
                .map((ad, i) => (
                  <div key={i} className="mb-6">
                    <a href={ad.url}>
                      <img className="mx-auto w-full" src={ad.image} alt="" />
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
};

export default PiNewsCategory;
