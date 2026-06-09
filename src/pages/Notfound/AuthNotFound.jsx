import { Link, useNavigate } from "react-router-dom";

import styles from "./AuthNotFound.module.css";

function AuthNotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>

        <h1 className={styles.code}>
          404
        </h1>

        <h2 className={styles.title}>
          Page introuvable
        </h2>

        <p className={styles.text}>
          Cette page d’authentification n’existe pas.
        </p>

        <div className={styles.actions}>

          <button
            onClick={() => navigate("/login")}
            className={styles.primaryBtn}
          >
            Retour connexion
          </button>

          <Link
            to="/"
            className={styles.secondaryBtn}
          >
            Accueil
          </Link>

        </div>

      </div>
    </div>
  );
}

export default AuthNotFound;