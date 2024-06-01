import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Login from "@/components/functional/Login";
import Register from "@/components/functional/Register"; // Asegúrate de importar tu componente de registro
import { useUser } from "@/store/hooks";
import { useRouter } from "next/router"; // Importa useRouter de next/router

export default function App({ Component, pageProps }: AppProps) {
  const { user } = useUser();
  const router = useRouter(); // Usa el hook useRouter para acceder a la ruta actual

  // Si el usuario está en la página de registro, muestra el componente de registro
  if (router.pathname === "/register") {
    return <Register />;
  }

  // Si el usuario está autenticado, muestra el componente solicitado
  return user && user.id ? (
    <div>
      <Component {...pageProps} />
    </div>
  ) : (
    // Si no, muestra el componente de inicio de sesión
    <Login />
  );
}
