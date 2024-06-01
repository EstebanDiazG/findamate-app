
import styles from "./SearchBox.module.scss";

interface ISearchBox {
  
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  width?: string;
}

const SearchBox: React.FC<ISearchBox> = ({
  value,
  onChange,
  placeholder = "Buscar...",
  width = "200px",
}) => {
  return (
    <div className={styles.searchBox} style={{ width }}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBox;
