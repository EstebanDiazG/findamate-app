import React, { useState, useEffect } from "react";
import { useInterest, useUser, usePerson } from "@/store/hooks";
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

  const {
    person,
    personList,
    personDeleteById,
    personUpsert,
    personGetAll,
    personGetByRut,
    personReset,
    persongGetInterestsByPersonId,
    personAssignInterest,
    personRemoveInterest,
  } = usePerson();

  const { user } = useUser();



  
  const initialDataInterest = {
    id: "",
    name: "",
    state: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  };

  const [formInterest, setFormInterest] = useState<IInterest>(initialDataInterest);
  const [selectedInterest, setSelectedInterest] = useState<string>("");
  const [userInterests, setUserInterests] = useState<IInterest[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      if (user?.personId) {
        try {
          console.log(user.personId);
          const data = await persongGetInterestsByPersonId(user.personId);
          setUserInterests(data); // Establece los intereses directamente
          console.log(data);
        } catch (error) {
          console.error("Error fetching user interests:", error);
        }
      }
    };
  
    fetchData();
  }, [persongGetInterestsByPersonId]);


  useEffect(() => {
    interestGetAll();
  }, [interestGetAll]);
  

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

  const handleRadioChange = (id: string) => {
    setSelectedInterest(id);
    console.log(selectedInterest);
  };

  const handleAssignInterest = async () => {
    if (userInterests.length >= 5) {
      alert("Solo se pueden tener un maximo de 5 intereses.");
      return;
    }

    if (selectedInterest && user?.personId) {
      try {
        await personAssignInterest(user.personId, { id: selectedInterest });
        const updatedInterests = await persongGetInterestsByPersonId(user.personId);
        setUserInterests(updatedInterests);
      } catch (error) {
        console.error("Error assigning interest:", error);
      }
    } else {
      alert("No se ha seleccionado un interés o no hay persona seleccionada.");
    }
  };

  const handleRemoveInterest = async () => {
    if (selectedInterest && user?.personId) {
      try {
        await personRemoveInterest(user.personId, { id: selectedInterest });
        const updatedInterests = await persongGetInterestsByPersonId(user.personId);
        setUserInterests(updatedInterests);
      } catch (error) {
        console.error("Error removing interest:", error);
      }
    } else {
      alert("No se ha seleccionado un interés o no hay persona seleccionada.");
    }
  };

  

  return (
    <div>
      <h1 className={styles.title}>INTEREST</h1>
      <h3>{user?.personId}</h3>
      {userInterests && userInterests.length > 0 ? (
        <div>
          <h2>Intereses del usuario:</h2>
          <ul>
            {userInterests.map((interest: IInterest) => (
              <li key={interest.id}>
                {interest.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No hay intereses asignados a este usuario.</div>
      )}
      <h2>Intereses</h2>
      {interestList && interestList.length > 0 ? (
        <ul>
          {interestList.map((interest: IInterest) => (
            <li key={interest.id}>
              {interest.name}
              <input
                type="radio"
                name="interest"
                value={interest.id}
                checked={selectedInterest === interest.id}
                onChange={() => handleRadioChange(interest.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div>No hay intereses disponibles.</div>
      )}
      <button onClick={handleAssignInterest}>Asignar Interés</button>
      <button onClick={handleRemoveInterest}>Quitar Interés</button>
    </div>
  );
};

export default Interest;
