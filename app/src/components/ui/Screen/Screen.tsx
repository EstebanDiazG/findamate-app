import Menu from "../Menu";
import Header from "../Header";

interface IScreen {
  children: React.ReactNode;
}

const Screen = ({ children }: IScreen) => {
  return (
    <div>
      <Header />
      <Menu />
      {children}
    </div>
  );
};

export default Screen;
