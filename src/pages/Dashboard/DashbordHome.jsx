import React from 'react'
import styles from "./DashbordHome.module.css"


function DashbordHome() {
  return (
    <section className={`container ${styles.dashboard}`}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <p>
          Bienvenue sur votre espace administrateur.
        </p>
      </div>
      <div className={styles.cards}>
        <article className={styles.card}>
          <h2>Produits</h2>
          <span>24</span>
        </article>
        <article className={styles.card}>
          <h2>Commandes</h2>
          <span>156</span>
        </article>
        <article className={styles.card}>
          <h2>Utilisateurs</h2>
          <span>89</span>
        </article>
        <article className={styles.card}>
          <h2>Revenus </h2>
          <span>12 450 €</span>
        </article>
      </div>

      <div className={styles.tableSection}>
        <h2>Dernières commandes</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Client </th>
              <th>Produit </th>
              <th>Montant </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>John Doe </td>
              <td>MacBook Pro </td>
              <td>2500 €</td>
            </tr>

            <tr>
              <td>Sarah Smith </td>
              <td>iPhone 15</td>
              <td>1400 €</td>
            </tr>
            <tr>
              <td>Michael Lee </td>
              <td>Casque Sony </td>
              <td>300 €</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default DashbordHome