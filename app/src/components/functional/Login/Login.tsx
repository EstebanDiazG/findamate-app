import React, { useState, useEffect } from "react";
import { useUser } from "@/store/hooks";
import { IUser, IRol } from "@/interfaces/user";
import style from "./Login.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";

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
      router.push("/user"); // Redirige a la página /user
    } catch (error) {
      const err = error as Error;
      console.error(err);
      alert("Error en la validación: " + err.message);
    }
  };

  return userList ? (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.contentCol} style={{ gap: "81px" }}>
          <h1>Identificación</h1>
          <div className={style.contentCol} style={{ gap: "20px" }}>
            <input
              className={style.input}
              style={{ gap: "20px" }}
              value={formLogin.email || ""}
              placeholder="Email"
              onChange={handleOnChangeEmail}
            />
            <input
              className={style.input}
              style={{ marginTop: "20px" }}
              type="password"
              value={formLogin.password || ""}
              placeholder="Password"
              onChange={handleOnChangePassword}
            />
            <div
              className={style.contentCol}
              style={{ display: "flex", gap: "5px", flexDirection: "row" }}
            >
              <button className={style.button} onClick={handleValidate}>
                Ingresar
              </button>
              <Link href="/register">
                <button className={style.button}>Registrar</button>
              </Link>
            </div>
          </div>
        </div>
        <div className={style.contentCol} style={{ gap: "10px" }}>
          {userList.length > 0 &&
            userList.map((item, idx) => (
              <div key={idx} className={style.tableCell}>
                {`${item.id} | ${item.name} | ${item.rut}`}
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <div>Cargando</div>
  );
};

export default Login;
