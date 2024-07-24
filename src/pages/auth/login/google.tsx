import { Spinner } from "components/spinner";
import { useAuthStore } from "hooks/use-auth-store";
import { useVerifyOtp } from "modules/auth/api/google-verify-otp";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const VerifyToken = ({ t }: Props) => {
  const { setToken } = useAuthStore();
  const { mutateAsync } = useVerifyOtp();
  const router = useRouter();

  useEffect(() => {
    if (t) {
      mutateAsync({ otp: `${t}` })
        .then((res) => {
          setToken(res.token);
          router.replace("/");
        })
        .catch(() => {
          router.push("/auth/login");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner center />
    </div>
  );
};

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { t } = context.query;

  return {
    props: {
      t,
    },
  };
};

export default VerifyToken;
