import style from "./LogoLarge.module.scss"

interface IlogoLarge {
    children?: React.ReactNode;  
    width?: string;
    height?: string;
}
const LogoLarge = ({children, width="auto", height="auto"}: IlogoLarge) => {
  return (
    <div className={style.logoContainer}>
      <img src="/image/logoLarge.png" alt="logo-large" >
      {children}
      </img>
    </div>
  )
}

export default LogoLarge;
