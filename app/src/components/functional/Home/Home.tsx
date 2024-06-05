import { useUser } from "@/store/hooks";
import LogoLarge from "@/components/ui/LogoLarge";
import Title from "@/components/ui/Tittle";
import { ContentCol, ContentRow } from "@/components/layout/Content";

import styles from "./Home.module.scss";
import Rectangle from "@/components/ui/Rectangle";
import Images from "@/components/ui/Images";

const Home = () => {
  const { user } = useUser();
  return (
    <div className={styles.home}>
      <Rectangle>
        <ContentRow width="100%"justifyContent="space-between">
          <ContentCol gap="1px">
            <Title
              level="h1"
              color="#ffffff"
              text={`Bienvenido a Findamate ${user ? user.name : "no identificado"}`}
            />
            <Title
              level="h3"
              color="#ffffff"
              text="Es momento encontrar amigos y de aprender algo nuevo "
            />
          </ContentCol>
          <Images src="/image/Rectangle-02.png" alt="image-02" width="338px" height="216px" />
        </ContentRow>
      </Rectangle>
    </div>
  );
};

export default Home;

