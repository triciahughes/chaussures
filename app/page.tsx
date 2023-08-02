import Image from "next/image";
import styles from "./styles/page.module.css";
import Hero from "./comps/Hero";

export default function Home() {
  const products = fetch("http://localhost:3000/api", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) =>
      data.map((item: any) => {
        return (
          <a
            href={`/item/${item.id}`}
            className={styles.card}
            rel="noopener noreferrer"
            key={item.id}
          >
            <Image src={item.thumbnail} alt="item" width={261} height={284} />
            <h2>{item.brand}</h2>
            <p>{item.name}</p>
            <div className={styles.price}>${item.price}</div>
          </a>
        );
      })
    );

  return (
    <>
      <Hero />
      <h2 className={styles.category}>Explore our latest drops</h2>
      <div className={styles.grid}>{products}</div>
    </>
  );
}
