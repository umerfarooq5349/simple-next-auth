"use client";

import OneLink from "@/components/navbar/oneLink";
import styles from "@/utils/sass/navLinks.module.scss";
import { useEffect, useState } from "react";
import { CIcon } from "@coreui/icons-react";
import { cilClearAll, cilUserX, cilX } from "@coreui/icons";
import { getSession } from "next-auth/react"; // Make sure this is correctly imported for client-side use

const NavLinks = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [role, setRole] = useState("");
  useEffect(() => {
    async function fetchSession() {
      const session = await getSession(); // Using client-side API to get session
      if (session) {
        setIsLoggedIn(true);
        setIsAdmin(session.user.role === "admin" || false); // Adjust based on your session structure
        setRole(session.user.role);
        setUserName(session.user?.name || null); // Adjust based on your session structure
      } else {
        setIsLoggedIn(false);
      }
    }

    fetchSession();
  }, []);

  const pages = [
    { title: "Home", route: "/home" },
    { title: "Profile", route: "/profile" },
  ];

  return (
    <div className={styles.nav}>
      <div className={styles.navbarContainer}>
        {pages.map((link) => (
          <OneLink key={link.route} oneLink={link} />
        ))}

        {isLoggedIn ? (
          <>
            {console.log(`Role: ${role}`)}
            {isAdmin && (
              <OneLink
                key="dashboard"
                oneLink={{ title: "Dashbord", route: "/dashbord" }}
              />
            )}
            <OneLink
              key="profile"
              oneLink={{ title: userName || "Profile", route: "/profile" }}
            />
            <OneLink
              key="logout"
              oneLink={{ title: "Logout", route: "/logout" }}
            />
          </>
        ) : (
          <OneLink key="login" oneLink={{ title: "Login", route: "/signin" }} />
        )}
      </div>
      <button
        className={styles.menuButton}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? (
          <CIcon icon={cilX} size="xl" />
        ) : (
          <CIcon icon={cilClearAll} size="xl" />
        )}
      </button>
      {/* mobile navbar */}
      {open && (
        <div className={styles.smallScreen}>
          {pages.map((link) => (
            <OneLink key={link.route} oneLink={link} />
          ))}
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <OneLink
                  key="dashboard-mobile"
                  oneLink={{ title: "Dashboard", route: "/dashboard" }}
                />
              )}
              <OneLink
                key="profile-mobile"
                oneLink={{ title: userName || "Profile", route: "/profile" }}
              />
              <OneLink
                key="logout-mobile"
                oneLink={{ title: "Logout", route: "/logout" }}
              />
            </>
          ) : (
            <OneLink
              key="login-mobile"
              oneLink={{ title: "Login", route: "/signin" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default NavLinks;
