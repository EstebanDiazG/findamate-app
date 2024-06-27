import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecentTopicsProvider } from "@/context/RecentTopicsContext";
import Login from "@/components/functional/Login";
import Register from "@/components/functional/Register";
import { useUser } from "@/store/hooks";
import { useRouter } from "next/router";
import Screen from "@/components/ui/Screen";
import { ThemeProvider } from "@/components/layout/ThemeContext/ThemeContext";

export default function App({ Component, pageProps }: AppProps) {
  const { user } = useUser();
  const router = useRouter();

  if (router.pathname === "/register") {
    return <Register />;
  }

  return user && user.id ? (
   <ThemeProvider>
      <Screen>
        <RecentTopicsProvider>
          <Component {...pageProps} />
        </RecentTopicsProvider>
      </Screen>
    </ThemeProvider>
  ) : (
    <Login />
  );
}
