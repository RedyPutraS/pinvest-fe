import { useBannerByApp } from "modules/home/api/banner-by-app";
import React from "react";

type Props = {
  app?: any;
};

export default function Modal({ app }: Props) {
  const [showModal, setShowModal] = React.useState(true);
  const bannerImage = useBannerByApp({ app });

  if (bannerImage.data?.length != 0) {
    return (
      <>
        {showModal ? (
          <>
            <div className="fixed inset-0 z-30 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
              <div className="relative mx-auto w-4/5 md:h-3/4 xl:w-2/4">
                {/*content*/}
                <div className="relative rounded-lg  border-0 bg-white shadow-md outline-none focus:outline-none">
                  {/*header*/}

                  {/*body*/}
                  <div className="relative my-20">
                    {bannerImage.data?.map((data, i) => (
                      <div key={i} className="mb-6">
                        <div className="relative">
                          <div className="mx-auto w-full">
                            <a
                              href={`${data.ads_url}`}
                              key={i}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                className="mx-auto h-full w-full"
                                src={data?.image ?? ""}
                                alt=""
                              />
                            </a>
                            <button
                              className="absolute right-0 top-0 m-2 rounded bg-transparent p-2 font-semibold leading-none text-black outline-none hover:bg-red-600 focus:outline-none"
                              onClick={() => setShowModal(false)}
                            >
                              <svg
                                className="w-6"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.0001 22.3332L11.8334 30.4998C11.5279 30.8054 11.139 30.9582 10.6667 30.9582C10.1945 30.9582 9.80564 30.8054 9.50008 30.4998C9.19453 30.1943 9.04175 29.8054 9.04175 29.3332C9.04175 28.861 9.19453 28.4721 9.50008 28.1665L17.6667 19.9998L9.50008 11.8332C9.19453 11.5276 9.04175 11.1387 9.04175 10.6665C9.04175 10.1943 9.19453 9.80539 9.50008 9.49984C9.80564 9.19428 10.1945 9.0415 10.6667 9.0415C11.139 9.0415 11.5279 9.19428 11.8334 9.49984L20.0001 17.6665L28.1667 9.49984C28.4723 9.19428 28.8612 9.0415 29.3334 9.0415C29.8056 9.0415 30.1945 9.19428 30.5001 9.49984C30.8056 9.80539 30.9584 10.1943 30.9584 10.6665C30.9584 11.1387 30.8056 11.5276 30.5001 11.8332L22.3334 19.9998L30.5001 28.1665C30.8056 28.4721 30.9584 28.861 30.9584 29.3332C30.9584 29.8054 30.8056 30.1943 30.5001 30.4998C30.1945 30.8054 29.8056 30.9582 29.3334 30.9582C28.8612 30.9582 28.4723 30.8054 28.1667 30.4998L20.0001 22.3332Z"
                                  fill="black"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-20 bg-black opacity-25"></div>
          </>
        ) : null}
      </>
    );
  } else {
    return <></>;
  }
}
