import styles from "./AdminPanel.module.css";

function Search({ searched, setSearched }) {
  return (
    <div className={styles.search}>
      <input
        type="text"
        value={searched}
        onChange={(e) => setSearched(e.target.value)}
        placeholder="جستجو کالا"
      />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle
          cx="11"
          cy="11"
          r="7.5"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M16.5 16.5L21 21"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default Search;
