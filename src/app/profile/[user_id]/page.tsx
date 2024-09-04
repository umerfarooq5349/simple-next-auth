"use client";
import { auth } from "@/auth";
import styles from "@/utils/sass/profile.module.scss";
// import UpdateProductForm from "@/components/updateProductForm/updateProductForm";
const EditProfile = ({ params }: { params: { user_id: number } }) => {
  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.heading}>Your Profile</h1>
      <div className={styles.profileDetails}>
        {/* <p>
        <strong>Username:</strong> {session!.user.name}
      
        <img src={session!.user.photo} alt={session!.user.name} />
      </p>
      <p>
        <strong>Email:</strong> {session!.user?.email}
      </p>
      <p>
        <strong>Role:</strong> {session!.user?.role}
      </p> */}
        <p>
          <strong>Id:</strong> {params.user_id}
        </p>
      </div>

      <button className={styles.editProfileButton}>Edit Profile</button>
    </div>
  );
};

export default EditProfile;
