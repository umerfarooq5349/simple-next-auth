"use client";
import React, { useState } from "react";
import styles from "@/utils/sass/signin.module.scss";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signIn("credentials", formData).then(() => {
        router.push("/");
      });
    } catch (err) {
      setError(
        "An unexpected error occurredfrom credentials. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signIn("google");

      // if (result?.error) {
      //   setError("Google Sign in failed. Please try again.");
      // } else {
      //   router.push("/");
      // }
    } catch (err) {
      console.log(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const signInWithFacebook = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signIn("facebook");

      // if (result?.error) {
      //   setError("Google Sign in failed. Please try again.");
      // } else {
      //   router.push("/");
      // }
    } catch (err) {
      console.log(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.signInContainer}>
      <h1 className={styles.heading}>Sign In</h1>
      <form className={styles.form} onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          className={styles.inputField}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className={styles.inputField}
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div className={styles.text}>
          Dont have an account?
          <Link href={"/signup"} className={styles.link}>
            Signup
          </Link>
        </div>

        <button
          type="submit"
          className={styles.buttonPrimary}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
        <button
          type="button"
          className={styles.buttonPrimary}
          onClick={signInWithGoogle}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </button>
        <button
          type="button"
          className={styles.buttonPrimary}
          onClick={signInWithFacebook}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in with Facebook"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default SignInPage;
