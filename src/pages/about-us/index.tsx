/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, dehydrate } from "@tanstack/react-query";
import RenderHtml from "components/render-html";
import { useAboutUs, type AboutUsParams } from "modules/general/api/about-us";
import type { InferGetServerSidePropsType } from "next";
import Link from "next/link";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const AboutUs = ({ params }: Props) => {
  const { data } = useAboutUs(params);

  return (
    <div>
      <section className="mx-auto mb-8 w-screen p-3 xl:max-w-[1440px] xl:px-[70px]">
        <div className="pb-2 text-2xl font-medium">{data?.title}</div>
        <RenderHtml
          html={data?.content ?? ""}
          className="text-pv-grey-medium3"
        />
        <div className="mt-10 flex">
          <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-pv-grey-light1">
            <img
              src="/assets/icon/map-dark-blue.svg"
              className="w-10 fill-pv-blue-dark"
              alt=""
            />
          </div>
          <div className="ml-2 flex-1">
            <p className="font-semibold">Alamat</p>
            <p className="break-words text-sm ">
              Neo Soho Podomoro City Jl. Letjen S. Parman Kav.28, RT.3 RW.5,
              Tanjung Duren Selatan, Grogol Petamburan, Jakarta Barat 11470
            </p>
            <Link
              href={
                "https://www.google.com/maps/place/Neo+Soho+Central+Park/@-6.1749577,106.7874385,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f65ee1c07a31:0x2c4c67f4d94e8e65!8m2!3d-6.174963!4d106.7900134!16s%2Fg%2F11c5214j3m?entry=ttu"
              }
              target="_blank"
              className="text-sm text-pv-blue-dark"
            >
              Lihat Maps
            </Link>
          </div>
        </div>
        <div className="mt-10">
          <h1 className="mb-4 text-2xl font-semibold">Kontak</h1>
          <div className="gap-4 md:flex-grow lg:grid lg:grid-cols-2">
            <div className="flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-pv-grey-light1">
                <img
                  src="/assets/icon/email.svg"
                  className="w-10 fill-pv-blue-dark"
                  alt=""
                />
              </div>
              <div className="ml-2 flex-1">
                <p className="font-semibold text-pv-grey-medium3">E-Mail</p>
                <p className="text-2xl text-gray-600">
                  <Link
                    href={
                      "https://mail.google.com/mail/?view=cm&fs=1&to=support@pinvest.co.id"
                    }
                    target="_blank"
                  >
                    support@pinvest.co.id
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-pv-grey-light1">
                <img
                  src="/assets/icon/wa-dark-blue.svg"
                  className="w-10 fill-pv-blue-dark"
                  alt=""
                />
              </div>
              <div className="ml-2 flex-1">
                <p className="font-semibold text-pv-grey-medium3">WhatsApp</p>
                <p className="text-2xl text-gray-600">
                  <Link
                    href={
                      "https://wa.me/628111177374?text=Hi%20Minvest%2C%20tolong%20info%20lengkapnya%20ya"
                    }
                    target="_blank"
                  >
                    +62 811-1177-374
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mt-20">
          <h1 className="mb-4 text-2xl font-semibold">Galeri</h1>
          <span className="flex justify-center">
            <GaleriSlider>
              {gallery?.data?.map((item: any, i) => {
                return (
                  <img
                    key={i}
                    src={item?.image}
                    alt=""
                    className="rounded-xl"
                  />
                );
              })}
            </GaleriSlider>
          </span>
        </div> */}
      </section>
    </div>
  );
};
export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  const params: AboutUsParams = {
    category: "about-us",
  };

  await useAboutUs.prefetch(queryClient, params);
  return {
    props: { params, dehydratedState: dehydrate(queryClient) },
  };
};
export default AboutUs;
