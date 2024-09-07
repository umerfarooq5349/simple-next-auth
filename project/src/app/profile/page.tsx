"use client";
import React, { useEffect } from "react";
import styles from "@/utils/sass/profile.module.scss";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useFlashMessage } from "@/context/flashMessageContext";
import { useSession } from "next-auth/react";

const ProfilePage: React.FC = async () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const { setMessage } = useFlashMessage();

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setMessage(message);
    }
  }, []);
  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.heading}>Your Profile</h1>
      <div className={styles.profileDetails}>
        <p>
          <strong>Username:</strong> {session!.user.name}
          {/*  eslint-disable-next-line @next/next/no-img-element */}
          <img src={session!.user.photo} alt={session!.user.name} />
        </p>
        <p>
          <strong>Email:</strong> {session!.user.email}
        </p>
        <p>
          <strong>Role:</strong> {session!.user.role}
        </p>
        <p>
          <strong>Id:</strong> {session!.user.id}
        </p>
      </div>

      <button className={styles.editProfileButton}>
        <Link href={`profile/${session!.user?.id}`}>Edit Profile </Link>
      </button>
    </div>
  );
};

export default ProfilePage;
