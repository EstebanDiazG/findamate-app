import style from "./Box.module.scss"

interface Ibox {
    children: React.ReactNode;
    gap?: string;
    width?: string;
    height?: string;
}

const Box = ({ children, gap, width="auto", height="auto"}: Ibox) => {
    return (
      <div className={style.box} >
        <div className={style.rectangle} style={{gap, width, height}}>
          {children}
        </div>
      </div>
    );
  };

export default Box;
