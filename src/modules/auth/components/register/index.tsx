import Button from "components/button/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "components/input/input";
import { useRouter } from "next/router";
import { toast } from "hooks/use-toast";
import {
  useRegister,
  type RegisterBodyType,
  registerBodySchema,
} from "modules/auth/api/register";
import DatePicker from "react-datepicker";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/select";
import { format, parse, sub } from "date-fns";
import Link from "next/link";
import ButtonLoginGoogle from "components/button/button-login-google";
import Head from "next/head";

import "react-datepicker/dist/react-datepicker.css";
import { cn } from "utils";
import { useKota } from "modules/general/api/city";
import { useState } from "react";
import Select2 from "react-select";
import type { AxiosError } from "axios";

export const Register = () => {
  const [birthdate17, setBirthdate17] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<RegisterBodyType>({
    resolver: zodResolver(registerBodySchema),
    defaultValues: {
      birthdate: format(sub(new Date(), { years: 18 }), "yyyy-MM-dd"),
    },
    mode: "onBlur", // Set mode to 'onBlur' to trigger validation onBlur
  });

  const DataKota = useKota();

  const postRegister = useRegister();
  const onSubmit = (form: RegisterBodyType) => {
    setBirthdate17("");
    const birthdate = new Date(form.birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthdate.getDate())
    ) {
      age--;
    }

    if (age >= 18) {
      if (form.password != form.confirm_password) {
        toast({
          title: "Konfirmasi kata sandi dan kata sandi harus cocok.",
        });
      } else {
        postRegister
          .mutateAsync(form)
          .then((res) => {
            router.push({
              pathname: "/auth/verify/email/[email]",
              query: { email: res.email },
            });
          })
          .catch((e: AxiosError<{ message: string }>) => {
            let message = "Register Gagal!";
            try {
              if (e.response?.data.message === "Validation Error.") {
                message = "Email Sudah Terdaftar!";
              }
            } catch (error) {}
            toast({ title: message });
          });
      }
    } else {
      setBirthdate17("Umur wajib diatas 18 tahun");
    }
  };
  const colourStyles = {
    menuList: (styles: any) => ({
      ...styles,
      background: "#f5f5f5",
    }),
    control: (base: any, state: { isFocused: any }) => ({
      ...base,
      background: "#f5f5f5",
      borderRadius: state.isFocused ? "3px 3px 0 3px" : 3,
      borderBottomColor: state.isFocused ? "none" : "none",
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: state.isFocused ? "black" : "black",
      },
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
      ...styles,
      background: isFocused
        ? "bg-gray-400"
        : isSelected
        ? "bg-gray-100"
        : undefined,
      zIndex: 1,
    }),
    menu: (styles: any) => ({
      ...styles,
      backgroundColor: "#f5f5f5",
      zIndex: 100,
    }),
  };

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);

  const password = watch("password"); // 2. Watch the value of new_password
  const confirm_password = watch("confirm_password");
  return (
    <>
      <Head>
        <title>Pinvest Register</title>
      </Head>
      <div className="mx-auto flex min-h-screen items-center p-4 md:max-w-[416px]">
        <div className="w-full">
          <p className="text-center text-xl">Daftar Google</p>
          <ButtonLoginGoogle className="mt-4" />

          <p className="mt-4 text-center text-xl">
            Atau Daftar dengan akun email
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8"
            autoComplete="off"
          >
            <Input
              {...register("firstName")}
              placeholder="Nama depan"
              className="bg-gray-100"
              autoComplete="off"
              disabled={postRegister.isLoading}
            />
            <p id="firstName-error" className="mb-4 text-sm text-red-400">
              {errors.firstName && errors.firstName.message}
            </p>

            <Input
              {...register("lastName")}
              placeholder="Nama belakang"
              className="bg-gray-100"
              autoComplete="off"
              disabled={postRegister.isLoading}
            />
            <p id="lastName-error" className="mb-4 text-sm text-red-400">
              {errors.lastName && errors.lastName.message}
            </p>

            <Input
              {...register("email")}
              placeholder="Email"
              className="bg-gray-100"
              autoComplete="off"
              disabled={postRegister.isLoading}
            />
            <p id="email-error" className="mb-4 text-sm text-red-400">
              {errors.email && errors.email.message}
            </p>

            <div className="relative">
              <Input
                {...register("password")}
                placeholder="Kata Sandi"
                autoComplete="off"
                className="bg-gray-100"
                type={isShowPassword ? "text" : "password"}
                disabled={postRegister.isLoading}
              />
              <p id="password-error" className="mb-4 text-sm text-red-400">
                {errors.password && errors.password.message}
              </p>
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

            <div className="relative">
              <Input
                {...register("confirm_password")}
                placeholder="Konfirmasi Kata Sandi"
                className="bg-gray-100"
                autoComplete="off"
                type={isShowPassword2 ? "text" : "password"}
                disabled={postRegister.isLoading}
              />
              <p
                id="confirm_password-error"
                className="mb-4 text-sm text-red-400"
              >
                {errors.confirm_password && errors.confirm_password.message}
                {confirm_password !== password && (
                  <p className="text-red-500">Kata sandi tidak cocok</p>
                )}
              </p>
              {isShowPassword2 ? (
                <img
                  onClick={() => setIsShowPassword2(!isShowPassword2)}
                  className="end-0 absolute inset-y-0 right-4 top-2 z-10 w-5"
                  src="/assets/icon/eye.svg"
                  alt=""
                />
              ) : (
                <img
                  onClick={() => setIsShowPassword2(!isShowPassword2)}
                  className="end-0 absolute inset-y-0 right-4 top-2 z-10 w-5"
                  src="/assets/icon/EyeSlash.png"
                  alt=""
                />
              )}
            </div>

            <Input
              {...register("phone")}
              placeholder="Nomor Ponsel"
              className="bg-gray-100"
              autoComplete="off"
              disabled={postRegister.isLoading}
              type="number"
            />
            <p id="phone-error" className="mb-4 text-sm text-red-400">
              {errors.phone && errors.phone.message}
            </p>
            <p id="phone-error" className="mb-4 text-sm text-red-400"></p>

            <Controller
              control={control}
              name="birthdate"
              render={({ field }) => (
                <DatePicker
                  showYearDropdown={true}
                  yearDropdownItemNumber={50}
                  scrollableYearDropdown={true}
                  autoComplete="off"
                  className={cn(
                    "relative flex w-full overflow-hidden border-b border-pv-grey-medium1 bg-white p-2",
                    "flex border-b border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus-within:ring-slate-400 dark:focus-within:ring-offset-slate-900"
                  )}
                  selected={parse(field.value, "yyyy-MM-dd", new Date())}
                  onChange={(date: any) => {
                    field.onChange(format(date ?? new Date(), "yyyy-MM-dd"));
                  }}
                />
              )}
            />
            <p id="date" className="mb-4 text-sm text-red-400">
              {birthdate17 !== "" ? birthdate17 : ""}
            </p>
            <p className="mb-4 text-sm text-red-400"></p>

            <Controller
              control={control}
              name="gender"
              defaultValue="male"
              render={({ field }) => (
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  autoComplete="off"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Jenis Kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Laki-laki</SelectItem>
                    <SelectItem value="female">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <p className="mb-4 text-sm text-red-400"></p>

            <Controller
              control={control}
              name="kota_id"
              render={({ field }) => (
                <Select2
                  placeholder="Kota"
                  value={DataKota?.data?.find((val) => {
                    return val.id === field.value;
                  })}
                  styles={colourStyles}
                  getOptionLabel={(options) => options.kota}
                  onChange={(val) => field.onChange(val?.id)}
                  options={DataKota?.data?.map((item, index) => {
                    return {
                      label: item?.kota,
                      value: item?.id,
                      kota: item?.kota,
                      id: item?.id,
                      key: index,
                    };
                  })}
                />
              )}
            />
            <p className="mb-4 text-sm text-red-400"></p>
            <Button
              className="mt-4 w-full"
              type="submit"
              disabled={postRegister.isLoading}
            >
              Daftar
            </Button>
          </form>

          <p className="mt-10 text-center">
            Sudah memiliki akun?{" "}
            <Link className="text-pv-blue-light" href="/auth/login">
              Masuk
            </Link>
          </p>

          {/* <p className="mt-8 text-center text-pv-grey-medium2">
            Hak Cipta © 2022
          </p> */}
        </div>
      </div>
    </>
  );
};
