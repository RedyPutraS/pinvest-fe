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
    const defaultMeta = {
        title: "Title",
        description: "Description",
        image: "default-image.jpg", // Ganti dengan gambar default yang sesuai
        url: "https://pinvest.co.id",
    };

    useEffect(() => {
        // Simulasi fetch data atau proses lainnya
        const fetchData = async () => {
            // Simulasi delay 2 detik (ganti dengan fetch data yang sebenarnya)
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsLoading(false);
        };

        fetchData();
    }, []);

    // Gunakan data yang ada atau fallback ke default jika tidak ada
    const metaTitle = title || defaultMeta.title;
    const metaDescription = description || defaultMeta.description;
    const metaImage = image || defaultMeta.image;
    const metaUrl = url || defaultMeta.url;

    return (
        <Head>
            <title>{metaTitle}</title>
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={metaUrl} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
        </Head>
    );
};

export default MetaHead;
