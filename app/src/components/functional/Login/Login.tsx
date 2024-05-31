import React, { useState, useEffect } from "react";
import { useUser } from "@/store/hooks";
import { IUser, IRol } from "@/interfaces/user";
import style from "./Login.module.scss";
import Background from "@/components/ui/Background/Background";
import Box from "@/components/ui/Box";
import { ContentCol, ContentRow } from "@/components/layout/Content";
import Title from "@/components/ui/Tittle";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import LogoLarge from "@/components/ui/LogoLarge";
import TableCell from "@/components/ui/TableCell";

const Login = () => {
  const { user, userList, isError, error, userValidate } = useUser();

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

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormLogin({ ...formLogin, email: e.target.value });
  };

  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormLogin({ ...formLogin, password: e.target.value });
  };

  const handleValidate = async () => {
    try {
      await userValidate(formLogin.email, formLogin.password);
    } catch (error) {
      const err = error as Error;
      console.error(err);
      alert("Error en la validación: " + err.message);
    }
  };

  return userList ? (
    <Background imageUrl="/image/background2.png">
      <div className={style.logoContainer}>
        <LogoLarge width="20" height="30" />
          <Box width="713px" height="443px">
            <ContentCol gap="63px">
              <Title text="Login" level="h1" />
              <ContentCol gap="0px" >
                <Input
                  value={formLogin.email || ""}
                  placeholder="Email"
                  onChange={handleOnChangeEmail}
                  width="400px"
                  height="50px"
                />
              <ContentCol gap="24px">
                <Input
                  type="password"
                  value={formLogin.password || ""}
                  placeholder="Password"
                  onChange={handleOnChangePassword}
                  width="400px"
                  height="50px"
                />
            
                <ContentRow gap="8px" justifyContent="space-between">
              
                  <Button 
                    width="200px"
                    height="50px"
                    text="Ingresar"
                    color="primary"
                    onClick={handleValidate}
                  />
                   <Button 
                    width="200px"
                    height="50px"
                    text="Ingresar"
                    color="primary"
                    onClick={handleValidate}
                  />
                </ContentRow>
                  
                

            <ContentCol gap="10px">
              {userList.length > 0 &&
                userList.map((item, idx) => (
                  <TableCell key={idx}>
                    {`${item.id} | ${item.name} | ${item.rut}`}
                  </TableCell>
                ))}
              </ContentCol>
              </ContentCol>
            </ContentCol>
            </ContentCol>
          
          </Box>
      </div>
  
    </Background>
  ) : (
    <div>Cargando</div>
    
  );
};

export default Login;
