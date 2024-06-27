import React from "react";
import styles from "./UserInterests.module.scss";
import { IInterest } from "@/interfaces/interest";

interface IUserInterests {
  interests: IInterest[];
  onRemoveInterest: (interestId: string) => void;
}

const UserInterests: React.FC<IUserInterests> = ({ interests, onRemoveInterest }) => {

  const limitedInterests = interests.slice(0, 5);

  return (
    <div className={styles.userInterests}>
      {limitedInterests && limitedInterests.length > 0 ? (
        <div>
          <ul className={styles.interestList}>
            {limitedInterests.map((interest) => (
              <li key={interest.id} className={styles.interestItem}>
                {interest.name}
                <button 
                  className={styles.removeButton} 
                  onClick={() => onRemoveInterest(interest.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          {interests.length > 5 && (
            <div className={styles.moreInterests}>
              <p>Llegaste al maximo de intereses por seleccionar.</p>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.noInterests}>No hay intereses asignados a este usuario.</div>
      )}
    </div>
  );
};

export default UserInterests;
