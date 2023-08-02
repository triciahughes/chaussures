import styles from "../styles/page.module.css";
import Image from "next/image";
import logo from "../assets/marketing/logo.svg";
import insta from "../assets/socials/instagram.svg";
import twitter from "../assets/socials/twitter.svg";
import youtube from "../assets/socials/youtube.svg";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <a href="/" rel="noopener noreferrer">
        <div>
          <Image src={logo} alt="logo" width={24} height={23.29} />
          <span>SUN CO.</span>
        </div>
      </a>

      <a>© 2023 dot.cards text task. All rights reserved.</a>

      <div className={styles.socials}>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={insta} alt="instagram icon" width={24} height={24} />
        </a>
        <a
          href="https://www.twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={twitter} alt="twitter icon" width={24} height={24} />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={youtube} alt="youtube icon" width={24} height={24} />
        </a>
      </div>
    </div>
  );
}
