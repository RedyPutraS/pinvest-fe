import Script from "next/script";
import { env } from "env/client.mjs";
import { cn } from "utils";
import { useEffect } from "react";

type Props = {
  className?: string;
};

const ButtonLoginGoogle = ({ className }: Props) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={cn("flex justify-center", className)}>
      <div
        id="g_id_onload"
        data-client_id={env.NEXT_PUBLIC_GSIGN_CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri={env.NEXT_PUBLIC_GSIGN_LOGIN_URI}
        data-itp_support="true"
      />

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      />

      <Script src="https://accounts.google.com/gsi/client" async defer />
    </div>
  );
};

export default ButtonLoginGoogle;
