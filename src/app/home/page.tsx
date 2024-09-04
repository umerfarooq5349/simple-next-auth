import React from "react";
import styles from "@/utils/sass/home.module.scss";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.heading}>Welcome Home</h1>
      <p className={styles.description}>
        This is the home page. Explore the features of the website!
      </p>
    </div>
  );
};

export default HomePage;
