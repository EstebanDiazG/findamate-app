import React, { useState, useEffect } from 'react'

import { useProfile } from "@/store/hooks";

import styles from "./Profile.module.scss";

import { IProfile } from "@/interfaces/profile";


const Profile = () => {
    const {
        profile,
        profileList,
        isLoading,
        isError,
        error,
        profileGetAll,
        profileGetById,
        profileGetByIdPerson,
        profileUpdateDescription,
        profileDeleteById,
        profileReset,
        profileResetAll,
    } = useProfile();

    const initialDataProfile = {
        id: "",
        description: "",
        personID: "",
        Name: "",
        paternalLastName: "",
        maternalLastName: "",
        password: "",
        id_imagen: "",
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
    };

    const [formProfile, setFormProfile] = useState<IProfile>(initialDataProfile);

    const handleOnChangeid = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormProfile({ ...initialDataProfile, id: e.target.value });
    };

    const handleOnChangeidPerson = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormProfile({ ...initialDataProfile, personID: e.target.value });
    };

    const handleOnChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormProfile({ ...initialDataProfile, description: e.target.value });
    };

    const handleOnBlurId = () => {
        profileGetById(formProfile.id);
    };

    const handleOnClickClean = () => {
        profileReset();
    };

    const handleOnClickUpdate = () => {
        console.log("hola mundo");
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
        value={formProfile?.Name}
        placeholder="name"
        className={styles.inputField}
      />
      <br />
      <input
        type="text"
        value={formProfile?.paternalLastName}
        placeholder="paternalLastName"
        className={styles.inputField}
      />
      <br />
      <input
        type="text"
        value={formProfile?.maternalLastName}
        placeholder="maternalLastName"
        className={styles.inputField}
      />
      <br />
      <input
        type="text"
        value={formProfile?.personID}
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
        value={formProfile?.password}
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
            >{` ${item.id} | ${item.Name} ${item.paternalLastName} ${item.maternalLastName} | ${item.personID} | ${item.description}`}</div>
          ))}
      </div>
    </div>
  ) : (
    <div>Cargando</div>
  );
};

export default Profile