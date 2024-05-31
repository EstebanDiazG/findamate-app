import Style from "./LogoSmall.module.scss";

interface IlogoSmall {
    children?: React.ReactNode;  
    width?: string;
    height?: string;
}

export const LogoSmall = ({children, width="auto", height="auto"}: IlogoSmall) => {
  return (
    <img src="/image/logoLarge.png" alt="logo-simple" style={{width, height}}>
    {children}
    </img>
  )
}

export default LogoSmall;