import { useState } from "react";
import styles from "../styles/Filters.module.css";

const Filters = ({
  setFilter,
}: {
  setFilter: (column: string, value: string) => void;
}) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div className={styles.filters}>
      <div className={styles.search}>
        <input
          placeholder="Search by name"
          onChange={(e) => setFilter("name", e.target.value)}
        />
      </div>
      <div className={styles.toggle}>
        <div className={styles.action}>
          <input
            type="checkbox"
            checked={toggle}
            data-testid="filter"
            onChange={() => {
              setToggle(!toggle);
              setFilter("is_featured", !toggle ? "1" : "0");
            }}
            name="toggle"
            id="toggle"
          />
          <label htmlFor="toggle"></label>
        </div>
        <span>{toggle ? "Featured products" : "Unfeatured products"}</span>
      </div>
    </div>
  );
};

export default Filters;
