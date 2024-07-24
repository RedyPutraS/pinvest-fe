import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import Input from "components/input/input";
import Button from "components/button/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "hooks/use-toast";
import type { NewPasswordBodyType } from "modules/auth/api/submit-new-password";
import { newPasswordBodySchema } from "modules/auth/api/submit-new-password";
import { useNewPassword } from "modules/auth/api/submit-new-password";
import { useState } from "react";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const NewPasswordPage = ({}: Props) => {
  const router = useRouter();
  const postNewPassword = useNewPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // 1. Import watch from react-hook-form
  } = useForm<NewPasswordBodyType>({
    resolver: zodResolver(newPasswordBodySchema),
  });
  const [token] = useState(router.query.t);
  const onSubmit = (form: NewPasswordBodyType) => {
    if (form.confirm_new_password != form.new_password) {
      toast({
        title: "The Confirm New Password and New Password must match.",
      });
    } else {
      postNewPassword
        .mutateAsync(form)
        .then((res) => {
          if (res.status == "success") {
            router.push({
              pathname: "/auth/forgot-password/success",
            });
            toast({
              title: res.message,
            });
          } else {
            router.push({
              pathname: "/auth/forgot-password/error",
            });
            toast({
              title: res.message,
            });
          }
        })
        .catch(() => {
          router.push({
            pathname: "/auth/forgot",
          });
          toast({
            title: "Reset Password Failed, Please Try Again!",
          });
        });
    }
  };
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);

  const new_password = watch("new_password"); // 2. Watch the value of new_password
  const confirm_new_password = watch("confirm_new_password"); // 2. Watch the value of confirm_new_password

  return (
    <div className="mx-auto flex min-h-screen max-w-[416px] items-center p-4">
      <div className="mx-auto w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <p className="text-start text-sm text-slate-400">
            *Silakan Masukkan Kata Sandi Baru
          </p>
          <Input
            value={token}
            className="hidden"
            {...register("token")}
            type="text"
            disabled={postNewPassword.isLoading}
          />

          <label>Password Baru</label>
          <Input
            className="cols-span-12"
            {...register("new_password")}
            placeholder="Password Baru"
            name="new_password"
            type={isShowPassword ? "text" : "password"}
            disabled={postNewPassword.isLoading}
          />
          <div className="relative">
            {isShowPassword ? (
              <img
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute inset-y-0 -top-7 end-0 right-3 z-10 w-5"
                src="/assets/icon/EyeSlash.png"
                alt=""
              />
            ) : (
              <img
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute inset-y-0 -top-7 end-0 right-3 z-10 w-5"
                src="/assets/icon/eye.svg"
                alt=""
              />
            )}
          </div>
          <p className="mt-4">{errors.new_password?.message}</p>

          <label>Konfirmasi Kata Sandi Baru</label>
          <Input
            className="cols-span-12"
            {...register("confirm_new_password")}
            placeholder="Konfirmasi Kata Sandi Baru"
            name="confirm_new_password"
            type={isShowPassword2 ? "text" : "password"}
            disabled={postNewPassword.isLoading}
          />
          <div className="relative">
            {isShowPassword2 ? (
              <img
                onClick={() => setIsShowPassword2(!isShowPassword2)}
                className="absolute inset-y-0 -top-7 end-0 right-3 z-10 w-5"
                src="/assets/icon/EyeSlash.png"
                alt=""
              />
            ) : (
              <img
                onClick={() => setIsShowPassword2(!isShowPassword2)}
                className="absolute inset-y-0 -top-7 end-0 right-3 z-10 w-5"
                src="/assets/icon/eye.svg"
                alt=""
              />
            )}
          </div>
          <p className="mt-4">{errors.confirm_new_password?.message}</p>

          {/* 3. Display error message if passwords don't match */}
          {confirm_new_password !== new_password && (
            <p className="text-red-500">Kata Sandi Tidak Cocok</p>
          )}

          <Button
            className="mt-4 w-full"
            type="submit"
            disabled={postNewPassword.isLoading}
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

export default NewPasswordPage;