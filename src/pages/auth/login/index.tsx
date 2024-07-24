import { useAuthStore } from "hooks/use-auth-store";
import { Login } from "modules/auth/components/login";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginPage = ({ redirect }: { redirect: string | null }) => {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  return (
    <div>
      <Login redirectRoute={redirect} />
    </div>
  );
};

export default LoginPage;
