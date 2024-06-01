import React, { useState, useEffect } from "react";
import { useCategoryInterest } from "@/store/hooks";
import styles from "./CategoryInterest.module.scss";
import { ICategoryInterest } from "@/interfaces/categoryInterest";

const CategoryInterest = () => {
  const {
    categoryInterest,
    categoryInterestList,
    isLoading,
    isError,
    error,
    categoryInterestGetAll,
    categoryInterestGetById,
    categoryInterestDeleteById,
    categoryInterestReset,
    categoryInterestResetAll,
  } = useCategoryInterest();

  const initialDataCategoryInterest = {
    id: "",
    name: "",
    interes: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  };

  const [formCategoryInterest, setFormCategoryInterest] = useState<ICategoryInterest>(initialDataCategoryInterest);

  useEffect(() => {
    if (categoryInterest) {
      setFormCategoryInterest({
        ...formCategoryInterest,
        name: categoryInterest.name,
        interes: categoryInterest.interes,
      });
    }
  }, [categoryInterest]);

  const handleOnChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormCategoryInterest({ ...formCategoryInterest, id: e.target.value });
  };

  const handleOnClickClean = () => {
    setFormCategoryInterest(initialDataCategoryInterest);
    categoryInterestResetAll();
  };

  const handleOnClickGetAll = () => {
    categoryInterestGetAll();
    setFormCategoryInterest(initialDataCategoryInterest);
  };

  const handleOnClickGetById = async (id: string) => {
    await categoryInterestGetById(id);
  };

  return categoryInterestList ? (
    <div className={styles.container}>
      <h1 className={styles.title}>CATEGORIA</h1>
      <input
        type="text"
        value={formCategoryInterest.id}
        placeholder="id"
        onChange={handleOnChangeId}
        className={styles.inputField}
      />
      <br />
      <input
        type="text"
        value={formCategoryInterest.name}
        placeholder="name"
        className={styles.inputField}
        readOnly
      />
      <br />
      <input
        type="text"
        value={formCategoryInterest.interes}
        placeholder="interes"
        className={styles.inputField}
        readOnly
      />
      <br />
      <div>
        <button className={styles.button} onClick={handleOnClickGetAll}>
          Mostrar Todo
        </button>
        <button className={styles.button} onClick={() => handleOnClickGetById(formCategoryInterest.id)}>
          Buscar
        </button>
        <button className={styles.button} onClick={handleOnClickClean}>
          Limpiar
        </button>
      </div>

      <div className={styles.categoryInterestList}>
        {categoryInterestList.map((item, idx) => (
          <div key={idx} className={styles.categoryInterestItem}>
            {`${item.id} || ${item.name} || ${item.interes}`}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>Cargando</div>
  );
};

export default CategoryInterest;
