import { PiEventCard } from "components/pi-event-card/pi-event-card";
import PiEventCardSlider from "components/pi-event-card/pi-event-card-slider";
import PiEventMenuSlider from "components/pi-event-menu/pi-event-menu-slider";
import Section from "components/section/section";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "components/tabs";
import Typo from "components/typo/typo";
import type { PiEventParams } from "../api/pi-events";
import { usePiEvents } from "../api/pi-events";
import { APP_NAME } from "utils/constants";
import { memo, useContext, useEffect, useState } from "react";
import { PiEvent } from "./program-menu-icon";
import { fillSpace } from "utils/helpers/fillspace";
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

const SectionPiEvent = ({ data }: Props) => {
  const { setActiveTab } = useContext(ActiveTabContext);
  useEffect(() => {
    setActiveTab("all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const piEventParams: PiEventParams = {
    page: 1,
    limit: 6,
  };
  const [newPiEventParams, setNewPiEventParams] = useState(piEventParams);
  const piEvents = usePiEvents(newPiEventParams);
  const appName = data?.find(
    (app) => app.app_name.trim() === APP_NAME.event.trim()
  );

  return (
    <Section
      title="PiEvent"
      href="/pi-event?category="
      variant="white"
      icon={<PiEvent />}
    >
      <Tabs
        onChangeTab={(tab) => {
          let param = {};
          let category = "all";
          switch (tab) {
            case 1:
              param = {
                type: "online",
                limit: 6,
              };
              category = "all";
              break;
            case 2:
              param = {
                time: "day",
                limit: 6,
              };
              category = "today";
              break;
            case 3:
              param = {
                time: "week",
                limit: 6,
              };
              category = "week";
              break;
            case 4:
              param = {
                price: "free",
                limit: 6,
              };
              break;
          }
          setActiveTab(category);
          setNewPiEventParams({ ...piEventParams, ...param });
        }}
      >
        <TabList>
          <Tab>
            <div className="text-[11px] md:text-xl md:font-medium mr-1">Semua</div>
          </Tab>
          <Tab>
            <div className="text-[11px] md:text-xl md:font-medium mr-1">Online</div>
          </Tab>
          <Tab>
            <div className="text-[11px] md:text-xl md:font-medium mr-1">Hari Ini</div>
          </Tab>
          <Tab>
            <div className="text-[11px] md:text-xl md:font-medium mr-1">Minggu Ini</div>
          </Tab>
        </TabList>
        <TabPanels>
          {appName?.category.map((category, i) => {
            return (
              <TabPanel key={category.id}>
                {i === 0 && (
                  <div>
                    <Typo.S1 className="mb-2 mt-6 text-[24px] font-semibold text-gray-600">
                      Lihat Kategori Trending
                    </Typo.S1>
                    <PiEventMenuSlider
                      onClick={(category) => {
                        setNewPiEventParams({
                          ...piEventParams,
                          category: category.alias,
                        });
                      }}
                      categories={appName.category}
                    />
                  </div>
                )}
                <PiEventCardSlider>
                  {piEvents.data?.map((event) => (
                    <PiEventCard key={event.id} event={event as never} />
                  ))}
                  {fillSpace(piEvents.data?.length)}
                </PiEventCardSlider>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </Section>
  );
};

export default memo(SectionPiEvent);
