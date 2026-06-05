import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // simulation login
    console.log("Login OK");

    navigate("/dashboard");
  }

  return (
    <div className={styles.loginPage}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Connexion</h1>

        <input
          className={styles.input}
          type="email"
          placeholder="Email"
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Mot de passe"
        />

        <button className={styles.button}>
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;