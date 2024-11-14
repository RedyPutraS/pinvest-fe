import { PiCapitalCard } from "components/pi-capital-card/pi-capital-card";
import { PiCapitalCardSlider } from "components/pi-capital-card/pi-capital-card-slider";
import Section from "components/section/section";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "components/tabs";
import { APP_NAME } from "utils/constants";
import { memo, useContext, useEffect, useState } from "react";
import type { PiCapitalParams } from "../api/pi-capital";
import { usePiCapital } from "../api/pi-capital";
import { PiCapital } from "./program-menu-icon";
import { ActiveTabContext } from "../context/active-tab-context";

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
const SectionPiCapital = ({ data }: Props) => {
  const { setActiveTab } = useContext(ActiveTabContext);
  useEffect(() => {
    setActiveTab("crowdfunding");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const piCapitalParams: PiCapitalParams = {
    page: 1,
    limit: 12,
    category: "crowdfunding",
  };
  const [newPiCapitalParams, setNewPiCapitalParams] = useState(piCapitalParams);
  const piCapital = usePiCapital(newPiCapitalParams);
  const appName = data?.find(
    (app) => app.app_name.trim() === APP_NAME.capital.trim()
  );
  return (
    <Section
      title="PiCapital"
      href="/pi-capital?category="
      icon={<PiCapital />}
    >
      <Tabs
        onChangeTab={(tab) => {
          const alias = appName?.category[tab]?.alias;
          setActiveTab(alias || "");
          const param = { category: alias };
          setNewPiCapitalParams({ ...piCapitalParams, ...param });
        }}
      >
        <TabList>
          {appName?.category.map((category, i) => (
            <Tab key={i}>
              <div className="text-[11px] md:text-xl md:font-medium mr-1">
                {category.category_name}
              </div>
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {appName?.category.map((category) => {
            return (
              <TabPanel key={category.id}>
                <PiCapitalCardSlider>
                  {piCapital.data?.length == 0 ? (
                    <PiCapitalCard
                      key={1}
                      isLargerIcon
                      article={
                        {
                          id: "picapital-x-danamart",
                          thumbnail_image: "/assets/img/picapitalxdanamart.png",
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
    </Section>
  );
};
export default memo(SectionPiCapital);
