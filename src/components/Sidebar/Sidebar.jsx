import React from 'react'
import styles from "./Sidebar.module.css"
import { NavLink } from 'react-router-dom'


function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>
        ReactShop
      </h2>

      <nav className={styles.nav}>
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive ? styles.active : ""
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/products"
          className={({ isActive }) =>
            isActive ? styles.active : ""
          }
        >
          Produits
        </NavLink>

        <NavLink
          to="/dashboard/orders"
          className={({ isActive }) =>
            isActive ? styles.active : ""
          }
        >
          Commandes
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive ? styles.active : ""
          }
        >
          Profil
        </NavLink>

        <NavLink
          to="/"
        >
          Retour Accueil
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar