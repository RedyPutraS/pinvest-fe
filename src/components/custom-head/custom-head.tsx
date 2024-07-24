import Head from "next/head";

export const CustomHead = ({
  title,
  image,
}: {
  title?: string | null;
  image?: string;
}) => {
  return (
    <Head>
      <title>{title ?? ""}</title>
      <meta property="og:title" content={title ?? ""} />
      <meta property="og:image" content={image ?? ""} />
      <meta name="twitter:title" content={title ?? ""} />
      <meta name="twitter:image" content={image ?? ""} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};
