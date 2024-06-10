import styles from "./FloatMenu.module.scss";
import ButtonIcon from "../ButtonIcon";

interface IFloatMenu {
  menu: { icon: string; onClick: () => void }[];
}

const FloatMenu = ({ menu }: IFloatMenu) => {
  return (
    <div className={styles.floatMenu}>
      {menu.map((item, index) => (
        <ButtonIcon key={index} iconName={item.icon} onClick={item.onClick} />
      ))}
    </div>
  );
};

export default FloatMenu;
