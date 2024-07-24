import { Tabs } from "components/tabs";
import { TabDropdown } from "components/tabs/tab-dropdown";
import { TabListHeader } from "components/tabs/tab-list-header";
import NewsBanner from "modules/home/components/news-banner";
import TitleDivider from "modules/pi-news/components/common/title-divider";
import NewsGridView from "modules/pi-news/components/landing/grid-view";
import { useApps } from "utils/api/get-apps";
import { APP_NAME } from "utils/constants";
import PopupBanner from "components/popup-banner";
import PageBody from "components/page/page-body";

const PiNews = () => {
  const appList = useApps();
  const APP = "pinews";
  const appData = appList.data;
  const appName = appData?.find(
    (app) => app.app_name.trim() === APP_NAME.news.trim()
  );

  const onChangeTab = (tab: number, category: string): void => {
    if (tab === 0) {
      setNewsArticleParams({
        category: category,
        limit: 3,
      });
    } else {
      setNewsArticleParams({
        category: category,
        limit: 6,
      });
    }
  };

  return (
    <>
      <PageBody>
        <div className="sticky left-0 right-0 top-14 z-20 flex h-16 justify-center bg-white xl:top-20">
          <PopupBanner app={APP} />

          <Tabs
            onChangeTab={(tab) => {
              const category = appName?.category[tab]?.alias || "";
              onChangeTab(tab, category);
            }}
          >
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
        <div className="mb-4">
          <NewsBanner bannerIndex={0} />
        </div>
        <section className="container mx-auto my-10 px-4">
          <NewsGridView />
        </section>
        <div className="my-4">
          <NewsBanner bannerIndex={1} />
        </div>
        <section className="container mx-auto my-10 px-4">
          <div className="mt-10" />
          <TitleDivider>Berita Terbaru</TitleDivider>
        </section>

        <section className="container mx-auto my-10 px-4">
          <div className="mt-10" />
          <NewsGridView sortBy="asc" />
        </section>
        <div className="my-4">
          <NewsBanner bannerIndex={2} />
        </div>
        <section className="container mx-auto my-10 px-4">
          <div className="mt-10" />
          <TitleDivider>Berita Terhangat</TitleDivider>
          <div className="mt-10" />
          <NewsGridView sortBy="popular" />
        </section>
      </PageBody>
    </>
  );
};

export default PiNews;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setNewsArticleParams(_arg0: { category: string; limit: number }) {
  try {
    throw "";
  } catch (e) {}
}
