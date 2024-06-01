import React, { useState, useEffect } from "react";
import { useInterest } from "@/store/hooks";
import styles from "./Interest.module.scss";
import { IInterest } from "@/interfaces/interest";

const Interest = () => {
  const {
    interest,
    interestList,
    isLoading,
    isError,
    error,
    interestGetAll,
    interestGetById,
    interestDeleteById,
    interestReset,
    interestResetAll,
  } = useInterest();
  
  const initialDataInterest = {
    id: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  };

  const [formInterest, setFormInterest] = useState<IInterest>(initialDataInterest);

  const handleOnChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInterest({ ...formInterest, id: e.target.value });
  };

  const handleOnClickClean = () => {
    setFormInterest(initialDataInterest);
    interestResetAll();
  };

  const handleOnClickGetAll = () => {
    interestGetAll();
    setFormInterest(initialDataInterest);
  };

  const handleOnClickGetById = (id: string) => {
    interestGetById(id);
    setFormInterest({ ...formInterest, name: interest ? interest.name : "" });
  };

  return interestList ? (
    <div className={styles.container}>
      <h1 className={styles.title}>INTEREST</h1>
      <input
        type="text"
        value={formInterest.id}
        placeholder="id"
        onChange={handleOnChangeId}
        className={styles.inputField}
      />
      <br />
      <input
        type="text"
        value={formInterest.name}
        placeholder="name"
        className={styles.inputField}
      />
      <br />
      <div>
        <button className={styles.button} onClick={handleOnClickGetAll}>
          Mostrar Todo
        </button>
        <button className={styles.button} onClick={() => handleOnClickGetById(formInterest.id)}>
          Buscar
        </button>
        <button className={styles.button} onClick={handleOnClickClean}>
          Limpiar
        </button>
      </div>

      <div className={styles.interestList}>
        {interestList.map((item, idx) => (
          <div key={idx} className={styles.interestItem}>
            {`${item.id} || ${item.name}`}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>Cargando</div>
  );
};

export default Interest;
