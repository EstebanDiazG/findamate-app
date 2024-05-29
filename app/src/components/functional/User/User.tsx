import React, { useState, useEffect } from "react";
import { useUser } from "@/store/hooks";

import { IUser, IRol } from "@/interfaces/user";

import style from "./User.module.scss";

const User = () => {
  const {
    user,
    userList,
    isError,
    error,
    userGetAll,
    userGetById,
    userUpsert,
    userDelete,
    userValidate,
    userUpdatePassword,
    userAssignRol,
    userRemoveRol,
    userReset,
  } = useUser();

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

  const [formUser, setFormUser] = useState<IUser>(initialDataUser);

  const handleOnChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormUser({ ...formUser, id: e.target.value });
  };

  const handleOnChangeRut = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormUser({ ...formUser, rut: e.target.value });
  };

  const handleOnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormUser({ ...formUser, name: e.target.value });
  };

  const handleOnChangePaternalLastName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormUser({ ...formUser, paternalLastName: e.target.value });
  };

  const handleOnChangeMaternalLastName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormUser({ ...formUser, maternalLastName: e.target.value });
  };

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormUser({ ...formUser, email: e.target.value });
  };

  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormUser({ ...formUser, password: e.target.value });
  };

  const handleOnChangeRoles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedRoles = e.target.value
      .split(",")
      .map((id) => ({ id, code: "", name: "" }));
    setFormUser({ ...formUser, roles: updatedRoles });
  };

  const handleOnBlurId = () => {
    userGetById(formUser.id);
  };

  const handleOnClickClean = () => {
    userReset();
  };

  const handleOnClickSave = () => {
    userUpsert(formUser);
  };

  const handleOnClickDelete = () => {
    userDelete(formUser.id);
    setFormUser(initialDataUser);
  };

  const handleOnClickChangePassword = () => {
    userUpdatePassword(formUser.personId, formUser.password);
    alert("Contraseña cambiada ✅");
  };

  const handleOnClickAssignRole = () => {
    formUser.roles.forEach((role) => {
      userAssignRol(formUser.id, role);
    });
    alert("Rol asignado con éxito");
  };

  const handleOnClickRemoveRole = () => {
    formUser.roles.forEach((role) => {
      userRemoveRol(formUser.id, role);
      alert("Rol removido con éxito");
    });
  };

  useEffect(() => {
    userGetAll();
  }, [userGetAll]);

  useEffect(() => {
    if (user) {
      setFormUser(user);
      userGetAll();
    }
  }, [user, userGetAll]);

  return userList ? (
    <div className={style.container}>
      <div className={style.contentCol}>
        <h1 className={style.h1}>USER</h1>
        <input
          className={style.input}
          value={formUser.id || ""}
          placeholder="ID"
          onChange={handleOnChangeId}
          onBlur={handleOnBlurId}
        />
        <input
          className={style.input}
          value={formUser.rut || ""}
          placeholder="RUT"
          onChange={handleOnChangeRut}
        />
        <input
          className={style.input}
          value={formUser.name || ""}
          placeholder="Name"
          onChange={handleOnChangeName}
        />
        <input
          className={style.input}
          value={formUser.paternalLastName || ""}
          placeholder="Paternal Last Name"
          onChange={handleOnChangePaternalLastName}
        />
        <input
          className={style.input}
          value={formUser.maternalLastName || ""}
          placeholder="Maternal Last Name"
          onChange={handleOnChangeMaternalLastName}
        />
        <input
          className={style.input}
          value={formUser.email || ""}
          placeholder="Email"
          onChange={handleOnChangeEmail}
        />
        <input
          className={style.input}
          value={formUser.password || ""}
          placeholder="Password"
          onChange={handleOnChangePassword}
        />
        <input
          className={style.input}
          value={
            (Array.isArray(formUser?.roles) ? formUser.roles : [])
              .map((role) => role.id)
              .join(",") || ""
          }
          placeholder="Role IDs"
          onChange={handleOnChangeRoles}
        />
        {(Array.isArray(formUser?.roles) ? formUser.roles : []).map(
          (role, index) => (
            <React.Fragment key={index}>
              <input
                value={role.code || ""}
                placeholder="Role Code"
                readOnly
                className={style.input}
              />
              <input
                value={role.name || ""}
                placeholder="Role Name"
                readOnly
                className={style.input}
              />
            </React.Fragment>
          )
        )}

        <div className={style.contentRow}>
          <button
            className={`${style.button} ${style.savebtn}`}
            onClick={handleOnClickSave}
          >
            Guardar
          </button>
          <button
            className={`${style.button} ${style.cleanbtn}`}
            onClick={handleOnClickClean}
          >
            Limpiar
          </button>
          <button
            className={`${style.button} ${style.deletebtn}`}
            onClick={handleOnClickDelete}
          >
            Eliminar
          </button>
          <button
            className={`${style.button} ${style.savebtn}`}
            onClick={handleOnClickAssignRole}
          >
            Asignar Rol
          </button>
          <button
            className={`${style.button} ${style.deletebtn}`}
            onClick={handleOnClickRemoveRole}
          >
            Remover Rol
          </button>
          <button
            className={`${style.button} ${style.mostrarTbtn}`}
            onClick={handleOnClickChangePassword}
          >
            Cambiar contraseña
          </button>
        </div>

        <div className={style.contentCol}>
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

export default User;
