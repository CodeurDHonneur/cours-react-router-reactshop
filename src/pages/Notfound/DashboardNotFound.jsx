import { Link, useNavigate } from "react-router-dom";

import styles from "./DashboardNotFound.module.css";

function DashboardNotFound() {

  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <span className={styles.emoji}>
          😵
        </span>

        <h1 className={styles.code}>
          404
        </h1>

        <h2 className={styles.title}>
          Page introuvable
        </h2>

        <p className={styles.description}>
          La ressource demandée semble inexistante
          ou inaccessible.
        </p>

        <div className={styles.actions}>
          <button
            onClick={() => navigate(-1)}
            className={styles.primaryBtn}
          >
            Retour
          </button>

          <Link
            to="/dashboard/products"
            className={styles.secondaryBtn}
          >
            Voir les produits
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardNotFound;