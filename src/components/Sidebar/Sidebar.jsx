import React from 'react'
import styles from "./Sidebar.module.css"
import { NavLink } from 'react-router-dom'


function Sidebar() {
  return (
    <aside className={styles.sidebar}>
        <h2 className={styles.logo}>
            Admin Panel
        </h2>

        <nav className={styles.nav}>
            <NavLink
            to="/dashboard"
            className={({isActive}) => isActive ? styles.active : ""}
            >Dashboard</NavLink>
            <NavLink
            to="/products"
            className={({isActive}) => isActive ? styles.active : ""}
            >Produits</NavLink>
            <NavLink
            to="/"
            className={({isActive}) => isActive ? styles.active : ""}
            >Retour au site</NavLink>
        </nav>
    </aside>
  )
}

export default Sidebar