import Style from "./Background.module.scss";

interface IBackgroundImage {
  children?: React.ReactNode;
  imageUrl: string;
}

export const Background = ({ children, imageUrl }: IBackgroundImage) => {
  return (
    <div className={Style.backgroundContainer}>
      <img src={imageUrl} alt="background" className={Style.backgroundImage} />
      <div className={Style.overlay}></div>
      <div className={Style.content}>
        {children}
      </div>
    </div>
  );
};

export default Background;
