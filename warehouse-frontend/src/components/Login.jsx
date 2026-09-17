import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import api from "../services/config";
import { useAuth } from "../contexts/AuthContext";

import styles from "./Login.module.css";
import logo from "../assets/Union.png";

function Login() {
  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginInput((input) => ({ ...input, [name]: value }));

    setError("");
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!loginInput.username || !loginInput.password) {
      setError("لطفا مشخصات فرم را کامل نمایید.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const res = await api.post("/auth/login", loginInput);

      login(res.data.token);

      navigate("/admin-panel");
    } catch (error) {
      if (error.response?.status === 400) {
        setError("نام کاربری یا رمز عبور اشتباه است.");
      } else if (!error.response) {
        setError("ارتباط با سرور برقرار نشد.");
      } else {
        setError("خطایی رخ داده است. دوباره تلاش کنید.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>بوت کمپ بوتواستارت</h1>

      <form className={styles.form} onSubmit={loginHandler}>
        <div className={styles.logo}>
          <img src={logo} alt="بوتواستارت" />
          <p>فرم ورود</p>
        </div>

        <input
          type="text"
          name="username"
          value={loginInput.username}
          onChange={changeHandler}
          placeholder="نام کاربری"
        />

        <input
          type="password"
          name="password"
          value={loginInput.password}
          onChange={changeHandler}
          placeholder="رمز عبور"
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "در حال ورود..." : "ورود"}
        </button>
        <div className={styles.create}>
          <Link to={"/signup"}>ایجاد حساب کاربری</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
