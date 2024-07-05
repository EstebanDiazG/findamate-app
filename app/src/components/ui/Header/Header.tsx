import { ContentRow } from "@/components/layout/Content";
import ButtonIcon from "@/components/ui/ButtonIcon";

import { useUi, useUser } from "@/store/hooks";

import styles from "./Header.module.scss";
import Avatar from "../Avatar";
import SearchBox from "../SearchBox/SearchBox";
import ContentHeader from "@/components/layout/ContentHeader";

const Header = () => {
  const { userReset, user } = useUser();
  const { uiTogleOpenMenu } = useUi();

  const handleOnClickCloseSession = () => {
    userReset();
  };

  return (
    <div className={styles.header}>
      <ContentHeader width="100%" justifyContent="space-between" alignItems="center">
        <ButtonIcon iconName="menu" onClick={uiTogleOpenMenu} />
        <ContentHeader gap="18px">
          <Avatar width="43px" height="43px"/>
        </ContentHeader>
      </ContentHeader>
    </div>
  );
};

export default Header;
