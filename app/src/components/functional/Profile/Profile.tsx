import React, { useState, useEffect } from "react";
import { useProfile, useUser, usePerson } from "@/store/hooks";
import styles from "./Profile.module.scss";
import { IProfile } from "@/interfaces/profile";
import InputPage from "@/components/ui/InputPage";
import Button from "@/components/ui/Button";
import Tittle from "@/components/ui/Tittle";
import Card from "@/components/ui/Card";
import { ContentCol, ContentRow } from "@/components/layout/Content";
import TextArea from "@/components/ui/TextArea";
import { useRouter } from "next/router";
import Avatar from "@/components/ui/Avatar";
import InterestViewer from "@/components/ui/InterestViewer";
import { IInterest } from "@/interfaces/interest";
import { useMedia } from "@/store/hooks";

const Profile = () => {
  const {
    profile,
    profileGetAll,
    profileUpdate,
    profileDeleteById,
    profileReset,
    profileGetByIdPerson,
  } = useProfile();

  const { user, userUpdatePassword, userDelete } = useUser();
  const { persongGetInterestsByPersonId, personDeleteById } = usePerson(); // Obtén la función para obtener intereses por ID de persona

  const router = useRouter();

  const initialDataProfile = {
    id: "",
    description: "",
    personId: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    password: "",
    id_media: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  };

  const [formProfile, setFormProfile] = useState<IProfile>(initialDataProfile);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [userInterests, setUserInterests] = useState<IInterest[]>([]); // Estado para los intereses del usuario
  const [updateError, setUpdateError] = useState<string | null>(null);
  const { mediaUploadMedia, mediaGetMediaById } = useMedia();

  const handleImageChange = (file: File) => {
    setNewImageFile(file);
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
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormProfile({ ...formProfile, description: e.target.value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormProfile((prevState) => ({
      ...prevState,
      password: event.target.value,
    }));
  };

  const handleOnClickUpdate = async () => {
    setUpdateError(null);

    try {
      if (newImageFile) {
        const formData = new FormData();
        formData.append("profileImage", newImageFile);

        const response = await fetch("/api/uploadProfileImage", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Error al subir la imagen");
        }

        const data = await response.json();
        const updatedProfile: IProfile = {
          ...formProfile,
          id_media: data.imageUrl,
        };

        await profileUpdate(
          updatedProfile.id,
          updatedProfile.description,
          updatedProfile.name,
          updatedProfile.paternalLastName,
          updatedProfile.maternalLastName
        );

        await userUpdatePassword(
          updatedProfile.personId,
          updatedProfile.password
        );
      } else {
        await profileUpdate(
          formProfile.id,
          formProfile.description,
          formProfile.name,
          formProfile.paternalLastName,
          formProfile.maternalLastName
        );

        await userUpdatePassword(formProfile.personId, formProfile.password);
      }

      // Refrescar el perfil después de la actualización
      profileGetByIdPerson(user?.personId || "");

      // Redirigir a la página de inicio de sesión después de actualizar la contraseña
      if (formProfile.password) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setUpdateError("Ocurrió un error al actualizar el perfil.");
    }
  };

  const handleOnClickDelete = () => {
    profileDeleteById(formProfile.id);
    userDelete(user?.id || "");
    personDeleteById(formProfile.personId);
    window.location.reload();
  };

  useEffect(() => {
    if (user) {
      profileGetByIdPerson(user.personId);
      persongGetInterestsByPersonId(user.personId)
        .then((interests) => setUserInterests(interests))
        .catch((error) => console.error("Error al obtener intereses:", error));
    }
  }, [user, profileGetByIdPerson, persongGetInterestsByPersonId]);

  useEffect(() => {
    if (profile) {
      setFormProfile(profile);
    }
  }, [profile]);

  console.log("formProfile", formProfile);
  console.log("user", user);

  return (
    <div className={styles.profile}>
      <ContentCol gap="10px" width="100%" alignItems="center">
        <Card height="100%" width="100%" padding="30px">
          <ContentCol
            gap="20px"
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            {/* Componente Avatar con lógica para cambiar la imagen */}
            <Avatar
              width="170px"
              height="170px"
              src={formProfile.id_media}
              alt="profile-photo"
              onImageChange={handleImageChange}
            />
            <Tittle
              width="100%"
              height="auto"
              text="¡Bienvenido a Findamate!, en este espacio puedes compatir con los demas mates acerca de tus intereses, tus logros o lo que esperas aprender."
              level="h2"
              color="#645A6F"
            />
            <TextArea
              width="100%"
              height="200px"
              name="description"
              value={formProfile?.description}
              placeholder="Cuentanos sobre ti..."
              onChange={handleOnChangeDescription}
            />
            <InterestViewer interests={userInterests} />
            <Button
              width="200px"
              height="40px"
              text="Editar intereses"
              color="primary"
              onClick={() => router.push(`/interest/`)}
            />
          </ContentCol>
        </Card>
        <Card height="100%" width="1100px" padding="30px">
          <ContentCol gap="50px">
            <ContentCol
              gap="20px"
              width="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Tittle text="Mi Datos" level="h2" color="#4A4351" />
              <InputPage
                width="400px"
                height="50px"
                type="text"
                label="Nombre"
                value={formProfile?.name}
                placeholder="Ingrese nombre"
                onChange={handleOnChangeName}
              />
              <InputPage
                width="400px"
                height="50px"
                type="text"
                label="Apellido Paterno"
                value={formProfile?.paternalLastName}
                placeholder="Apellido Paterno"
                onChange={handleOnChangePaternalLastName}
              />
              <InputPage
                width="400px"
                height="50px"
                type="text"
                label="Apellido Materno"
                value={formProfile?.maternalLastName}
                placeholder="Apellido Materno"
                onChange={handleOnChangeMaternalLastName}
              />
              <InputPage
                hidden={true}
                width="400px"
                height="50px"
                type="text"
                label="ID de Persona"
                value={formProfile?.personId}
                placeholder="ID de Persona"
                onChange={handleOnChangeidPerson}
              />
              <InputPage
                width="400px"
                height="50px"
                type="password"
                label="Contraseña"
                value={formProfile.password || ""}
                onChange={handlePasswordChange}
                placeholder="Contraseña"
              />
            </ContentCol>
            <ContentRow width="100%" gap="20px" justifyContent="center">
              <Button
                width="200px"
                height="40px"
                text="Actualizar"
                color="primary"
                onClick={handleOnClickUpdate}
              />
              <Button
                width="200px"
                height="40px"
                text="Eliminar Cuenta"
                color="primary"
                onClick={handleOnClickDelete}
              />
            </ContentRow>
            {updateError && <p className={styles.error}>{updateError}</p>}
          </ContentCol>
        </Card>
      </ContentCol>
    </div>
  );
};

export default Profile;
