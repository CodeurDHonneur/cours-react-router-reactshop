import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./PublicNotFound.module.css"


function PublicNotFound() {
  const navigate = useNavigate();

  return (
    <section className={styles.notFound}>
        <div className={styles.card}>
          <h1 className={styles.code}>
            404
          </h1>
          <h2 className={styles.title}>
            Page introuvable
          </h2>

          <p className={styles.text}>
            La page que vous recherchez n'existe pas ou a été déplacée
          </p>

          <div className={styles.actions}>
            <button 
            onClick={() => navigate(-1)}
            className={styles.primaryBtn}>
              Retour
            </button>

            <Link 
              to="/"
              className={styles.secondaryBtn}
              >
              Accueil
            </Link>
          </div>
        </div>
    </section>
  )
}

export default PublicNotFound