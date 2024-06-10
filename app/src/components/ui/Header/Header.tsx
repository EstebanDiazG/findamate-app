import { ContentRow } from "@/components/layout/Content";
import ButtonIcon from "@/components/ui/ButtonIcon";

import { useUi, useUser } from "@/store/hooks";

import styles from "./Header.module.scss";
import Avatar from "../Avatar";
import SearchBox from "../SearchBox/SearchBox";

const Header = () => {
  const { userReset, user } = useUser();
  const { uiTogleOpenMenu } = useUi();

  const handleOnClickCloseSession = () => {
    userReset();
  };

  return (
    <div className={styles.header}>
      <ContentRow width="100%" justifyContent="space-between">
        <ButtonIcon iconName="menu" onClick={uiTogleOpenMenu} />
        <ContentRow gap="18px">
          <SearchBox width="250px" value="" onChange={() => {}} />
          <Avatar />
        </ContentRow>
      </ContentRow>
    </div>
  );
};

export default Header;
