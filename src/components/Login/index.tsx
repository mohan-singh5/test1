"use client";

import React, { useState } from "react";
import styles from "./login.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "../InputField";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/navigation";
import Link from "next/link";

type loginCredentialT = {
  email: string;
  password: string;
};

const LoginComp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<loginCredentialT>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const userLogin: SubmitHandler<loginCredentialT> = async (loginData) => {
    const url = `https://trustvisory.fastzone.ca/api/auth/login`;
    try {
      setLoading(true);
      const res = await axios.post(url, loginData);
      // console.log("Login successful:", res.data);
      setLoading(false);
      if (res.data.status) {
        router.push("/");
      } else {
        const errors = res.data.errors;
        Object.keys(errors).forEach((field) => {
          setError(field as keyof loginCredentialT, {
            type: "server",
            message: errors[field],
          });
        });
      }
    } catch (err) {
      console.error("error:", err);
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2 className="text-3xl font-semibold text-center">Welcome Back</h2>
        <p className="text-lg text-center mt-1">
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleSubmit(userLogin)} className={styles.formWrapper}>
          <InputField
            label="Email Address"
            type="email"
            placeholder="Enter your Email Address"
            register={register("email", {
              required: "Email is required",
            })}
            error={errors.email?.message}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter password"
            register={register("password", {
              required: "Password is required",
            })}
            error={errors.password?.message}
          />
          <div className={styles.loginOptions}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className="mr-2" /> Remember Me
            </label>
            <span className="text-primary">Forgot Password?</span>
          </div>

          <button
            type="submit"
            className={`${styles.loginButton} ${
              loading ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            {loading ? (
              <ImSpinner2 className="animate-spin text-2xl" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p>
          Not registered yet?{" "}
          <Link href="/signup" className="text-primary">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginComp;
