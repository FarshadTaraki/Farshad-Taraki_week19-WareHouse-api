import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "../services/config";

import { registerSchema } from "../schemas/authSchema";

import styles from "./Login.module.css";
import logo from "../assets/Union.png";

function SignUp() {
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signUpHandler = async (data) => {
    try {
      isLoading(true);
      setServerError("");

      const { username, password } = data;

      await api.post("/auth/register", {
        username,
        password,
      });

      navigate("/");
    } catch (error) {
      if (error.response?.status === 400) {
        setServerError(
          error.response.data?.message || "این نام کاربری قبلاً ثبت شده است.",
        );
      } else if (!error.response) {
        setServerError("ارتباط با سرور برقرار نشد.");
      } else {
        setServerError("خطایی رخ داده است. دوباره تلاش کنید.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>بوت کمپ بوتواستارت</h1>

      <form className={styles.form} onSubmit={handleSubmit(signUpHandler)}>
        <div className={styles.logo}>
          <img src={logo} alt="بوتواستارت" />
          <p>فرم ثبت نام</p>
        </div>

        <input type="text" placeholder="نام کاربری" {...register("username")} />
        {errors.username && (
          <p className={styles.error}>{errors.username.message}</p>
        )}

        <input
          type="password"
          placeholder="رمز عبور"
          {...register("password")}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}

        <input
          type="password"
          placeholder="تکرار رمز عبور"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword.message}</p>
        )}

        {serverError && <p className={styles.error}>{serverError}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "در حال ثبت نام..." : "ثبت نام"}
        </button>

        <div className={styles.create}>
          <Link to="/">حساب کاربری دارید؟</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
