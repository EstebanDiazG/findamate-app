import React, { useState } from "react";
import { useUser } from "@/store/hooks";
import { IUser } from "@/interfaces/user";
import Link from "next/link";

import style from "./Register.module.scss";

const Register = () => {
  const { user, userList, isError, error, userUpsert } = useUser();
  const [repeatPassword, setRepeatPassword] = useState("");

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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormRegister({ ...formRegister, [name]: value });
  };

  const handleRegister = async () => {
    if (formRegister.password !== repeatPassword) {
      alert("Las contraseñas no coinciden");
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

  return userList ? (
    <div className={style.register}>
      <h1>Registro</h1>
      <div>
        <input
          name="rut"
          value={formRegister.rut || ""}
          placeholder="Rut"
          onChange={handleOnChange}
        />
        <input
          name="name"
          value={formRegister.name || ""}
          placeholder="Nombre"
          onChange={handleOnChange}
        />
        <input
          name="paternalLastName"
          value={formRegister.paternalLastName || ""}
          placeholder="Apellido Paterno"
          onChange={handleOnChange}
        />
        <input
          name="maternalLastName"
          value={formRegister.maternalLastName || ""}
          placeholder="Apellido Materno"
          onChange={handleOnChange}
        />
        <input
          name="email"
          value={formRegister.email || ""}
          placeholder="Email"
          onChange={handleOnChange}
        />
        <input
          type="password"
          name="password"
          value={formRegister.password || ""}
          placeholder="Contraseña"
          onChange={handleOnChange}
        />
        <input
          type="password"
          name="repeatPassword"
          value={repeatPassword}
          placeholder="Repite la contraseña"
          onChange={handleOnChangeRepeatPassword}
        />
        <div>
          <Link href="/login">
            <button className={style.button} onClick={handleRegister}>
              Registrar
            </button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div>Cargando</div>
  );
};

export default Register;
