
import styles from "./SearchBox.module.scss";

interface ISearchBox {
  
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  width?: string;
  height?: string;
}

const SearchBox: React.FC<ISearchBox> = ({
  value,
  onChange,
  placeholder = "Buscar...",
  width = "auto",
  height = "auto", 

}) => {
  return (
    <div className={styles.searchBox} style={{ width }}>
      <input style={{height}}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBox;
