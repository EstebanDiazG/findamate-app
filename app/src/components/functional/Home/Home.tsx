import { useUser } from "@/store/hooks";
import LogoLarge from "@/components/ui/LogoLarge";
import Title from "@/components/ui/Tittle";
import { ContentCol } from "@/components/layout/Content";

import style from "./Home.module.scss";

const Home = () => {
  const { user } = useUser();
  return (
    <div className={style.welcome}>
      <ContentCol gap="5px">
        <Title
          level="h1"
          color="#575756"
          text={`Bienvenido ${user ? user.name : "no identificado"}`}
        />
        <LogoLarge width="353px" height="126px" />
      </ContentCol>
    </div>
  );
};

export default Home;
