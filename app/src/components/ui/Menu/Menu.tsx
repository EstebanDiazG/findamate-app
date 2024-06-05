import React from "react";
import { menu } from "../../../data/menu";
import styles from "./Menu.module.scss";
import { useUi } from "@/store/hooks";
import Link from "next/link";
import LogoSmall from "../LogoSmall";

const Menu = () => {
  const { ui, uiTogleOpenMenu } = useUi();

  return (
    <div
      className={styles.menu}
      style={{ left: ui.isOpenMenu ? "0px" : "-300px" }}
    >
      <div className={styles["menu-logo"]}>
       <LogoSmall width="180px"/>
      </div>
      <ul className={styles["menu-section"]}>
        {menu.map((section) => (
          <li key={section.id} className={styles["menu-item"]}>
            <ul>
              {section.option.map((option) => (
                <li key={option.id} onClick={uiTogleOpenMenu}>
                  <Link href={(option as any).path || ""}>
                    <div className={styles["menu-option-content"]}>
                      <span className="material-symbols-outlined">
                        {option.icon}
                      </span>
                      <span>{option.name}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div className={styles["menu-exit"]}>
        <div className={styles["menu-item-content"]}>
          <span className="material-symbols-outlined">logout</span>
          <span>Salida</span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
