import { QueryClient, dehydrate } from "@tanstack/react-query";
import ProgramMenu from "modules/home/components/program-menu";
import SectionBanner from "modules/home/components/section-banner";
import SectionPiCapital from "modules/home/components/section-pi-capital";
import SectionPiCircle from "modules/home/components/section-pi-circle";
import SectionPiEvent from "modules/home/components/section-pi-event";
import SectionPiLearning from "modules/home/components/section-pi-learning";
import SectionPiNews from "modules/home/components/section-pi-news";
import SectionPiSpace from "modules/home/components/section-pi-space";
import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useApps } from "utils/api/get-apps";
import PopupBanner from "components/popup-banner";
import { appx } from "utils/get-apps";
import SectionPiCastLimitYoutube from "modules/home/components/section-pi-cast-limit-youtube";
import { ActiveTabProvider } from "modules/home/context/active-tab-provider";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const Home = ({}: Props) => {
  const apps = useApps();
  const getApps = appx;
  const APP = "homepage";

  return (
    <>
      <Head>
        <title>Pinvest</title>
        <meta name="description" content="Pinvest" />
      </Head>
      <PopupBanner app={APP} />
      <SectionBanner />
      <ProgramMenu data={getApps as never} />
      <ActiveTabProvider>
        <SectionPiLearning data={apps.data as never} />
      </ActiveTabProvider>
      <ActiveTabProvider>
        <SectionPiCircle data={apps.data as never} />
      </ActiveTabProvider>
      <SectionPiSpace />
      <ActiveTabProvider>
        <SectionPiCapital data={apps.data as never} />
      </ActiveTabProvider>
      <ActiveTabProvider>
        <SectionPiEvent data={apps.data as never} />
      </ActiveTabProvider>
      <ActiveTabProvider>
        <SectionPiNews data={apps.data as never} />
      </ActiveTabProvider>
      <SectionPiCastLimitYoutube />
    </>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  const prefetchApps = useApps.prefetch(queryClient);

  await prefetchApps;

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;

