import styles from './SearchBar.module.scss';

const SearchBar = ({ ...delegated }) => {
    return (
        <input
          type="search"
          className={styles.search}
          {...delegated}
        ></input>
    );
}

export default SearchBar;