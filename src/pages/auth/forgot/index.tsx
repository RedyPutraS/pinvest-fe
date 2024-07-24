import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import Input from "components/input/input";
import Button from "components/button/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotBodySchema, useForgot } from "modules/auth/api/forgot-password";
import type { ForgotBodyType } from "modules/auth/api/forgot-password";
import { toast } from "hooks/use-toast";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const ForgotPasswordPage = ({}: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const postForgot = useForgot();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<ForgotBodyType>({
    resolver: zodResolver(forgotBodySchema),
  });

  const onSubmit = (form: ForgotBodyType) => {
    toast({
      title: "Proses...",
    });
    postForgot
      .mutateAsync(form)
      .then(() => {
        router.push("/auth/verify/email/" + form?.email);
      })
      .catch((e) => {
        toast({
          title: e?.response?.data?.message || "Gagal mengirim email",
        });
      });
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-[416px] items-center p-4">
      <div className="mx-auto w-full">
        <p className="text-center text-xl">Lupa Kata Sandi</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <label htmlFor="email">Email</label>
          <Input
            className="cols-span-12"
            {...register("email")}
            placeholder="Email"
            id="email"
            type="email"
            disabled={postForgot.isLoading}
          />
          <p className="text-xs text-stone-600">Memerlukan alamat email.</p>

          <p className="mt-4">{errors.email?.message}</p>

          <Button
            className="mt-4 w-full"
            type="submit"
            disabled={postForgot.isLoading}
          >
            Kirim
          </Button>
        </form>
      </div>
    </div>
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

export default ForgotPasswordPage;
