import PageBody from "components/page/page-body";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "components/tabs";
import SectionBanner from "modules/home/components/section-banner";
import YouTubeTabPanel from "modules/pi-cast/youtube-tab-panel";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import PopupBanner from "components/popup-banner";
import ArticlePaginateTabPanel from "modules/pi-cast/article-paginate-tab-panel";
import SpotifyPaginateTabPanel from "modules/pi-cast/spotify-paginate-tab-panel";
import { useRef } from "react";

const PiCast = () => {
  const APP = "picast";
  const router = useRouter();
  const categories = ["youtube", "spotify", "pinspire"];
  const searchParams = useSearchParams();

  const category = searchParams?.get("category") ?? "youtube";
  const topRef = useRef(null);
  return (
    <>
      <SectionBanner tab="picast" />
      <PageBody>
        <PopupBanner app={APP} />
        <Tabs
          initActiveTab={categories.findIndex((v) => v === category) ?? 0}
          onChangeTab={(page) => {
            router.push(`/pi-cast?category=${categories[page]}`);
          }}
        >
          <div ref={topRef}></div>
          <div className="p-2 md:p-0">
            <TabList>
              <Tab>Youtube</Tab>
              <Tab>Spotify</Tab>
              <Tab>Artikel</Tab>
            </TabList>
          </div>
          <div className="h-3"></div>
          <TabPanels>
            <TabPanel>
              <YouTubeTabPanel />
            </TabPanel>
            <TabPanel>
              {/* <SpotifyTabPanel /> */}
              <SpotifyPaginateTabPanel />
            </TabPanel>
            <TabPanel>
              {/* <ArticleTabPanel /> */}
              <ArticlePaginateTabPanel />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </PageBody>
    </>
  );
};

export default PiCast;
