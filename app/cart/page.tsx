"use client";
import QtyBtn from "../comps/btns/QtyBtn";
import CheckoutBtn from "../comps/btns/CheckoutBtn";
import { useEffect, useState } from "react";
import styles from "../styles/page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CartItem {
  thumbnail: string;
  brand: string;
  price: number;
  name: string;
  quantity: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cartData, setCartData] = useState([]);
  const shipping = 10;
  const [quantity, setQuantity] = useState(0);
  const subtotal = cartData.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const tax = (subtotal * 0.0725).toFixed(2);

  const discount = 6;

  const total = subtotal + shipping + parseFloat(tax) - discount;

  const handleRemoveClick = (id) => {
    console.log("Clicked", id);
    fetch(`http://localhost:3000/api/cart/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      fetchCartData();
    });
  };

  const increase = () => quantity < 99 && quantity + 1;
  const decrease = () => quantity > 1 && quantity - 1;

  console.log(quantity);

  const handleUpdateCart = (id) => {
    fetch(`http://localhost:3000/api/cart/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        quantity: quantity,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = () => {
    fetch("http://localhost:3000/api/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data: CartItem[]) => {
        setCartData(data);
        setQuantity(data.quantity);
      });
  };

  const cartDataMapped = cartData.map((item: any) => {
    return (
      <>
        <div id={item.id} className={styles.bagItem}>
          <Image
            src={`${item.thumbnail}`}
            alt="item thumbnail"
            width={165}
            height={166}
            onClick={() => router.push(`/item/${item.id}`)}
          />
          <div className={styles.cartDetailsContainer}>
            <div className={styles.itemDetails}>
              <div className={styles.itemPrice}>
                <h3>{item.brand}</h3>
                <p>${item.price}</p>
              </div>
              <p>{item.name}</p>
            </div>

            <div className={styles.editDetails}>
              <div className={styles.editQty}>
                <QtyBtn
                  quantity={item.quantity}
                  handleUpdateCart={handleUpdateCart}
                  increase={increase}
                  decrease={decrease}
                />
              </div>
              <p key={item.id} onClick={() => handleRemoveClick(item.id)}>
                Remove
              </p>
            </div>
          </div>
        </div>
        <hr className={styles.cartLineBreak}></hr>
      </>
    );
  });

  if (!cartData) {
    return <div>Loading...</div>; // render loading text while cartData is null
  }

  return (
    <div className={styles.cartView}>
      <div className={styles.cartContainer}>
        <div className={styles.bag}>
          <h2>Your Bag</h2>
          {cartDataMapped}
        </div>
        <div className={styles.cartSummaryContainer}>
          <h2>Summary</h2>
          <div className={styles.subtotal}>
            <h4>Subtotal</h4>
            <p>${subtotal}</p>
          </div>
          <div className={styles.shipping}>
            <h4>Shipping and delivery</h4>
            <p>${shipping}.00</p>
          </div>
          <div className={styles.tax}>
            <h4>Tax</h4>
            <p>${tax}</p>
          </div>
          <div className={styles.discount}>
            <h4>Discount</h4>
            <p>-${discount}.00</p>
          </div>
          <hr className={styles.cartSumLineBreak}></hr>
          <div className={styles.total}>
            <h2>Total</h2>
            <p>${total}</p>
          </div>
          <CheckoutBtn />
        </div>
      </div>
    </div>
  );
}
