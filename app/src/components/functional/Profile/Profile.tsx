import React, { useState, useEffect, use } from "react";
import { useProfile, useUser } from "@/store/hooks";
import styles from "./Profile.module.scss";
import { IProfile } from "@/interfaces/profile";
import ProfilePhoto from "@/components/ui/ProfilePhoto";
import InputPage from "@/components/ui/InputPage";
import Button from "@/components/ui/Button";
import Tittle from "@/components/ui/Tittle";

const Profile = () => {
  const {
    profile,
    profileGetAll,
    profileUpdate,
    profileDeleteById,
    profileReset,
    profileGetByIdPerson,
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

  const { user, userUpdatePassword } = useUser();

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
    profileGetByIdPerson(formProfile.personId);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormProfile((prevState) => ({
      ...prevState,
      password: event.target.value,
    }));
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
    if (user) {
      profileGetByIdPerson(user.personId);
    }
  }, [user]);

  useEffect(() => {
    profileGetAll();
  }, [profileGetAll]);

  useEffect(() => {
    if (profile) {
      setFormProfile(profile);
      profileGetAll();
    }
  }, [profile, profileGetAll]);

  return (
    <div className={styles.profile}>
      <div className={styles.leftColumn}>
        <ProfilePhoto src="/image/profile-photo.png" alt="profile-photo" />
        <br />
        <Tittle
          width="500px"
          text="¡Bienvenido a Findamate!, en este espacio puedes compatir con los demas mates acerca de tus intereses, tus logros o lo que esperas aprender."
          level="h2"
        />
        <br />
        <InputPage
          width="500px"
          height="200px"
          type="text"
          value={formProfile?.description}
          placeholder="Cuentanos sobre ti..."
          onChange={handleOnChangeDescription}
        />
      </div>
      <div className={styles.rightColumn}>
        <Tittle text="Mi perfil" level="h2" />
        <br />
        <InputPage
          width="500px"
          height="50px"
          type="text"
          label="Nombre"
          value={formProfile?.name}
          placeholder="Ingrese nombre"
          onChange={handleOnChangeName}
        />
        <InputPage
          width="500px"
          height="50px"
          type="text"
          label="Apellido Paterno"
          value={formProfile?.paternalLastName}
          placeholder="Apellido Paterno"
          onChange={handleOnChangePaternalLastName}
        />
        <InputPage
          width="500px"
          height="50px"
          type="text"
          label="Apellido Materno"
          value={formProfile?.maternalLastName}
          placeholder="Apellido Materno"
          onChange={handleOnChangeMaternalLastName}
        />
        <InputPage
          hidden={true}
          width="500px"
          height="50px"
          type="text"
          label="ID de Persona"
          value={formProfile?.personId}
          placeholder="ID de Persona"
          onChange={handleOnChangeidPerson}
          onBlur={handleOnBlurId}
        />
        <InputPage
          width="500px"
          height="50px"
          type="password"
          label="Contraseña"
          value={formProfile.password || ""}
          onChange={handlePasswordChange}
          placeholder="Contraseña"
        />
        <div className={styles.buttonContainer}>
          <Button
            width="150px"
            height="40px"
            text="Actualizar"
            color="primary"
            onClick={handleOnClickUpdate}
          />
          <Button
            width="150px"
            height="40px"
            text="Eliminar Cuenta"
            color="primary"
            onClick={handleOnClickDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
