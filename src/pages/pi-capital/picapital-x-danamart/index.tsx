import { QueryClient, dehydrate } from "@tanstack/react-query";
import PageBody from "components/page/page-body";
import PageHeader from "components/page/page-header";
import type { InferGetServerSidePropsType } from "next";
import { PageContext } from "components/page/page-context";
import { useAds } from "modules/ads/ads";
import PopupBanner from "components/popup-banner";
import { CustomHead } from "components/custom-head/custom-head";
import ShareButton from "components/icon/share-button";
import Button from "components/button/button";
import Link from "next/link";

const TYPE = "article";
const APP = "picapital";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

function PiCapitalDetail({ adsParam }: Props) {
  const { data: ads } = useAds(adsParam);
  return (
    <>
      <CustomHead title="" image={""} />
      <PageContext.Provider value={{ id: "id", type: TYPE, app: APP }}>
        <PopupBanner app={APP} />
        <PageHeader className="bg-transparent">
          <img
            src={
              "https://pinvestbucket.s3.ap-southeast-2.amazonaws.com/logo+picapital+x+danamart.png"
            }
            alt=""
          />
        </PageHeader>
        <PageBody>
          <div className="grid grid-cols-3 gap-4 xl:grid-cols-4">
            <div className="col-span-3">
              <div className="flex justify-between border-pv-grey-medium3 xl:border-b-[1px] xl:pb-4">
                <div className="flex h-[56px] items-center">
                  <div className="font-semibold xl:text-4xl">{"PiCapital"}</div>
                </div>
                <div className="h-[56px] items-center flex justify-center">
                  <Link
                    href={"https://dev.danamart.id/website-pinvest/"}
                    target="_blank"
                  >
                    <Button size="m">
                      <div className="text-md font-medium">Daftar</div>
                    </Button>
                  </Link>
                  <ShareButton
                    className="ml-3 md:w-[50px] md:h-[45px] lg:w-[50px] lg:h-[50px] h-20px"
                    path={`/pi-capital/picapital-x-danamart`}
                  />
                </div>
              </div>
              <div className="pv-desc py-2 text-xs text-gray-600 md:text-lg">
                <p>
                  Pinvest (Pintar Investasi Bisnis dan Teknologi) dan Danamart
                  (Dana Aguna Nusantara) berkolaborasi menghadirkan sebuah
                  solusi finansial bernama PiCapital pada portal Pinvest.
                </p>
                <br />
                <p>
                  Dalam kolaborasi ini Pinvest dan Danamart ingin memberikan
                  peluang yang luas bagi masyarakat Indonesia dan juga pengusaha
                  dalam negeri untuk memperoleh pendanaan alias modal usaha atau
                  dapat berperan sebagai investor dengan modal investasi yang
                  dapat disesuaikan dengan kemampuan.{" "}
                </p>
                <br />
                <p>
                  Danamart sendiri telah menerima izin dari Otoritas Jasa
                  Keuangan (OJK), regulator keuangan Indonesia, untuk
                  mengoperasikan layanan sekuritas crowdfunding (urun dana).
                </p>
                <br />
                <p>
                  PiCapital bersama Danamart dapat memberikan modal usaha kepada
                  usaha kecil mikro (UKM) hingga Rp10 miliar atau US$677.700.
                </p>
                <br />
                <p>
                  Silakan klik tautan
                  <Link
                    href={"https://dev.danamart.id/website-pinvest/"}
                    target="_blank"
                    className="mx-2 font-semibold text-blue-500 hover:underline"
                  >
                    disini
                  </Link>
                  untuk mempelajari simulasi investasi jika Anda ingin menjadi
                  seorang Investor.
                </p>
                <br />
                <b>Investasi bebas worry, Bisnismu lebih extraordinary!</b>
              </div>
              <div className="mb-4 flex h-[56px] items-center xl:hidden">
                <div className="flex-1"></div>
              </div>
            </div>
            <div className="col-span-1 hidden xl:block">
              {ads
                ?.filter((v) => v.type === "vertical")
                .map((ad, i) => (
                  <div key={i} className="mb-6">
                    <a href={ad.url}>
                      <img src={ad.image} alt="" />
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </PageBody>
      </PageContext.Provider>
    </>
  );
}

export default PiCapitalDetail;

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  const adsParam = {
    appName: APP,
  };
  const prefetchAds = useAds.prefetch(queryClient, adsParam);
  await prefetchAds;
  return {
    props: {
      adsParam,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
