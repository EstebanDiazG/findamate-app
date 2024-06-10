import { use, useEffect, useState } from "react";

import styles from "./Window.module.scss";

import Modal from "../Modal";
import ButtonIcon from "../ButtonIcon";
import Title from "../Tittle";

interface IWindow {
  children: React.ReactNode;
  title: string;
  display?: boolean;
  setClose: () => void;
}

const Window = ({ children, title, display = false, setClose }: IWindow) => {
  const [isDisplayModal, setIsDisplayModal] = useState(display);

  useEffect(() => {
    setIsDisplayModal(display);
  }, [display]);

  return (
    <Modal display={isDisplayModal}>
      <div className={styles.window}>
        <div className={styles["window-title"]}>
          <div style={{ width: "40px", height: "40px" }}>&nbsp;</div>
          <Title text={title} level="p" />
          <ButtonIcon iconName="close" onClick={setClose} />
        </div>

        <div className={styles["window-body"]}> {children}</div>
      </div>
    </Modal>
  );
};

export default Window;
