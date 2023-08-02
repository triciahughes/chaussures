"use client";
import styles from "../../styles/page.module.css";

interface HandleCartProps {
  handleAddToCart: () => void;
  handleCartTxt: () => void;
  handleUpdateCart: () => void;
  btnTxtState: boolean;
}

export default function AddCartBtn({
  handleAddToCart,
  handleCartTxt,
  handleUpdateCart,
  btnTxtState,
}: HandleCartProps) {
  console.log(btnTxtState);

  // btnTxtState ? "Update Cart" : "Add to Cart";
  const handleCartStateFn = () => {
    btnTxtState ? handleUpdateCart() : handleAddToCart();
  };
  return (
    <button className={styles.addCart} onClick={handleCartStateFn}>
      {btnTxtState ? "Update Cart" : "Add to Cart"}
    </button>
  );
}
