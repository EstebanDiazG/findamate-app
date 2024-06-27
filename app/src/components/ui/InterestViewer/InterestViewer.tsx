// InterestViewer.tsx (ajustado)
import React from "react";
import styles from "./InterestViewer.module.scss"; // Asegúrate de importar los estilos adecuadamente
import { IInterest } from "@/interfaces/interest";

interface IInterestViewer {
  interests: IInterest[];
}

const InterestViewer: React.FC<IInterestViewer> = ({ interests }) => {
  return (
    <div className={styles.userInterests}> 
      {interests && interests.length > 0 ? (
        <div>
          <ul className={styles.interestList}>
            {interests.map((interest) => (
              <li key={interest.id} className={styles.interestItem}>
                {interest.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.noInterests}>No hay intereses asignados a este usuario.</div>
      )}
    </div>
  );
};

export default InterestViewer;
