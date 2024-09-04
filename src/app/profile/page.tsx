import React from "react";
import styles from "@/utils/sass/profile.module.scss";
import { auth } from "@/auth";
import Link from "next/link";
// import { useRouter } from "next/navigation";

const ProfilePage: React.FC = async () => {
  const session = await auth();
  // const router=useRouter()
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
          <strong>Email:</strong> {session!.user?.email}
        </p>
        <p>
          <strong>Role:</strong> {session!.user?.role}
        </p>
        <p>
          <strong>Id:</strong> {session!.user?.id}
        </p>
      </div>

      <button className={styles.editProfileButton}>
        <Link href={`profile/${session!.user?.id}`}>Edit Profile </Link>
      </button>
    </div>
  );
};

export default ProfilePage;
