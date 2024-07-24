import { useAuthStore } from "hooks/use-auth-store";
import { Register } from "modules/auth/components/register";
import { useRouter } from "next/router";
import { useEffect } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  return (
    <div>
      <Register />
    </div>
  );
};

export default RegisterPage;
