import Input from "components/input/input";
import { toast } from "hooks/use-toast";
import type { newsletterBodyType } from "modules/newsletter-box/api/newsletter";
import { useNewsletter } from "modules/newsletter-box/api/newsletter";
import { newsletterBodySchema } from "modules/newsletter-box/api/newsletter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
export default function NewsletterBox() {
  const { register, handleSubmit } = useForm<newsletterBodyType>({
    resolver: zodResolver(newsletterBodySchema),
  });
  const postNewsletter = useNewsletter();
  const [emails, setEmails] = useState("");
  const onSubmit = (form: newsletterBodyType) => {
    postNewsletter
      .mutateAsync(form)
      .then((res) => {
        toast({
          title: res?.message,
        });
      })
      .catch(() => {
        toast({
          title: "Subscribe Newsletter Gagal, silahkan coba lagi nanti",
        });
      })
      .finally(() => {
        setEmails("");
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative flex">
        <Input
          {...register("email")}
          name="email"
          type="email"
          value={emails}
          placeholder="Masukkan Email Anda di Sini"
          classNameContainer="border-0 p-0 focus-within:ring-0 focus-within:ring-offset-0"
          className="rounded-lg p-2 font-light text-black ring-gray-200 hover:ring-1"
          disabled={postNewsletter.isLoading}
          onChange={(e) => setEmails(e.target.value)}
          required
        />
        <button
          className="absolute top-0 bottom-0 right-0 h-auto rounded-lg bg-pv-cyan px-4 text-sm  text-white"
          type="submit"
        >
          Kirim
        </button>
      </div>
    </form>
  );
}
