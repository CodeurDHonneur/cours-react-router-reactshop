import { Link } from "react-router-dom";

import products from "../data/products";

import styles from "./Products.module.css";

function Products() {
  return (
    <section className="container">
      <h1>Nos Produits</h1>

      <div className={styles.productsGrid}>
        {products.map((product) => (
          <article
            key={product.id}
            className={styles.card}
          >
            <h2>{product.name}</h2>

            <p>{product.price} €</p>

            <Link
              className={styles.link}
              to={`/products/${product.id}`}
            >
              Voir le produit
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Products;