import React from "react";
import { menu } from "../../../data/menu";
import styles from "./Menu.module.scss";
import { useUi } from "@/store/hooks";
import Link from "next/link";

const Menu = () => {
  const { ui, uiTogleOpenMenu } = useUi();

  return (
    <div
      className={styles.menu}
      style={{ left: ui.isOpenMenu ? "0px" : "-300px" }}
    >
      <ul className={styles["menu-section"]}>
        {menu.map((section) => (
          <li key={section.id}>
            <div className={styles["menu-section-title"]}>
              <span
                className="material-symbols-outlined"
                style={{ marginRight: "6px" }}
              >
                {section.icon}
              </span>
              {section.seccion}
            </div>
            <ul>
              {section.option.map((option) => (
                <li key={option.id} onClick={uiTogleOpenMenu}>
                  <Link href={(option as any).path || ""}>{option.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
