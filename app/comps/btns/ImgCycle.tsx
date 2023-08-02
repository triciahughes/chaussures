import styles from "../../styles/page.module.css";
import Image from "next/image";
import right from "../../assets/ui/right.svg";
import left from "../../assets/ui/left.svg";

interface ImgCycleProps {
  plusDivs: (value: number) => void;
  currentDiv: (value: number) => void;
}

export default function ImgCycle({ plusDivs, currentDiv }: ImgCycleProps) {
  return (
    <div className={styles.imgCycle}>
      <div className={styles.imgCycleBtns}>
        <Image
          className={styles.left}
          onClick={() => plusDivs(-1)}
          src={left}
          alt="left arrow"
          width={24}
          height={24}
        />
      </div>
      <div className={styles.dots}>
        <span onClick={() => currentDiv(1)}></span>
        <span onClick={() => currentDiv(2)}></span>
        <span onClick={() => currentDiv(3)}></span>
      </div>
      <div className={styles.imgCycleBtns}>
        <Image
          className={styles.right}
          onClick={() => plusDivs(1)}
          src={right}
          alt="right arrow"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
}
