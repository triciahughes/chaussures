import styles from "../styles/page.module.css";
import Image from "next/image";
import ViewCartBtn from "./btns/ViewCartBtn";
import logo from "../assets/marketing/logo.svg";
export default function NavBar() {
  return (
    <div className={styles.header}>
      <a href="/" rel="noopener noreferrer">
        <div>
          <Image src={logo} alt="logo" width={24} height={23.29} />
          <span>SUN CO.</span>
        </div>
      </a>
      <a href="/cart" rel="noopener noreferrer">
        <ViewCartBtn />
      </a>
    </div>
  );
}
