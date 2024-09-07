"use client";
import React, { useEffect } from "react";
import styles from "@/utils/sass/dashbord.module.scss";
import { useSearchParams } from "next/navigation";
import { useFlashMessage } from "@/context/flashMessageContext";

const DashboardPage: React.FC = () => {
  const searchParams = useSearchParams();
  const { setMessage } = useFlashMessage();

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setMessage(message);
    }
  }, []);
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.heading}>Dashboard</h1>
      <div className={styles.cardGrid}>
        <div className={styles.card}>Card 1</div>
        <div className={styles.card}>Card 2</div>
        <div className={styles.card}>Card 3</div>
      </div>
    </div>
  );
};

export default DashboardPage;
