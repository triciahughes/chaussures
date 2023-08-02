"use client";
import styles from "../../styles/page.module.css";
import { useRouter } from "next/navigation";

export default function CheckoutBtn() {
  const router = useRouter();
  return (
    <div className={styles.checkout}>
      <span onClick={() => router.push("/")}>
        Checkout <p>-&gt;</p>
      </span>
    </div>
  );
}
