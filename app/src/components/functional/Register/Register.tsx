import React, { useState } from "react";
import { useUser } from "@/store/hooks";
import { IUser } from "@/interfaces/user";
import { useRouter } from "next/router";
import { ContentCol, ContentRow } from "@/components/layout/Content"; 
import style from "./Register.module.scss";
import Background from "@/components/ui/Background/Background";
import LogoLarge from "@/components/ui/LogoLarge";
import Box from "@/components/ui/Box";
import Title from "@/components/ui/Tittle";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const Register = () => {
  const { user, userList, isError, error, userUpsert } = useUser();
  const [repeatPassword, setRepeatPassword] = useState("");
  const [rutError, setRutError] = useState(false); // Estado para controlar si se muestra el error

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

  const [formRegister, setFormRegister] = useState<IUser>(initialDataUser);
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormRegister({ ...formRegister, [name]: value });

    if (name === "rut") {
      if (!validateRut(value)) {
        setRutError(true); // Mostrar el error si el RUT no es válido
      } else {
        setRutError(false); // Ocultar el error si el RUT es válido
      }
    }
  };

  const handleRegister = async () => {
    if (formRegister.password !== repeatPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (rutError) {
      alert("Por favor, ingresa un RUT válido");
      return;
    }

    await userUpsert(formRegister);
    alert("Usuario registrado");
  };

  const handleOnChangeRepeatPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPassword(e.target.value);
  };

  const handleLogin = () => {
    router.push("/login");
  };


  const validateRut = (rut: string) => {
    const rutRegex = /^\d{7,8}-[\dkK]$/;
  
    if (!rutRegex.test(rut)) {
      return false;
    }
  
    const [rutPart, dv] = rut.split("-");
  
    if (rutPart.length < 7 || rutPart.length > 8) {
      return false;
    }
  
    if (!/^\d$|^K$/i.test(dv)) {
      return false;
    }
  
    return true;
  };

  return userList ? (
    <Background imageUrl="/image/background2.png">
      <div className={style.register}>
        <LogoLarge width="20" height="30" />
        <Box width="713px" height="700px">
          <ContentCol gap="15px">
            <Title text="Registro" level="h1" />
            <ContentCol gap="4px">
              <Input
                width="400px"
                height="50px"
                name="rut"
                value={formRegister.rut || ""}
                placeholder="Rut"
                onChange={handleOnChange}
              />
              {rutError && <span style={{ color: "red" }}>RUT inválido</span>}
              <Input
                width="400px"
                height="50px"
                name="name" 
                value={formRegister.name || ""}
                placeholder="Nombre"
                onChange={handleOnChange}
              />
              <Input
                width="400px"
                height="50px"
                name="paternalLastName"
                value={formRegister.paternalLastName || ""}
                placeholder="Apellido Paterno"
                onChange={handleOnChange}
              />
              <Input
                width="400px"
                height="50px"
                name="maternalLastName"
                value={formRegister.maternalLastName || ""}
                placeholder="Apellido Materno"
                onChange={handleOnChange}
              />
              <Input
                width="400px"
                height="50px"
                name="email"
                value={formRegister.email || ""}
                placeholder="Email"
                onChange={handleOnChange}
              />
              <Input
                width="400px"
                height="50px"
                type="password"
                name="password"
                value={formRegister.password || ""}
                placeholder="Contraseña"
                onChange={handleOnChange}
              />
              <ContentCol gap="25px">
              <Input
                width="400px"
                height="50px"
                type="password"
                name="repeatPassword"
                value={repeatPassword}
                placeholder="Repite la contraseña"
                onChange={handleOnChangeRepeatPassword}
              />
              <ContentRow gap="8px" justifyContent="space-between">
                <Button
                  width="200px"
                  height="50px"
                  text="Registrar"
                  color="primary"
                  onClick={handleRegister}
                />
                 <Button
                  width="200px"
                  height="50px"
                  text="Login"
                  color="primary"
                  onClick={handleLogin}
                />
              </ContentRow>
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

export default Register;

