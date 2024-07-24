import { PiCapitalCard } from "components/pi-capital-card/pi-capital-card";
import { PiCapitalCardSlider } from "components/pi-capital-card/pi-capital-card-slider";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "components/tabs";
import type { PiCapitalParams } from "modules/home/api/pi-capital";
import { usePiCapital } from "modules/home/api/pi-capital";
import PageBody from "components/page/page-body";
import PageHeader from "components/page/page-header";
import { useState } from "react";
import SectionBanner from "modules/home/components/section-banner";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useApps } from "utils/api/get-apps";

function PiCapital() {
  const appList = useApps();
  const appData = appList.data;
  const piCapitalApp =
    appData && appData.find((app) => app.alias === "picapital");
  const categories = piCapitalApp ? piCapitalApp.category : [];
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams?.get("category") ?? "directory";
  const piCapitalParams: PiCapitalParams = {
    page: 1,
    limit: 12,
    category: category ?? "crowdfunding",
  };
  const [newPiCapitalParams, setNewPiCapitalParams] = useState(piCapitalParams);
  const piCapital = usePiCapital(newPiCapitalParams);

  return (
    <>
      <PageHeader className="xl:h-auto">
        <SectionBanner tab="picapital" />
      </PageHeader>
      <PageBody>
        <Tabs
          initActiveTab={categories.findIndex((v) => v.alias === category) ?? 0}
          onChangeTab={(tab) => {
            router.push(`/pi-capital?category=${categories[tab]?.alias}`);
            const param = { category: categories[tab]?.alias };
            setNewPiCapitalParams({ ...piCapitalParams, ...param });
          }}
        >
          <TabList>
            {categories.map((category, i) => (
              <Tab key={i}>
                <div className="text-md xl:text-xl xl:font-medium">
                  {category.category_name}
                </div>
              </Tab>
            ))}
          </TabList>
          {/* <div className="h-3"></div> */}
          <TabPanels>
            {categories.map((category) => {
              return (
                <TabPanel key={category.alias}>
                  <PiCapitalCardSlider>
                    {piCapital.data?.length == 0 ? (
                      <PiCapitalCard
                        key={1}
                        isLargerIcon
                        article={
                          {
                            id: "picapital-x-danamart",
                            thumbnail_image:
                              "/assets/img/picapitalxdanamart.png",
                            title: "PiCapital x Danamart",
                          } as never
                        }
                      />
                    ) : (
                      piCapital.data?.map((article) => (
                        <PiCapitalCard
                          key={article.id}
                          article={article as never}
                        />
                      ))
                    )}
                  </PiCapitalCardSlider>
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </PageBody>
    </>
  );
}

export default PiCapital;
