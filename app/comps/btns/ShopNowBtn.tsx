"use client";
import styles from "../../styles/page.module.css";
import { useRouter } from "next/navigation";

export default function ShopNowBtn() {
  const router = useRouter();
  return (
    <div className={styles.shop}>
      <span onClick={() => router.push("/item/1")}>
        Shop Now <p>-&gt;</p>
      </span>
    </div>
  );
}
