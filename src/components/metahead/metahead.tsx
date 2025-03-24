import Head from "next/head";
import React, { useEffect, useState } from "react";

interface MetaHeadProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

const MetaHead: React.FC<MetaHeadProps> = ({ title, description, image, url }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [appLink, setAppLink] = useState<string>("");

    const defaultMeta = {
        title: "Title",
        description: "Description",
        image: "default-image.jpg",
        url: "https://pinvest.co.id",
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Ambil base URL secara dinamis
            setAppLink(window.location.origin);
        }

        const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const metaTitle = title || defaultMeta.title;
    const metaDescription = description || defaultMeta.description;
    const metaImage = image;
    const metaUrl = url || defaultMeta.url;

    console.log("Base URL (appLink):", appLink);

    return (
        <Head>
            <title>{metaTitle}</title>
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            {/* <meta property="og:image" content={metaImage} /> */}
            <meta property="og:url" content={metaUrl} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            {/* <meta name="twitter:image" content={metaImage} /> */}
            {/* Tambahkan meta tag untuk appLink jika diperlukan */}
            <meta property="og:site_name" content={appLink} />
            <link rel="icon" href="/android-chrome-192x192.png" />
        </Head>
    );
};

export default MetaHead;
