"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/page.module.css";
import ImgCycle from "../../comps/btns/ImgCycle";
import QtyBtn from "../../comps/btns/QtyBtn";
import AddCartBtn from "../../comps/btns/AddCartBtn";
import image1 from "../../assets/images/image1.svg";

export default function Item() {
  const shoe = usePathname();
  const [slideIndex, setSlideIndex] = useState(0);
  const [shoeData, setShoeData] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartQty, setCartQty] = useState(0);
  const [btnTxtState, setBtnTxtState] = useState(true);

  const decrease = () => quantity > 1 && setQuantity(quantity - 1);

  const increase = () => quantity < 99 && setQuantity(quantity + 1);

  const handleCartTxt = () => {
    if (cartQty >= 1) {
      return setBtnTxtState(true);
    } else if (cartQty === 0 || cartQty === null || cartQty === undefined) {
      return setBtnTxtState(false);
    }
  };

  useEffect(() => {
    fetchShoeData();
    handleCartTxt();
    fetchCartData();
    handleUpdateCart();
  }, [cartQty]);

  const fetchShoeData = () => {
    fetch(`http://localhost:3000/api/${shoe}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.img = data.img.split(","); // splitting string into array of image paths
        setShoeData(data);
      });
  };

  const handleAddToCart = () => {
    fetch(`http://localhost:3000/api/cart`, {
      method: "POST",
      body: JSON.stringify({
        name: shoeData.name,
        brand: shoeData.brand,
        price: shoeData.price,
        thumbnail: shoeData.thumbnail,
        quantity: quantity,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => console.error("Error:", error));
  };

  const handleUpdateCart = () => {
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

  const id = shoe.split("/").pop();
  console.log(quantity);

  const fetchCartData = () => {
    fetch(`http://localhost:3000/api/cart/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCartQty(data.quantity);
      });
  };

  const plusDivs = (n: number) => {
    let newIndex = slideIndex + n;
    if (newIndex < 0) {
      newIndex = shoeData.img.length - 1;
    } else if (newIndex >= shoeData.img.length) {
      newIndex = 0;
    }
    setSlideIndex(newIndex);
  };

  const currentDiv = (n: number) => {
    setSlideIndex(n - 1);
  };

  if (!shoeData) {
    return <div>Loading...</div>; // render loading text while shoeData is null
  }

  return (
    <>
      <div className={styles.itemView}>
        <div className={styles.imageSlideshow}>
          <Image
            src={shoeData.img[slideIndex]}
            alt="item image"
            width={546}
            height={375}
          />
          <ImgCycle plusDivs={plusDivs} currentDiv={currentDiv} />
        </div>
        <div className={styles.addCartContainer}>
          <div className={styles.shoeDetails}>
            <h2>{shoeData.brand}</h2>
            <p>{shoeData.name}</p>
            {cartQty >= 1 ? (
              <p>{cartQty} currently in cart.</p>
            ) : (
              <p>0 currently in cart.</p>
            )}
            <div className={styles.price}>{`$` + `${shoeData.price}`}</div>
          </div>
          <hr className={styles.lineBreak}></hr>
          <QtyBtn
            increase={increase}
            decrease={decrease}
            handleUpdateCart={handleUpdateCart}
            quantity={quantity}
            setQuantity={setQuantity}
          />
          <AddCartBtn
            handleAddToCart={handleAddToCart}
            handleCartTxt={handleCartTxt}
            handleUpdateCart={handleUpdateCart}
            btnTxtState={btnTxtState}
          />
        </div>
      </div>

      <div className={styles.descriptionView}>
        <div className={styles.description}>
          <h3>Description</h3>
          <hr className={styles.lineBreak}></hr>

          <p>
            Energize your look with a fresh take on heritage adidas style. The
            adidas Daily 3.0 Shoes cut a classic profile with a modern suede
            upper. Your walk across campus or commute across town has never
            looked or felt this good.
          </p>

          <ul>
            <li>Regular fit</li>
            <li>Lace closure</li>
            <li>Rubber outsole with vulcanized look</li>
            <li>Imported</li>
          </ul>
        </div>
        <div>
          <Image src={image1} alt="shoe" width={528} height={373} />
        </div>
      </div>
    </>
  );
}
