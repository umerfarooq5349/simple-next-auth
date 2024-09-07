"use client";
import React, { useEffect, useState } from "react";
import styles from "@/utils/sass/signin.module.scss";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import CIcon from "@coreui/icons-react";
import { cibFacebook, cibGoogle } from "@coreui/icons";
import Circularloader from "@/components/bikeAnimiation/circularloader";
import { useFlashMessage } from "@/context/flashMessageContext";
import FlashMessage from "@/components/flashMessages/flashMessage";

const SignInPage: React.FC = () => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();
  const { setMessage } = useFlashMessage(); // Access flash message setter
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setMessage(message);
    }
  }, []);

  // Form validation
  const isFormComplete = formData.email && formData.password;

  // Handle change in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Sign in with credentials
  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
        setMessage("Invalid email or password.");
      } else {
        setMessage("Successfully signed in!");
        router.push("/");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setMessage("An unexpected error occurred.");
    } finally {
      setIsFormLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setIsGoogleLoading(true);
    setError(null);

    try {
      const result = await signIn("google", { redirect: false });

      if (result?.error) {
        setError("Google Sign-in failed. Please try again.");
        setMessage("Google Sign-in failed.");
      } else {
        setMessage("Signed in with Google successfully!");
        router.push("/");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setMessage("An unexpected error occurred.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Sign in with Facebook
  const signInWithFacebook = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setIsFacebookLoading(true);
    setError(null);

    try {
      const result = await signIn("facebook", { redirect: false });

      if (result?.error) {
        setError("Facebook Sign-in failed. Please try again.");
        setMessage("Facebook Sign-in failed.");
      } else {
        setMessage("Signed in with Facebook successfully!");
        router.push("/");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setMessage("An unexpected error occurred.");
    } finally {
      setIsFacebookLoading(false);
    }
  };

  return (
    <div className={styles.signInContainer}>
      <h1 className={styles.heading}>Sign In</h1>
      <form className={styles.form} onSubmit={handleSignIn}>
        <FlashMessage />
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
          Don't have an account?
          <Link href={"/signup"} className={styles.link}>
            Signup
          </Link>
        </div>
        <button
          type="submit"
          className={styles.buttonPrimary}
          disabled={!isFormComplete || isFormLoading}
        >
          {isFormLoading ? <Circularloader /> : <div>Sign In</div>}
        </button>
        <div className={styles.providerBtn}>
          <button
            type="button"
            className={styles.buttonPrimary}
            onClick={signInWithGoogle}
            disabled={isGoogleLoading}
            aria-label="Sign in with Google"
          >
            {isGoogleLoading ? (
              <Circularloader />
            ) : (
              <div>
                <CIcon icon={cibGoogle} size="lg" className={styles.icon} />
                Sign In with Google
              </div>
            )}
          </button>

          <button
            type="button"
            className={styles.buttonPrimary}
            onClick={signInWithFacebook}
            disabled={isFacebookLoading}
            aria-label="Sign in with Facebook"
          >
            {isFacebookLoading ? (
              <Circularloader />
            ) : (
              <div>
                <CIcon icon={cibFacebook} size="lg" className={styles.icon} />
                Sign In with Facebook
              </div>
            )}
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default SignInPage;
