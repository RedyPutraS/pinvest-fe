import { PiCircleCard } from "components/pi-circle-card/pi-circle-card";
import { PiCircleCardSlider } from "components/pi-circle-card/pi-circle-card-slider";
import Section from "components/section/section";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "components/tabs";
import { memo, useContext, useEffect, useState } from "react";
import { APP_NAME } from "utils/constants";
import type { PiCircleParams } from "../api/pi-circle";
import { usePiCircle } from "../api/pi-circle";
import { PiCircle } from "./program-menu-icon";
import { fillSpace } from "utils/helpers/fillspace";
import { useRouter } from "next/navigation";
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
const SectionPiCircle = ({ data }: Props) => {
  const { setActiveTab } = useContext(ActiveTabContext);
  useEffect(() => {
    setActiveTab("directory");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const piCircleParams: PiCircleParams = {
    page: 1,
    limit: 6,
    category: "directory",
  };
  const [newPiCircleParams, setNewPiCircleParams] = useState(piCircleParams);
  const piCircle = usePiCircle(newPiCircleParams);
  const appName = data?.find(
    (app) => app.app_name.trim() === APP_NAME.circle.trim()
  );
  const router = useRouter();
  return (
    <Section title="PiCircle" href="/pi-circle?category=" icon={<PiCircle />}>
      <Tabs
        onChangeTab={(tab) => {
          const alias = appName?.category[tab]?.alias;
          setActiveTab(alias || "");
          const param = { category: alias };
          setNewPiCircleParams({ ...piCircleParams, ...param });
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
                <PiCircleCardSlider>
                  {piCircle.data?.map(function (article) {
                    const link =
                      category.alias.toLowerCase() === "forum"
                        ? `/pi-circle/forum/${article.id}`
                        : `/pi-circle/${article.id}`;
                    return (
                      <PiCircleCard
                        key={article.id}
                        article={article as never}
                        className="mx-2 mt-4 w-[240px]"
                        onInquiry={() => {
                          router.push(link);
                        }}
                        overrideLink={link}
                      />
                    );
                  })}
                  {fillSpace(piCircle.data?.length)}
                </PiCircleCardSlider>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </Section>
  );
};
export default memo(SectionPiCircle);
