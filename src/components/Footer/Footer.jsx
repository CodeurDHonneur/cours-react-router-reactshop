import React from 'react'
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
        <div className={`container ${styles.content}`}>
            <p>
                © 2026 ReactShop - Tous droits réservés.
            </p>

            <span>
                Développé avec React.js
            </span>
        </div>
    </footer>
  )
}

export default Footer