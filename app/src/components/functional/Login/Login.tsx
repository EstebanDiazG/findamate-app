import React, { useState, useEffect } from "react";
import { useUser } from "@/store/hooks";
import { IUser } from "@/interfaces/user";
import style from "./Login.module.scss";
import Background from "@/components/ui/Background/Background";
import Box from "@/components/ui/Box";
import { ContentCol, ContentRow } from "@/components/layout/Content";
import Title from "@/components/ui/Tittle";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import LogoLarge from "@/components/ui/LogoLarge";
import { useRouter } from "next/router";

const Login = () => {
  const { userValidate } = useUser();

  const initialDataUser: IUser = {
    id: "",
    personId: "",
    rut: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    email: "",
    password: "",
    roles: [],
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  };

  const [formLogin, setFormLogin] = useState<IUser>(initialDataUser);
  const router = useRouter();

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormLogin({ ...formLogin, email: e.target.value });
  };

  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormLogin({ ...formLogin, password: e.target.value });
  };

  const handleValidate = async () => {
    try {
      await userValidate(formLogin.email, formLogin.password);
      router.push("/");
    } catch (error) {
      const err = error as Error;
      console.error(err);
      alert("Error en la validación: " + err.message);
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <Background imageUrl="/image/background2.png">
      <div className={style.logoContainer}>
        <LogoLarge width="20" height="30" />
        <Box width="670px" height="443px">
          <ContentCol gap="60px" alignItems="center">
            <Title text="Login" level="h1" />
            <ContentCol gap="8px">
              <Input
                value={formLogin.email || ""}
                placeholder="Email"
                name="email"
                onChange={handleOnChangeEmail}
                width="400px"
                height="50px"
              />
              <ContentCol gap="60px">
                <Input
                  type="password"
                  value={formLogin.password || ""}
                  name="password"
                  placeholder="Password"
                  onChange={handleOnChangePassword}
                  width="400px"
                  height="50px"
                />
                <ContentRow gap="8px" justifyContent="space-between">
                  <Button
                    width="190px"
                    height="50px"
                    text="Ingresar"
                    color="primary"
                    onClick={handleValidate}
                  />
                  <Button
                    width="190px"
                    height="50px"
                    text="Registrar"
                    color="primary"
                    onClick={handleRegister}
                  />
                </ContentRow>
              </ContentCol>
            </ContentCol>
          </ContentCol>
        </Box>
      </div>
    </Background>
  );
};

export default Login;
