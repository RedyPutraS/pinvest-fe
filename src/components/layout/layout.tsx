/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-page-custom-font */
import Footer from "components/footer/footer";
import { useState, type ReactNode, useEffect } from "react";
import Header from "../header/header";
import { useSearch } from "modules/search/search";
import { WebinarCard } from "components/pi-learning-card/webinar-card";
import { useRouter } from "next/router";
import { PiNewsSearchCard } from "components/pi-news-card/pi-news-search";

interface LayoutProps {
  children?: ReactNode;
}
export default function Layout(props: LayoutProps) {
  const router = useRouter();
  const { children } = props;
  const [searchText, setSearchText] = useState("");
  const { data, refetch, isLoading } = useSearch({ search: searchText });

  useEffect(() => {
    setSearchText("");
  }, [router?.asPath]);
  useEffect(() => {
    if (searchText.length > 2) {
      refetch();
    }
  }, [refetch, searchText]);

  return (
    <div>
      <Header
        onSearch={function (text: string): void {
          setSearchText(text);
        }}
      />
      {searchText.length > 0 ? (
        <div className="mb-10 flex justify-center">
          <div className="min-h-[46vh] w-screen xl:max-w-[1300px]">
            {data?.length === 0 || !data ? (
              <div className="mt-10 flex justify-center">
                {isLoading ? "Sedang mencari..." : "Hasil pencarian tidak ada."}
              </div>
            ) : (
              <div className="mx-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
                {data?.map((item: any, i) => (
                  <div key={i}>
                    {item.result_type === "article" ? (
                      <PiNewsSearchCard
                        key={item.id}
                        id={item.id.toString()}
                        title={item.title}
                        description={item.description}
                        thumbnail={item.thumbnail_image}
                        subcategory={item.subcategory_name ?? ""}
                        publishedAt={item.publish_at}
                      />
                    ) : (
                      <WebinarCard
                        key={i}
                        event={item as never}
                        category={item.result_type}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
      <Footer />
    </div>
  );
}
