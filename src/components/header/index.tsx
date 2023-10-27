import { Link } from "react-router-dom";
import logoimg from "../../assets/logo.svg";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.container}>
      <div>
        <Link to="/">
          <img src={logoimg} alt="Logo Cripto" />
        </Link>
      </div>
    </header>
  );
}
