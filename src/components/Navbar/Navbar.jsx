import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from "./Navbar.module.css"


function Navbar() {
  return (
    <nav className={styles.navbar}>
        <h2 className={styles.logo}>ReactShop</h2>

        <div className={styles.links}>
            <NavLink 
            to="/"
            className={({ isActive}) => isActive ? styles.active : ""}
            >
                Accueil
            </NavLink>
            <NavLink 
            to="/products"
            className={({ isActive}) => isActive ? styles.active : ""}
            >
                Produits
            </NavLink>
            <NavLink 
            to="/about"
            className={({ isActive}) => isActive ? styles.active : ""}>
                A propos
            </NavLink>
            <NavLink 
            to="/contact"
            className={({ isActive}) => isActive ? styles.active : ""}>
                Contact
            </NavLink>
            <NavLink 
            to="/login"
            className={({ isActive}) => isActive ? styles.active : ""}>
                Login
            </NavLink>
        </div>
    </nav>
  )
}

export default Navbar