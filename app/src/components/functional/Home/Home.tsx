import { useUser } from "@/store/hooks";
import LogoLarge from "@/components/ui/LogoLarge";
import Title from "@/components/ui/Tittle";
import { ContentCol, ContentRow } from "@/components/layout/Content";

import styles from "./Home.module.scss";
import Rectangle from "@/components/ui/Rectangle";
import Images from "@/components/ui/Images";
import Categories from "@/components/ui/Categories";

const Home = () => {
  const { user } = useUser();
  return (
    <div className={styles.home}>
      <ContentCol width="100%" gap="1px">
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
    <Title 
      level="h2"
      text="Categorias"
      height="90px"
      width="100%"
      color="#41377D"
      justifyContent="flex-start"
    />
    <ContentRow gap="20px">
      <Categories 
      text="Ciencias y tecnologia"
      width="350px"
      height="60px"
      color="orange"
      />
      <Categories
        text="Negocios y economía"
        width="350px"
        height="60px"
        color="pink"
      />
      <Categories
        text="Artes y creatividad"
        width="350px"
        height="60px"
        color="aqua"
      />
      <Categories
        text="Hobbies y ocio"
        width="350px"
        height="60px"
        color="violet"
      />
      
       <Categories
        text="Hobbies y ocio"
        width="350px"
        height="60px"
        color="violet"
      />

    </ContentRow>
    </ContentCol>
    </div>
  );
};

export default Home;

