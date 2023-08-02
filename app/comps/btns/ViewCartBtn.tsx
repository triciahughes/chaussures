"use client";
import styles from "../../../styles/page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import cart from "../../assets/ui/cart.svg";
import { useState, useEffect } from "react";

export default function ViewCartBtn() {
  // const [cartData, setCartData] = useState([]);

  // useEffect(() => {
  //   const fetchData = () => {
  //     fetch("http://localhost:3000/api/cart", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data: any) => {
  //         // Ensure data is an array before setting it to the state
  //         if (Array.isArray()) {
  //           setCartData(data);
  //         } else {
  //           // Handle the case when the data is not an array (e.g., set it to an empty array)
  //           setCartData([]);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching cart data:", error);
  //         // Handle any error that occurs during the fetch, and set cartData to an empty array
  //         setCartData([]);
  //       });
  //   };

  //   fetchData(); // Fetch data when the component mounts or remounts
  // }, []);

  // const router = useRouter();
  // console.log(cartData);

  // // Assuming cartData is an array of objects, and each object has a quantity property
  // const totalQuantity = cartData.reduce(
  //   (total, item) => total + item.quantity,
  //   0
  // );
  // console.log(totalQuantity);

  return (
    <button onClick={() => router.push("/cart")}>
      <Image src={cart} alt="cart icon" width={16} height={24} />
      <span>View Cart</span>
    </button>
  );
}
