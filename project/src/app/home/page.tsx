"use client";
import React, { useEffect } from "react";
import styles from "@/utils/sass/home.module.scss";
import FlashMessage from "@/components/flashMessages/flashMessage";
import { useFlashMessage } from "@/context/flashMessageContext";
import { useSearchParams } from "next/navigation";
const HomePage: React.FC = () => {
  const searchParams = useSearchParams();
  const { setMessage } = useFlashMessage();

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setMessage(message);
    }
  }, []);

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.heading}>Welcome Home</h1>
      <p className={styles.description}>
        <FlashMessage />
        This is the home page. Explore the features of the website!
      </p>
    </div>
  );
};

export default HomePage;
