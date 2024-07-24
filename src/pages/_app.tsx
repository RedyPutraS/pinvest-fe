/* eslint-disable react-hooks/exhaustive-deps */
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useEffect, useState } from "react";
import { type AppType } from "next/dist/shared/lib/utils";
import {
  type DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "components/layout/layout";
import { Toaster } from "components/toast";
import ShareDialog from "components/icon/share-dialog";
import { useRouter } from "next/router";
export const ShareContext = createContext<{
  showDialog: boolean;
  openShareDialog?: (url: string) => void;
  setShowDialog?: Dispatch<SetStateAction<boolean>>;
  url: string;
}>({ showDialog: false, url: "" });
type Props = {
  children: ReactNode;
};
const ShareProvider = ({ children }: Props) => {
  const [url, setUrl] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const openShareDialog = (url: string) => {
    setShowDialog(true);
    setUrl(url);
  };
  return (
    <ShareContext.Provider
      value={{ showDialog, openShareDialog, setShowDialog, url }}
    >
      {children}
    </ShareContext.Provider>
  );
};
const MyApp: AppType<{ dehydratedState: DehydratedState }> = ({
  Component,
  pageProps,
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const router = useRouter();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setloading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setloading(false);
    });
    router.events.on("routeChangeError", () => {
      setloading(false);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
          <img src="/assets/img/pinvest-logo.png" alt="pinvest-logo" className="w-48 h-auto" />
        </div>
        ) : (
          <Layout>
            <ShareProvider>
              <Component {...pageProps} />
              <ShareDialog />
            </ShareProvider>
          </Layout>
        )}
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
};

export default MyApp;
