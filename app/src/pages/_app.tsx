import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Login from "@/components/functional/Login";
import { useUser } from "@/store/hooks";

export default function App({ Component, pageProps }: AppProps) {
  const { user } = useUser();

  return user && user.id ? (
    <div>
      <Component {...pageProps} />
    </div>
  ) : (
    <Login />
  );
}
