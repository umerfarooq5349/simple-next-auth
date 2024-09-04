import React from "react";
import styles from "@/utils/sass/dashbord.module.scss";

const DashboardPage: React.FC = () => {
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
