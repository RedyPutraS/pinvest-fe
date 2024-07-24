import { PiLearningCard } from "components/pi-learning-card/pi-learning-card";
import { PiLearningCardSlider } from "components/pi-learning-card/pi-learning-card-slider";
import Section from "components/section/section";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "components/tabs";
import { APP_NAME } from "utils/constants";
import type { BannerParams } from "../api/banner";
import { useBanner } from "../api/banner";
import { memo, useContext, useEffect, useState } from "react";
import { WebinarCard } from "components/pi-learning-card/webinar-card";
import type { OnlineCourseParams } from "../api/online-course";
import { useOnlineCourse } from "../api/online-course";
import { useArticles } from "modules/pi-learning/api/articles";
import type { PiLearningParams } from "../api/pi-learning";
import { usePiLearning } from "../api/pi-learning";
import { PiLearning } from "./program-menu-icon";
import { fillSpace } from "utils/helpers/fillspace";
import PiLearningSlider from "components/image-slider/pi-learning-slider";
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
const SectionPiLearning = ({ data }: Props) => {
  const { setActiveTab } = useContext(ActiveTabContext);
  useEffect(() => {
    setActiveTab("article");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appName = data?.find(
    (app) => app.app_name.trim() === APP_NAME.learning.trim()
  );

  const bannerPiLearningParams: BannerParams = {
    tab: "pilearning",
  };
  const piArticleParams = {
    page: 1,
    filter: null,
    search: null,
    category: "article",
    limit: 6,
  };
  const piLearningParams: PiLearningParams = {
    page: 1,
    limit: 6,
    category: "webinar",
  };
  const onlineCourseParams: OnlineCourseParams = {
    page: 1,
    limit: 6,
  };
  const [newPiArticleParams, setNewPiArticleParams] = useState(piArticleParams);
  const [newPiLearningParams, setNewPiLearningParams] =
    useState(piLearningParams);
  const bannerPiLearning = useBanner(bannerPiLearningParams);
  const piArticles = useArticles(newPiArticleParams);
  const piLearning = usePiLearning(newPiLearningParams);
  const onlineCourse = useOnlineCourse(onlineCourseParams);
  const onChangeTab = (tab: number, category: string): void => {
    setActiveTab(category);
    if (tab === 0) {
      setNewPiArticleParams({
        ...piArticleParams,
        category: category,
        limit: 6,
      });
    } else {
      setNewPiLearningParams({
        ...piLearningParams,
        category: category,
        limit: 6,
      });
    }
  };

  return (
    <Section
      title="PiLearning"
      href="/pi-learning/"
      variant="white"
      icon={<PiLearning />}
    >
      <Tabs
        onChangeTab={(tab) => {
          const category = appName?.category[tab]?.alias || "";
          onChangeTab(tab, category);
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
        <div className="h-4" />
        <TabPanels>
          {appName?.category.map((category, i) => {
            return (
              <TabPanel key={category.id}>
                {i === 0 &&
                  bannerPiLearning.data &&
                  bannerPiLearning.data.length > 0 && (
                    <div className="h-full w-full object-contain md:object-cover">
                      <PiLearningSlider items={bannerPiLearning.data} rounded />
                    </div>
                  )}
                {category.alias === "article" ? (
                  <PiLearningCardSlider>
                    {piArticles.data?.map((article) => (
                      <PiLearningCard
                        key={article.id}
                        id={article.id.toString()}
                        title={article.title}
                        description={article.description}
                        thumbnail={article.thumbnail_image}
                        subcategory={article.subcategory_name ?? ""}
                        publishedAt={article.publish_at}
                        rate={article as never}
                      />
                    ))}
                    {fillSpace(piArticles.data?.length)}
                  </PiLearningCardSlider>
                ) : category.alias === "onlinecourse" ? (
                  <PiLearningCardSlider>
                    {onlineCourse.data?.map((event, i) => (
                      <WebinarCard
                        key={i}
                        event={event as never}
                        category={category.alias}
                        className="mx-2"
                      />
                    ))}
                    {fillSpace(onlineCourse.data?.length)}
                  </PiLearningCardSlider>
                ) : (
                  <PiLearningCardSlider>
                    {piLearning.data?.map((event, i) => (
                      <WebinarCard
                        key={i}
                        event={event as never}
                        category={category.alias}
                        className="mx-2"
                      />
                    ))}
                    {fillSpace(piLearning.data?.length)}
                  </PiLearningCardSlider>
                )}
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </Section>
  );
};
export default memo(SectionPiLearning);
