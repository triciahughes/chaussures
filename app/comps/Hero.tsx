import styles from "../styles/page.module.css";
import Image from "next/image";
import ShopNowBtn from "./btns/ShopNowBtn";
import shoe from "../assets/marketing/shoe.svg";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.herocontent}>
        <span>25% OFF</span>
        <div>
          <h1>Summer Sale</h1>
          <p>Discover our summer styles with discount</p>
          <ShopNowBtn />
        </div>
      </div>
      <div className={styles.imagecontainer}>
        <Image src={shoe} alt="shoe image" width={490} height={321} />
      </div>
    </div>
  );
}
