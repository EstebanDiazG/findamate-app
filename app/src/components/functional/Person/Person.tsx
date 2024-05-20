import React, { useState, useEffect } from "react";

import { usePerson } from "@/store/hooks";

import styles from "./Person.module.scss";

import { IPerson } from "@/interfaces/person";

const Person = () => {
  const {
    person,
    personList,
    personDeleteById,
    personUpsert,
    personGetAll,
    personGetByRut,
    personReset,
    isLoading,
  } = usePerson();

  const initialDataPerson = {
    id: "",
    rut: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    email: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  };

  const [formPerson, setFormPerson] = useState<IPerson>(initialDataPerson);

  const handleOnChangeRut = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormPerson({ ...initialDataPerson, rut: e.target.value });
  };

  const handleOnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormPerson({ ...formPerson, name: e.target.value });
  };

  const handleOnChangePaternalLastName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormPerson({ ...formPerson, paternalLastName: e.target.value });
  };

  const handleOnChangeMaternalLastName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormPerson({ ...formPerson, maternalLastName: e.target.value });
  };

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormPerson({ ...formPerson, email: e.target.value });
  };

  const handleOnBlurRut = () => {
    personGetByRut(formPerson.rut);
  };

  const handleOnClickClean = () => {
    personReset();
  };

  const handleOnClickSave = () => {
    personUpsert(formPerson);
  };

  const handleOnClickDelete = () => {
    personDeleteById(formPerson.id);
    personReset();
  };

  useEffect(() => {
    personGetAll();
  }, [personGetAll]);

  useEffect(() => {
    if (person) {
      setFormPerson(person);
      personGetAll();
    }
  }, [person, personGetAll]);

  return personList ? (
    <div className={styles.container}>
      <h1 className={styles.title}> PERSON </h1>
      <input
        type="text"
        value={formPerson?.rut}
        placeholder="rut"
        onChange={handleOnChangeRut}
        onBlur={handleOnBlurRut}
        className={styles.inputField}
      />
      <br />
      <input
        type="text"
        value={formPerson?.name}
        placeholder="name"
        onChange={handleOnChangeName}
        className={styles.inputField}
      />
      <br />
      <input
        type="text"
        value={formPerson?.paternalLastName}
        placeholder="paternalLastName"
        onChange={handleOnChangePaternalLastName}
        className={styles.inputField}
      />
      <br />
      <input
        type="text"
        value={formPerson?.maternalLastName}
        placeholder="maternalLastName"
        onChange={handleOnChangeMaternalLastName}
        className={styles.inputField}
      />
      <br />
      <input
        type="text"
        value={formPerson?.email}
        placeholder="email"
        onChange={handleOnChangeEmail}
        className={styles.inputField}
      />
      <br />

      <div>
        <button className={styles.button} onClick={handleOnClickSave}>
          Guardar
        </button>
        <button className={styles.button} onClick={handleOnClickClean}>
          Limpiar
        </button>
        <button className={styles.button} onClick={handleOnClickDelete}>
          Eliminar
        </button>
      </div>

      <div className={styles.personList}>
        {personList?.length &&
          personList.map((item, idx) => (
            <div
              key={idx}
              className={styles.personItem}
            >{` ${item.rut} | ${item.name} ${item.paternalLastName} ${item.maternalLastName} | ${item.email}`}</div>
          ))}
      </div>
    </div>
  ) : (
    <div>Cargando</div>
  );
};

export default Person;
