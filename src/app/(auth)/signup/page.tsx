"use client";
import React, { useState } from "react";
import styles from "@/utils/sass/singup.module.scss";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Circularloader from "@/components/bikeAnimiation/circularloader";
import { signIn } from "next-auth/react";

const SignUpPage: React.FC = () => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    passwordConfirm: "",
  });
  const router = useRouter();

  const isFormComplete =
    formData.email &&
    formData.password &&
    formData.name &&
    formData.passwordConfirm;

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormLoading(true);
    setError(null);

    console.log("Sign-up initiated...");
    console.log("Form data being sent:", formData);
    console.log(`Server: ${process.env.NEXT_PUBLIC_SERVER}/signup`);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/signup`,
        {
          email: formData.email,
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
          name: formData.name,
        }
      );

      console.log("Response from server:", response);

      // If response is successful, redirect to sign-in page
      router.push("/signin");
      console.log("Redirecting to /signin...");
    } catch (err) {
      console.error("Error occurred during sign-up:", err);

      setError(
        "An unexpected error occurred from credentials. Please try again."
      );
    } finally {
      setIsFormLoading(false);
      console.log("Sign-up process completed.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUpWithGoogle = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setIsGoogleLoading(true);
    setError(null);

    try {
      await signIn("google");
    } catch (err) {
      console.error("Error occurred during Google sign-in:", err);
      setError(
        "An unexpected error occurred with Google sign-in. Please try again."
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSignUpWithFacebook = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setIsFacebookLoading(true);
    setError(null);

    try {
      await signIn("facebook");
    } catch (err) {
      console.error("Error occurred during Facebook sign-in:", err);
      setError(
        "An unexpected error occurred with Facebook sign-in. Please try again."
      );
    } finally {
      setIsFacebookLoading(false);
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <h1 className={styles.heading}>Sign Up</h1>
      <form className={styles.form} onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          className={styles.inputField}
          onChange={handleChange}
          name="name"
          required
          value={formData.name}
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.inputField}
          onChange={handleChange}
          name="email"
          required
          value={formData.email}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          required
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="passwordConfirm"
          onChange={handleChange}
          value={formData.passwordConfirm}
          required
          className={styles.inputField}
        />
        <div className={styles.text}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Already have an account?
          <Link href={"/signin"} className={styles.link}>
            Sign in
          </Link>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button
          type="submit"
          className={styles.buttonSecondary}
          disabled={!isFormComplete || isFormLoading}
        >
          {isFormLoading ? <Circularloader /> : <div>Sign Up</div>}
        </button>

        <button
          type="button"
          className={styles.buttonSecondary}
          onClick={handleSignUpWithGoogle}
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Circularloader />
          ) : (
            <div>Sign up with Google</div>
          )}
        </button>

        <button
          type="button"
          className={styles.buttonSecondary}
          onClick={handleSignUpWithFacebook}
          disabled={isFacebookLoading}
        >
          {isFacebookLoading ? (
            <Circularloader />
          ) : (
            <div>Sign up with Facebook</div>
          )}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
