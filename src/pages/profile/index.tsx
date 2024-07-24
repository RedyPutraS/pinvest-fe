/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/alt-text */
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import PageBody from "components/page/page-body";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "components/tabs";
import { format, sub, parse } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { toast } from "hooks/use-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "components/select";
import type {
  profileBodyType,
  passwordBodyType,
  profilePictBodyType,
} from "modules/auth/api/profile";
import {
  profilePictBodySchema,
  useProfilePict,
} from "modules/auth/api/profile";
import {
  profileBodySchema,
  passwordBodySchema,
  usePassword,
  useProfile,
} from "modules/auth/api/profile";

import type { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useAuthStore } from "hooks/use-auth-store";
import Button from "components/button/button";
import { useEffect, useState } from "react";
import { useAccount } from "modules/auth/api/account";
import { cn } from "utils";
import { SelectValue } from "@radix-ui/react-select";
import type { AxiosError } from "axios";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const ProfilePage = ({}: Props) => {
  const [birthdate17, setBirthdate17] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<profileBodyType>({
    resolver: zodResolver(profileBodySchema),
    defaultValues: {
      birthdate: format(sub(new Date(), { years: 18 }), "yyyy-MM-dd"),
    },
  });
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    reset,
  } = useForm<passwordBodyType>({
    resolver: zodResolver(passwordBodySchema),
    mode: "onBlur",
  });
  const {
    register: register3,
    handleSubmit: handleSubmit3,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors: errors3 },
  } = useForm<profilePictBodyType>({
    resolver: zodResolver(profilePictBodySchema),
  });

  const postProfile = useProfile();
  const postProfilePict = useProfilePict();
  const postPassword = usePassword();

  const { data, refetch: accountRefetch } = useAccount();
  const auth = useAuthStore();

  const onSubmit = (form: profileBodyType) => {
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
    if (age < 18 || Number.isNaN(age)) {
      setBirthdate17("Umur wajib diatas 18 tahun");
      return;
    }
    postProfile
      .mutateAsync(form)
      .then(() => {
        accountRefetch();
        // router.push("/profile");
        toast({
          title: "Update Profile Berhasil!",
        });
      })
      .catch((err: AxiosError) => {
        debugger;
        const errorMessage =
          (err.response?.data as any)?.message || "Update Profile Gagal!";
        toast({
          title: errorMessage,
        });
      });
  };
  const onSubmit2 = (form: passwordBodyType) => {
    postPassword
      .mutateAsync(form)
      .then((e) => {
        const message = e.message;
        toast({
          title: "Message: (" + message + ")",
        });
        router.push("/profile");
      })
      .catch((err: AxiosError) => {
        const errorMessage =
          (err.response?.data as any)?.data.password ||
          "Update Kata Sandi Gagal";
        toast({
          title: errorMessage,
        });
      })
      .finally(() => {
        reset();
      });
  };
  const onSubmit3 = (form: profilePictBodyType) => {
    postProfilePict
      .mutateAsync(form)
      .then(() => {
        router.push("/profile");
      })
      .catch(() => {
        toast({
          title: "Update Photo Gagal!",
        });
      });
  };

  const submitChange = (data: any) => {
    postProfilePict
      .mutateAsync({ profile_picture: data.target.files[0] })
      .then(() => {
        accountRefetch();
        toast({
          title: "Update Photo Berhasil!",
        });
      })
      .catch(() => {
        toast({
          title: "Update Photo Gagal!. File Terlalu besar",
        });
      });
  };

  //state value
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
  const [isShowPassword3, setIsShowPassword3] = useState(false);

  useEffect(() => {
    if (auth.user) {
      const firstName = data?.first_name ?? "";
      setFirstName(firstName);
      const lastName = data?.last_name ?? "";
      setlastName(lastName);
      const email = data?.email ?? "";
      setEmail(email);
      const phone = data?.no_hp ?? "";
      setPhone(phone);
      const gender = data?.gender ?? "";
      setGender(gender);
      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("email", email);
      setValue("phone", phone);
      setValue("gender", gender);
      setValue("birthdate", data?.birth_date ?? "");
    }
  }, [data]);

  useEffect(() => {
    if (auth.user) {
      accountRefetch();
    }
  }, []);

  function translateGender(gender: string | null | undefined): string {
    return gender === "male" ? "Laki-laki" : "Perempuan";
  }

  return (
    <PageBody className="min-h-[550px]">
      <>
        <h1 className="text-5xl font-semibold">Profil</h1>
        <Tabs>
          <TabList>
            <Tab>Data Profil</Tab>
            {/* <Tab>Alamat</Tab> */}
            <Tab>Kata Sandi</Tab>
            {/* <Tab>Referal</Tab> */}
          </TabList>

          <TabPanels>
            <TabPanel>
              <div className="relative mx-auto items-center bg-white p-4">
                <div className="absolute right-0 text-center">
                  <img
                    src={data?.img_status ?? ""}
                    className="mb-1 w-20 rounded-xl "
                    alt=""
                  />
                  <div className="tracking-widest text-pv-blue-light">
                    {data?.status?.toUpperCase()}
                  </div>
                </div>
                <div className="flex grid-flow-row auto-rows-max">
                  <div className="relative grid auto-cols-max grid-flow-col ">
                    <form
                      id="formChangeImage"
                      onSubmit={handleSubmit3(onSubmit3)}
                      className="mt-8"
                    >
                      <label
                        htmlFor="imageProfile"
                        className="border-blue  flex cursor-pointer flex-col items-center border-b px-4  py-6 uppercase tracking-wide shadow-md "
                      >
                        <img
                          src={
                            data?.profile_picture ??
                            "../assets/icon/profile.png"
                          }
                          className="h-[100px] w-[100px] object-cover"
                        />
                        <input
                          {...register3("profile_picture")}
                          type="file"
                          className="hidden"
                          id="imageProfile"
                          onChange={submitChange}
                        />
                      </label>
                      <Button
                        id="submitImage"
                        className="mx-auto mt-4  hidden"
                        type="submit"
                        disabled={postProfilePict.isLoading}
                      >
                        Simpan
                      </Button>
                    </form>
                  </div>

                  <div className="hidden items-center xl:flex xl:flex-row">
                    <div className="m-3">
                      <img
                        src="../assets/icon/contact_profile.png"
                        width={20}
                        height={20}
                      />
                    </div>

                    <div>
                      {data?.first_name} {data?.last_name}
                    </div>

                    <div className="m-3">
                      <img
                        src="../assets/icon/email_profile.png"
                        width={20}
                        height={20}
                      />
                    </div>

                    <div>{data?.email}</div>
                    <div className="m-3">
                      <img
                        src="../assets/icon/phone.svg"
                        width={20}
                        height={20}
                      />
                    </div>

                    <div>{data?.no_hp}</div>
                    <div className="m-2">
                      <img
                        src="../assets/icon/gender_profile.png"
                        width={15}
                        height={15}
                      />
                    </div>
                    <div>{translateGender(data?.gender)}</div>
                  </div>
                </div>
                <div className="order-last mx-1 mb-2 flex items-center">
                  <div className="font-semiBold relative flex justify-center whitespace-nowrap py-2 text-center uppercase text-cyan-600 transition-all before:absolute before:bottom-0 before:z-0 before:h-2 before:w-full before:rounded before:bg-sky-800 xl:hidden xl:p-2">
                    {data?.status} member
                  </div>
                </div>
                <div className="flex xl:hidden">
                  <div className="mx-1">
                    <div className="mb-2 flex">
                      <img
                        src="../assets/icon/contact_profile.png"
                        width={20}
                        height={20}
                      />
                      <span className="ml-3">
                        {data?.first_name} {data?.last_name}
                      </span>
                    </div>

                    <div className="mb-2 flex">
                      <img
                        src="../assets/icon/email_profile.png"
                        width={20}
                        height={20}
                      />
                      <span className="ml-3">{data?.email}</span>
                    </div>

                    <div className="mb-2 flex">
                      <img
                        src="../assets/icon/contact_profile.png"
                        width={20}
                        height={20}
                      />
                      <span className="ml-3">{data?.no_hp}</span>
                    </div>

                    <div className="mb-2 flex">
                      <img
                        src="../assets/icon/gender_profile.png"
                        width={20}
                        height={20}
                      />
                      <span className="ml-3 capitalize">{data?.gender}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-8 ">
                    <div className="grid grid-cols-2 ">
                      <div className="grid-cols-6">
                        <label htmlFor="firstName" className="ml-2">
                          Nama Depan
                        </label>
                        <input
                          className="ms-2 relative flex w-11/12 overflow-hidden border-b border-slate-300 bg-transparent  p-2 px-3 py-2 text-sm placeholder:text-slate-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus-within:ring-slate-400 dark:focus-within:ring-offset-slate-900"
                          {...register("firstName")}
                          placeholder="Nama Depan"
                          disabled={postProfile.isLoading}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <p className="text-md mb-4 text-red-400">
                          {errors.firstName?.message}
                        </p>

                        <label htmlFor="lastName" className="ml-2">
                          Nama Belakang
                        </label>

                        <input
                          className="ms-2 relative flex w-11/12 overflow-hidden border-b border-slate-300 bg-transparent bg-white p-2 px-3 py-2 text-sm placeholder:text-slate-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus-within:ring-slate-400 dark:focus-within:ring-offset-slate-900"
                          {...register("lastName")}
                          placeholder="Nama Belakang"
                          disabled={postProfile.isLoading}
                          value={lastName}
                          onChange={(e) => setlastName(e.target.value)}
                        />
                        <p className="text-md mb-4 text-red-400">
                          {errors.lastName?.message}
                        </p>
                        <label htmlFor="email" className="ml-2">
                          Email
                        </label>
                        <input
                          className="ms-2 relative flex w-11/12 overflow-hidden border-b border-slate-300 bg-transparent bg-white p-2 px-3 py-2 text-sm placeholder:text-slate-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus-within:ring-slate-400 dark:focus-within:ring-offset-slate-900"
                          {...register("email")}
                          placeholder="Email"
                          disabled={true}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="text-md mb-4 text-red-400">
                          {errors.email?.message}
                        </p>
                      </div>
                      <div className="grid-cols-6 ">
                        <label htmlFor="phone" className="ml-2">
                          Nomor Telepon
                        </label>
                        <input
                          className="relative flex w-full overflow-hidden  border-b border-slate-300 bg-transparent bg-white p-2 px-3 py-2 text-sm placeholder:text-slate-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus-within:ring-slate-400 dark:focus-within:ring-offset-slate-900"
                          {...register("phone")}
                          placeholder="Nomor Telepon"
                          disabled={postProfile.isLoading}
                          type="number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        <p className="text-md mb-4 text-red-400">
                          {errors.phone?.message}
                        </p>
                        <label htmlFor="birthdate" className="ml-2">
                          Tanggal Ulang Tahun
                        </label>
                        <Controller
                          control={control}
                          name="birthdate"
                          render={({ field }) => (
                            <DatePicker
                              showYearDropdown={true}
                              yearDropdownItemNumber={50}
                              scrollableYearDropdown={true}
                              className={cn(
                                "relative flex w-full overflow-hidden border-b border-pv-grey-medium1 bg-white p-2",
                                "flex border-b border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus-within:ring-slate-400 dark:focus-within:ring-offset-slate-900"
                              )}
                              selected={
                                field.value
                                  ? parse(field.value, "yyyy-MM-dd", new Date())
                                  : new Date()
                              }
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              onChange={(date: any) =>
                                field.onChange(
                                  format(date ?? new Date(), "yyyy-MM-dd")
                                )
                              }
                            />
                          )}
                        />
                        <p className="mb-4 text-sm text-red-400">
                          {errors.birthdate?.message}
                        </p>
                        <p id="date" className="mb-4 text-sm text-red-400">
                          {birthdate17 !== "" ? birthdate17 : ""}
                        </p>
                        <label htmlFor="gender" className="ml-2">
                          Jenis Kelamin
                        </label>
                        <Controller
                          control={control}
                          name="gender"
                          render={({ field }) => (
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue
                                  defaultValue={gender}
                                  placeholder={translateGender(data?.gender)}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Laki-laki</SelectItem>
                                <SelectItem value="female">
                                  Perempuan
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <p className="text-md mb-4 text-red-400">
                          {errors.gender?.message}
                        </p>
                      </div>
                    </div>

                    <Button
                      className="mx-auto mt-4 flex"
                      type="submit"
                      disabled={postProfile.isLoading}
                    >
                      Simpan
                    </Button>
                  </form>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <form onSubmit={handleSubmit2(onSubmit2)} className="mt-8">
                <label htmlFor="password" className="ml-2">
                  Kata Sandi Lama
                </label>
                <input
                  className="ms-2 relative flex w-11/12 overflow-hidden border-b border-slate-300 bg-transparent bg-white p-2 px-3 py-2 text-sm placeholder:text-slate-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus-within:ring-slate-400 dark:focus-within:ring-offset-slate-900"
                  {...register2("password")}
                  placeholder="Kata Sandi Lama"
                  disabled={postPassword.isLoading}
                  type={isShowPassword ? "text" : "password"}
                />
                <div className="relative">
                  {isShowPassword ? (
                    <img
                      onClick={() => setIsShowPassword(!isShowPassword)}
                      className="end-0 absolute inset-y-0 -top-7 right-3 z-10 w-5  xl:right-32"
                      src="/assets/icon/eye.svg"
                      alt=""
                    />
                  ) : (
                    <img
                      onClick={() => setIsShowPassword(!isShowPassword)}
                      className="end-0 32 absolute inset-y-0 -top-7 right-3 z-10 w-5 xl:right-32"
                      src="/assets/icon/EyeSlash.png"
                      alt=""
                    />
                  )}
                </div>
                <p id="password-error" className="mb-4 text-sm text-red-400">
                  {errors2.password && errors2.password.message}
                </p>
                <label htmlFor="new_password" className="ml-2">
                  Kata Sandi Baru
                </label>
                <input
                  className="ms-2 relative flex w-11/12 overflow-hidden border-b border-slate-300 bg-transparent bg-white p-2 px-3 py-2 text-sm placeholder:text-slate-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus-within:ring-slate-400 dark:focus-within:ring-offset-slate-900"
                  {...register2("new_password")}
                  placeholder="Kata Sandi Baru"
                  id="new_password"
                  disabled={postPassword.isLoading}
                  type={isShowPassword2 ? "text" : "password"}
                />
                <div className="relative">
                  {isShowPassword2 ? (
                    <img
                      onClick={() => setIsShowPassword2(!isShowPassword2)}
                      className="end-0 absolute inset-y-0 -top-7 right-3 z-10 w-5 xl:right-32"
                      src="/assets/icon/eye.svg"
                      alt=""
                    />
                  ) : (
                    <img
                      onClick={() => setIsShowPassword2(!isShowPassword2)}
                      className="end-0 absolute inset-y-0 -top-7 right-3 z-10 w-5 xl:right-32"
                      src="/assets/icon/EyeSlash.png"
                      alt=""
                    />
                  )}
                </div>
                <p
                  id="new_password-error"
                  className="mb-4 text-sm text-red-400"
                >
                  {errors2.new_password && errors2.new_password.message}
                </p>
                <label htmlFor="confirm_new_password" className="ml-2">
                  Konfirmasi Kata Sandi Baru
                </label>
                <input
                  className="ms-2 relative flex w-11/12 overflow-hidden border-b border-slate-300 bg-transparent bg-white p-2 px-3 py-2 text-sm placeholder:text-slate-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus-within:ring-slate-400 dark:focus-within:ring-offset-slate-900"
                  {...register2("confirm_new_password")}
                  placeholder="Password"
                  id="confirm_new_password"
                  disabled={postPassword.isLoading}
                  type={isShowPassword3 ? "text" : "password"}
                />
                <div className="relative">
                  {isShowPassword3 ? (
                    <img
                      onClick={() => setIsShowPassword3(!isShowPassword3)}
                      className="end-0 absolute inset-y-0 -top-7 right-3 z-10 w-5 xl:right-32"
                      src="/assets/icon/eye.svg"
                      alt=""
                    />
                  ) : (
                    <img
                      onClick={() => setIsShowPassword3(!isShowPassword3)}
                      className="end-0 absolute inset-y-0 -top-7 right-3 z-10 w-5 xl:right-32"
                      src="/assets/icon/EyeSlash.png"
                      alt=""
                    />
                  )}
                </div>
                <p
                  id="confirm_new_password-error"
                  className="mb-4 text-sm text-red-400"
                >
                  {errors2.confirm_new_password &&
                    errors2.confirm_new_password.message}
                </p>
                <Button
                  className="mx-auto mt-4 flex"
                  type="submit"
                  disabled={postPassword.isLoading}
                >
                  Simpan
                </Button>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </>
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

export default ProfilePage;
