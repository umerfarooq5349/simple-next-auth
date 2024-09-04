import React, { useState } from "react";
import styles from "@/utils/sass/singup.module.scss";
import Link from "next/link";

const SignUpPage: React.FC = () => {
  //  const [formData, setformData] = useState({userName:'',name;"",password:''})
  return (
    <div className={styles.signUpContainer}>
      <h1 className={styles.heading}>Sign Up</h1>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          className={styles.inputField}
        />
        <input type="email" placeholder="Email" className={styles.inputField} />
        <input
          type="password"
          placeholder="Password"
          className={styles.inputField}
        />
        <div className={styles.text}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Already have an account?
          <Link href={"/signin"} className={styles.link}>
            Signin
          </Link>
        </div>
        <button type="submit" className={styles.buttonSecondary}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
