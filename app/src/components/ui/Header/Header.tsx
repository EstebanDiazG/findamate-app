import { ContentRow } from "@/components/layout/Content";
import styles from "./Header..module.scss";
import ButtonIcon from "../ButtonIcon";
import LogoSmall from "../LogoSmall";

const Header = () => {
  return (
    <div className={styles.header}>
    <ContentRow justifyContent="space-between">
      <ContentRow gap="18px">
        <ButtonIcon iconName="menu" onClick={() => {}} />
        <LogoSmall width="114px" height="26"/>
      </ContentRow>
      <ButtonIcon iconName="logout" onClick={() => {}} />
    </ContentRow>
  </div>
  )
}

export default Header;
