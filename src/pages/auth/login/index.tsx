import { useAuthStore } from "hooks/use-auth-store";
import { Login } from "modules/auth/components/login";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginPage = ({ redirect }: { redirect: string | null }) => {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    // Cek apakah user sudah login
    if (user) {
      router.replace("/"); // Redirect ke halaman utama jika sudah login
    }
  }, [user, router]);

  useEffect(() => {
    // Pastikan kita berada di browser sebelum mengakses window
    if (typeof window !== "undefined") {
      const logoutValue = window.localStorage.getItem('logout');

      console.log('Current logout value:', logoutValue); // Debugging: lihat nilai logout

      if (logoutValue === "1") {
        // Jika logoutValue adalah '1', lakukan reload
        window.localStorage.removeItem('logout'); // Hapus nilai logout setelah memeriksa
        window.location.reload();
      } else {
        // Jika tidak, set nilai logout menjadi '0'
        window.localStorage.setItem('logout', '0');
      }
    }
  }, []); // Kosongkan array ketergantungan untuk memanggil efek ini hanya sekali saat komponen di-mount

  return (
    <div>
      <Login redirectRoute={redirect} />
    </div>
  );
};

export default LoginPage;
