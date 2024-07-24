import PiNewsCard from "components/pi-news-card/pi-news-card";
import { useInfinitePiNews } from "modules/home/api/pi-news";
import InfiniteScroll from "react-infinite-scroll-component";

const ArticleTabPanel = () => {
  const { data, fetchNextPage, hasNextPage, isInitialLoading } =
    useInfinitePiNews({ category: "pinspire", limit: 3 });
  return (
    <div className="mt-4">
      {isInitialLoading ? (
        <h4 className="py-4 text-center text-lg">Loading...</h4>
      ) : (
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={data?.pages.length ?? 0}
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          loader={<h4 className="py-4 text-center text-lg">Loading...</h4>}
        >
          {data?.pages.map((group, gi) => (
            <div key={gi} className="grid gap-4 xl:grid-cols-3">
              {group.map((article) => (
                <PiNewsCard
                  key={article.id}
                  article={article as never}
                  imgClassName="xl:h-[300px]"
                  variant="large"
                />
              ))}
            </div>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ArticleTabPanel;
