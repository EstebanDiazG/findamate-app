import Styles from "./Images.module.css";

interface IImages {

    src?: string;
    alt?: string;
    width?: string;
    height?: string;

}

const Images = ({ src, alt, width="auto", height="auto"}: IImages) => {
    return (
        <img 
        src={src}
        alt={alt}
        style={{width, height}}>        
        </img>
        
      )
}

export default Images;