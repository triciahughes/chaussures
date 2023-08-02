"use client";
import styles from "../../styles/page.module.css";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface QtyBtnProps {
  increase: () => void;
  decrease: () => void;
  handleUpdateCart: () => void;
  setQuantity: (quantity: number) => void;
  quantity: number;
}

export default function QtyBtn({
  increase,
  decrease,
  handleUpdateCart,
  quantity,
  setQuantity,
}: QtyBtnProps) {
  const path = usePathname();
  const [updatedQty, setUpdatedQty] = useState(true);

  const handleQtyUpdateFn = () => {
    if (path === "/cart") {
      setUpdatedQty(true);
    } else if (path !== "/cart") {
      setUpdatedQty(false);
    }
  };

  const dynamicQtyBtn =
    path === "/cart" ? (
      <div className={styles.qty}>
        <div className={styles.qtySelector}>
          <button
            onClick={() =>
              updatedQty ? (decrease(), handleUpdateCart()) : decrease()
            }
          >
            -
          </button>
          <h3>{quantity}</h3>
          <button
            onClick={() =>
              updatedQty ? (increase(), handleUpdateCart()) : increase()
            }
          >
            +
          </button>
        </div>
      </div>
    ) : (
      <div className={styles.qty}>
        <h4>Quantity</h4>
        <div className={styles.qtySelector}>
          <button onClick={() => decrease()}>-</button>
          <h3>{quantity}</h3>
          <button onClick={() => increase()}>+</button>
        </div>
      </div>
    );

  return <>{dynamicQtyBtn}</>;
}
