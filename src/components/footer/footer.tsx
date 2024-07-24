import NewsletterBox from "components/newsletter-box/newsletter-box";
import SocialLink from "components/social-link/social-link";
import Typo from "components/typo/typo";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col items-center bg-pv-blue-dark px-3 text-white xl:py-6">
      <div className="flex w-full flex-col xl:max-w-[1300px] xl:flex-row xl:justify-between xl:gap-10">
        <div className="flex flex-col gap-4">
          <div>
            <Typo.H5 className="mb-1 mt-4 font-light">Privasi</Typo.H5>
          </div>
          <div className="flex flex-col gap-2">
            <Link href={"/copyright"}>
              <Typo.B1 className="cursor-pointer font-light opacity-80 hover:opacity-100">
                Hak Cipta
              </Typo.B1>
            </Link>
            <Link href={"/cyber"}>
              <Typo.B1 className="cursor-pointer font-light opacity-80 hover:opacity-100">
                Cyber
              </Typo.B1>
            </Link>
            <Link href={"/term-and-condition"}>
              <Typo.B1 className="cursor-pointer font-light opacity-80 hover:opacity-100">
                Syarat & Ketentuan
              </Typo.B1>
            </Link>
            <Link href={"/faq"}>
              <Typo.B1 className="cursor-pointer font-light opacity-80 hover:opacity-100">
                FAQ
              </Typo.B1>
            </Link>
            <Link href={"/membership"}>
              <Typo.B1 className="cursor-pointer font-light opacity-80 hover:opacity-100">
                Keanggotaan
              </Typo.B1>
            </Link>
            <Link href={"/about-us"}>
              <Typo.B1 className="cursor-pointer font-light opacity-80 hover:opacity-100">
                Tentang Kami
              </Typo.B1>
            </Link>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 xl:w-[300px]">
          <div>
            <Typo.H5 className="mb-1 mt-4 font-light ">Informasi</Typo.H5>
          </div>
          <div className="flex flex-col gap-4 font-light">
            <Link
              href={"https://maps.app.goo.gl/vf6FAjwUCQrBoPWS7"}
              target="_blank"
            >
              <div className="flex">
                <img
                  src="/assets/icon/address-white.png"
                  className="mr-2 mt-0 h-7 w-7"
                  alt=""
                />
                <Typo.B1>
                  Neo Soho Podomoro City
                  <br />
                  Jl. Letjen S. Parman Kav.28, RT.3 RW.5, Tanjung Duren Selatan,
                  Grogol Petamburan, Jakarta Barat 11470
                </Typo.B1>
              </div>
            </Link>
            <div className="flex">
              <img
                src="/assets/icon/email-white.png"
                className="mr-2 mt-0 h-7 w-7"
                alt=""
              />
              <Typo.B1>
                <Link
                  href={
                    "https://mail.google.com/mail/?view=cm&fs=1&to=support@pinvest.co.id"
                  }
                  target="_blank"
                >
                  support@pinvest.co.id
                </Link>
              </Typo.B1>
            </div>
            <div className="flex">
              <img
                src="/assets/icon/contact-white.png"
                className="mr-2 mt-0 h-7 w-7"
                alt=""
              />
              <Typo.B1>
                <Link
                  className="hover:underline"
                  target="_blank"
                  href={
                    "https://wa.me/628111177374?text=Hi%20Minvest%2C%20tolong%20info%20lengkapnya%20ya"
                  }
                >
                  +62 811-1177-374
                </Link>
              </Typo.B1>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 xl:w-[370px]">
          <div>
            <Typo.H5 className="mb-1 mt-4 font-light">Buletin</Typo.H5>
          </div>
          <div className="mt-1 flex flex-col gap-2">
            <NewsletterBox />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <Typo.H5 className="mb-1 mt-4 font-light">Ikuti Kami</Typo.H5>
          </div>
          <SocialLink />
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-4 xl:mt-10 xl:max-w-[1300px]">
        <div className="my-3 block h-[3px] w-full rounded-full bg-pv-grey-medium1 font-light" />
        <Typo.B1>Hak Cipta@2022 Pinvest. Seluruh Hak Dilindungi</Typo.B1>
      </div>
    </div>
  );
}
