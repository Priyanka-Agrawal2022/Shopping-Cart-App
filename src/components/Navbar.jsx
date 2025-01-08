import { useItemContext } from "../itemContext";
import styles from "../styles/Navbar.module.css";

function Navbar() {
  const { item, total, reset, toggle } = useItemContext();

  return (
    <div className={styles.container}>
      <h1>Total : &#x20B9; {total}</h1>
      <h1>Items: {item}</h1>
      <div className={styles.buttonsWrapper}>
        <button className={styles.button} onClick={toggle}>Cart</button>
        <button className={styles.button} onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default Navbar;
