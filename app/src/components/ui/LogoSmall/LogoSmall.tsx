import Style from "./LogoSmall.module.scss";

interface IlogoSmall {
    width?: string;
    height?: string;
}

const LogoSmall = ({width="auto", height="auto"}: IlogoSmall) => {
  return (
    <img 
    src="/image/logoSmall-01.png" 
    alt="logo-simple" 
    style={{width, height}}>
    </img>
  )
}

export default LogoSmall;