import styles from "./Modal.module.scss";

interface IModal {
  children: React.ReactNode;
  display?: boolean;
}

const Modal = ({ children, display }: IModal) => {
  return (
    <div
      className={styles.modal}
      style={{ display: display ? "flex" : "none" }}
    >
      {children}
    </div>
  );
};

export default Modal;
