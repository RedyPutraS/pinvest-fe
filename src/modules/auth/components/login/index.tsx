import { zodResolver } from "@hookform/resolvers/zod";
import Button from "components/button/button";
import ButtonLoginGoogle from "components/button/button-login-google";
import Input from "components/input/input";
import { useAuthStore } from "hooks/use-auth-store";
import {
  type LoginBodyType,
  loginBodySchema,
  useLogin,
} from "modules/auth/api/login";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
export const Login = ({ redirectRoute }: { redirectRoute: string | null }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBodyType>({
    resolver: zodResolver(loginBodySchema),
    mode: "onBlur",
  });

  const [error, seterror] = useState("");

  const postLogin = useLogin();
  const useAuth = useAuthStore();

  const onSubmit = (form: LoginBodyType) => {
    postLogin
      .mutateAsync(form)
      .then(async (res) => {
        window.localStorage.setItem("TOKEN", res.token);
        useAuth.setToken(res.token);
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        router.push(redirectRoute || "/");
      })
      .catch((err) => {
        const errorMessage = err.response?.data.message || "Terjadi kesalahan";
        seterror(errorMessage);
      });
  };
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <>
      <Head>
        <title>Pinvest Login</title>
      </Head>
      <div className="mx-auto flex items-center p-4 md:max-w-[416px] justify-center my-[100px]">
        <div className="w-full">
          <p className="text-center text-xl">Masuk ke akun Pinvest Anda.</p>
          <ButtonLoginGoogle className="mt-4" />

          <p className="mt-4 text-center text-lg">
            Atau masuk menggunakan email.
          </p>
          <p className="mt-4 text-center text-sm text-red-400">{error}</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <Input
              {...register("email")}
              id="emails"
              placeholder="Email"
              type="email"
              className="bg-gray-100"
              disabled={postLogin.isLoading}
            />
            <p className="mb-4 text-sm text-red-400">
              {errors.email && errors.email?.message}
            </p>
            <div className="relative">
              <Input
                {...register("password")}
                id="passwords"
                classNameContainer="mt-4"
                className="bg-gray-100"
                placeholder="Sandi"
                type={isShowPassword ? "text" : "password"}
                disabled={postLogin.isLoading}
              />
              {isShowPassword ? (
                <img
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="end-0 absolute inset-y-0 right-4 top-2 z-10 w-5"
                  src="/assets/icon/eye.svg"
                  alt=""
                />
              ) : (
                <img
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="end-0 absolute inset-y-0 right-4 top-2 z-10 w-5"
                  src="/assets/icon/EyeSlash.png"
                  alt=""
                />
              )}
            </div>

            <p className="mb-4 text-sm text-red-400">
              {errors.password?.message}
            </p>
            <Button
              className="mt-4 w-full"
              type="submit"
              disabled={postLogin.isLoading}
            >
              Masuk
            </Button>
            <Link
              className="float-right text-pv-blue-light"
              href="/auth/forgot"
            >
              Lupa kata sandi Anda?
            </Link>
          </form>

          <p className="mt-10 text-center">
            Tidak punya akun?{" "}
            <Link className="text-pv-blue-light" href="/auth/register">
              Daftar
            </Link>
          </p>
        </div>
      </div>
      {/* <span className="flex text-pv-grey-medium2 mb-10">
        <p className="mx-auto">Hak Cipta © 2022</p>
      </span> */}
    </>
  );
};
