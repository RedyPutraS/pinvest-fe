import { QueryClient, dehydrate } from "@tanstack/react-query";
import PageBody from "components/page/page-body";
import type { InferGetServerSidePropsType } from "next";
import Link from "next/link";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const errorPage = ({}: Props) => {
  return (
    <PageBody className="min-h-[550px]">
      <div className="bg-pv-white my-8 grid grid-cols-1 gap-4 py-4">
        <div className="bg-pv-white mx-auto rounded-xl p-6">
          <img
            src="/assets/img/verif_email.png"
            alt=""
            width={300}
            height={300}
          />
        </div>
        <div className="mx-auto flex-1 pl-4 text-center">
          <div className="text-xl font-medium">Reset Kata Sandi Berhasil</div>
          <div>Kata sandi Anda telah berhasil diubah</div>
          <div className="my-4 rounded-md bg-pv-blue-dark p-2 text-white">
            <Link href="/auth/login">Masuk</Link>
          </div>
        </div>
      </div>
    </PageBody>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  const params = { limit: 5 };

  return {
    props: {
      params,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default errorPage;
