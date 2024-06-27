import React, { useState, useEffect } from "react";
import { useInterest, useUser, usePerson } from "@/store/hooks";
import styles from "./Interest.module.scss";
import { IInterest } from "@/interfaces/interest";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import Button from "@/components/ui/Button";
import UserInterests from "@/components/ui/UserInterests";
import { ContentCol } from "@/components/layout/Content";
import Title from "@/components/ui/Tittle";

const Interest = () => {
  const {
    interestList,
    interestGetAll,
    interestGetById,
    interestResetAll,
  } = useInterest();

  const {
    person,
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
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [userInterests, setUserInterests] = useState<IInterest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.personId) {
        try {
          const data = await persongGetInterestsByPersonId(user.personId);
          setUserInterests(data);
        } catch (error) {
          console.error("Error fetching user interests:", error);
        }
      }
    };

    fetchData();
  }, [persongGetInterestsByPersonId, user?.personId]);

  useEffect(() => {
    interestGetAll();
  }, [interestGetAll]);

  const handleCheckboxChange = (id: string) => {
    setSelectedInterests((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((interestId) => interestId !== id);
      } else if (prevSelected.length < 5) {
        return [...prevSelected, id];
      } else {
        alert("Solo se pueden seleccionar un máximo de 5 intereses.");
        return prevSelected;
      }
    });
  };

  const handleAssignInterests = async () => {
    if (selectedInterests.length === 0) {
      alert("No se ha seleccionado ningún interés.");
      return;
    }
  
    if (user?.personId) {
      try {
        for (const interestId of selectedInterests) {
          await personAssignInterest(user.personId, { id: interestId });
        }
        const updatedInterests = await persongGetInterestsByPersonId(user.personId);
        setUserInterests(updatedInterests);
        
        // Resetear los intereses seleccionados después de asignarlos
        setSelectedInterests([]);
      } catch (error) {
        console.error("Error assigning interests:", error);
      }
    } else {
      alert("No hay persona seleccionada.");
    }
  };

  const handleRemoveInterest = async (interestId: string) => {
    if (user?.personId) {
      try {
        await personRemoveInterest(user.personId, { id: interestId });
        const updatedInterests = await persongGetInterestsByPersonId(user.personId);
        setUserInterests(updatedInterests);
      } catch (error) {
        console.error("Error removing interest:", error);
      }
    } else {
      alert("No hay persona seleccionada.");
    }
  };

  return (
    <div className={styles.container}>
      <ContentCol width="100%" height="100%" gap="15px" >
        <Title
          text="Mis intereses"
          level="h2"
          width="100%"
          height="70px"
          color="#41377D"
          alignItems="center"
          justifyContent="flex-start"
        />
        <UserInterests interests={userInterests} onRemoveInterest={handleRemoveInterest} />
        <Title
          text="Seleccionar intereses"
          level="h2"
          width="100%"
          height="70px"
          color="#41377D"
          alignItems="center"
          justifyContent="flex-start"
        />
        {interestList && interestList.length > 0 ? (
          <CheckboxGroup
            name="interest"
            selectedValues={selectedInterests}
            onChange={handleCheckboxChange}
            options={interestList}
          />
        ) : (
          <div>No hay intereses disponibles.</div>
        )}

        <Button 
          text="Asignar Intereses"
          color="primary"
          width="200px"
          height="40px"
          onClick={handleAssignInterests}
        />
      </ContentCol>

      


    </div>
  );
};

export default Interest;
