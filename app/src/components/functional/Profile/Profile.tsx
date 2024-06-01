import React, { useState, useEffect } from "react";

import { useProfile, useUser } from "@/store/hooks";

import styles from "./Profile.module.scss";

import { IProfile } from "@/interfaces/profile";

const Profile = () => {
  const {
    profile,
    profileList,
    profileGetAll,
    profileGetById,
    profileUpdate,
    profileDeleteById,
    profileReset,
  } = useProfile();

  const initialDataProfile = {
    id: "",
    description: "",
    personId: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    password: "",
    id_imagen: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  };

  const [formProfile, setFormProfile] = useState<IProfile>(initialDataProfile);

  const { userUpdatePassword } = useUser();

  const handleOnChangeid = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormProfile({ ...initialDataProfile, id: e.target.value });
  };

  const handleOnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormProfile({ ...formProfile, name: e.target.value });
  };

  const handleOnChangePaternalLastName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormProfile({ ...formProfile, paternalLastName: e.target.value });
  };

  const handleOnChangeMaternalLastName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormProfile({ ...formProfile, maternalLastName: e.target.value });
  };

  const handleOnChangeidPerson = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormProfile({ ...formProfile, personId: e.target.value });
  };

  const handleOnChangeDescription = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormProfile({ ...formProfile, description: e.target.value });
  };

  const handleOnBlurId = () => {
    profileGetById(formProfile.id);
  };

  const handleOnClickClean = () => {
    profileReset();
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    userUpdatePassword(formProfile.personId, newPassword);
  };

  const handleOnClickUpdate = () => {
    profileUpdate(
      formProfile.id,
      formProfile.description,
      formProfile.name,
      formProfile.paternalLastName,
      formProfile.maternalLastName
    );
    userUpdatePassword(formProfile.personId, formProfile.password);
  };

  const handleOnClickDelete = () => {
    profileDeleteById(formProfile.id);
    profileReset();
  };

  useEffect(() => {
    profileGetAll();
  }, [profileGetAll]);

  useEffect(() => {
    if (profile) {
      setFormProfile(profile);
      profileGetAll();
    }
  }, [profile, profileGetAll]);

  return profileList ? (
    <div className={styles.container}>
      <h1 className={styles.title}> PROFILE </h1>
      <input
        type="text"
        value={formProfile?.id}
        placeholder="id"
        onChange={handleOnChangeid}
        onBlur={handleOnBlurId}
        className={styles.inputField}
      />
      <br />
      <input
        type="text"
        value={formProfile?.name}
        placeholder="name"
        className={styles.inputField}
        onChange={handleOnChangeName}
      />
      <br />
      <input
        type="text"
        value={formProfile?.paternalLastName}
        placeholder="paternalLastName"
        className={styles.inputField}
        onChange={handleOnChangePaternalLastName}
      />
      <br />
      <input
        type="text"
        value={formProfile?.maternalLastName}
        placeholder="maternalLastName"
        className={styles.inputField}
        onChange={handleOnChangeMaternalLastName}
      />
      <br />
      <input
        type="text"
        value={formProfile?.personId}
        placeholder="personID"
        onChange={handleOnChangeidPerson}
        className={styles.inputField}
      />
      <br />
      <input
        type="text"
        value={formProfile?.description}
        placeholder="descripcion"
        onChange={handleOnChangeDescription}
        className={styles.inputField}
      />
      <br />
      <input
        type="text"
        onChange={handlePasswordChange}
        placeholder="Password"
        className={styles.inputField}
      />
      <br />

      <div>
        <button className={styles.button} onClick={handleOnClickUpdate}>
          Actualizar
        </button>
        <button className={styles.button} onClick={handleOnClickClean}>
          Limpiar
        </button>
        <button className={styles.button} onClick={handleOnClickDelete}>
          Eliminar
        </button>
      </div>

      <div className={styles.profileList}>
        {profileList?.length &&
          profileList.map((item, idx) => (
            <div
              key={idx}
              className={styles.personItem}
            >{` ${item.id} | ${item.name} ${item.paternalLastName} ${item.maternalLastName} | ${item.personId} | ${item.description}`}</div>
          ))}
      </div>
    </div>
  ) : (
    <div>Cargando</div>
  );
};

export default Profile;
