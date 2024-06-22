// src/pages/Home.tsx
import React from "react";
import { useUser } from "@/store/hooks";
import { useRouter } from "next/router";
import Title from "@/components/ui/Tittle";
import { ContentCol, ContentRow } from "@/components/layout/Content";
import styles from "./Home.module.scss";
import Rectangle from "@/components/ui/Rectangle";
import Images from "@/components/ui/Images";
import Categories from "@/components/ui/Categories";
import Card from "@/components/ui/Card";
import { useRecentTopics } from "@/context/RecentTopicsContext";
import Avatar from "@/components/ui/Avatar";
import CardTitle from "@/components/ui/CardTitle";
import Button from "@/components/ui/Button";
import GridContainer from "@/components/ui/GridContainer";

const Home = () => {
  const { user } = useUser();
  const { recentTopics } = useRecentTopics();
  const router = useRouter();

  return (
    <div className={styles.home}>
      <ContentCol width="100%" gap="20px" alignItems="center">
        <Rectangle>
          <ContentRow width="100%" alignItems="center" justifyContent="space-between">
            <ContentCol>
              <Title
                level="h1"
                color="#ffffff"
                text={`Bienvenido a Findamate ${user ? user.name : "no identificado"}`}
              />
              <Title
                level="h3"
                color="#ffffff"
                text="Es momento encontrar amigos y de aprender algo nuevo"
              />
            </ContentCol>
            <Images src="/image/Rectangle-02.png" alt="image-02" width="338px" height="216px" />
          </ContentRow>
        </Rectangle>
        <Title 
          level="h2"
          text="Discusiones recientes"
          height="100%"
          width="1200px"
          color="#41377D"
        />
        <GridContainer>
          {recentTopics.map((item, idx) => (
            <React.Fragment key={idx}>
              <Card width="595px" height="220px" padding="30px 30px">
                <ContentCol width="100%">
                  <Categories 
                    text={item.categoryInterest}
                    width="200px"
                    height="40px"
                    justifyContent="center"
                    category={item.categoryInterest as Categories ['category']}
                  />
                  <CardTitle level="h2" color="#41377D" height="70px" text={item.title} />
                  <ContentRow width="100%" justifyContent="space-between">
                    <ContentRow gap="8px">
                      <Avatar width="40px" height="40px" />
                      <Title height="40px" level="h4" color="#41377D" alignItems="center" text={item.creadorTopico} />
                    </ContentRow>
                    <Button
                      width="200px"
                      text="Ir a discusión"
                      color="secondary"
                      onClick={() => router.push(`/topic/${item.id}`)}
                    />
                  </ContentRow>
                </ContentCol>
              </Card>
            </React.Fragment>
          ))}
        </GridContainer>
      </ContentCol>
    </div>
  );
};

export default Home;
