import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

function Login({auth}) {

  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const user = {
    email: "augustin@gmail.com",
    password: "azerty123"
  };

  function handleSubmit(e) {

    e.preventDefault();

    setMessage("");

    const email = emailRef.current.value
      .trim()
      .toLowerCase();

    const password = passwordRef.current.value
      .trim();

    // Validation des champs
    if (!email || !password) {
      setMessage("Email et mot de passe requis");
      return;
    }

    // Vérification utilisateur
    const isValidUser =
      email === user.email &&
      password === user.password;

    if (!isValidUser) {
      setMessage(
        "Email ou mot de passe incorrect"
      );
      return;
    }

    auth(true);
    // Connexion réussie
    navigate("/dashboard", {
      replace: true
    });
  }

  function togglePasswordVisibility() {
    setShowPassword(prev => !prev);
  }

  return (
    <div className={styles.loginPage}>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >

        <h1 className={styles.title}>
          Connexion
        </h1>

        {
          message && (
            <p className={styles.error}>
              {message}
            </p>
          )
        }

        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className={styles.input}
        />

        <div className={styles.passwordWrapper}>

          <input
            ref={passwordRef}
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Mot de passe"
            className={styles.passwordInput}
          />

          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={styles.toggleButton}
          >
            {
              showPassword
                ? "🙈"
                : "👁️"
            }
          </button>

        </div>

        <button className={styles.button}>
          Se connecter
        </button>

      </form>

    </div>
  );
}

export default Login;