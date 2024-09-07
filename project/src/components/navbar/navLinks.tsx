"use client";

import OneLink from "./oneLink";
import styles from "@/utils/sass/navLinks.module.scss";
import { useEffect, useState } from "react";
import { CIcon } from "@coreui/icons-react";
import { cilClearAll, cilX } from "@coreui/icons";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const NavLinks = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [role, setRole] = useState("");
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session) {
      setIsLoggedIn(true);
      const userRole = session.user?.role || "";
      setIsAdmin(userRole === "admin");
      setRole(userRole);
      setUserName(session.user?.name || null);
    } else {
      setIsLoggedIn(false);
    }
  }, [session, status]);

  const handleLogout = async () => {
    await signOut();
    router.replace("/signin");
  };

  const pages = [{ title: "Home", route: "/home" }];

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
                oneLink={{ title: "Dashboard", route: "/dashboard" }}
              />
            )}
            <OneLink
              key="profile"
              oneLink={{ title: userName || "Profile", route: "/profile" }}
            />
            <div onClick={handleLogout} role="button" tabIndex={0}>
              <OneLink key="logout" oneLink={{ title: "Logout", route: "" }} />
            </div>
          </>
        ) : (
          <OneLink key="login" oneLink={{ title: "Login", route: "/signin" }} />
        )}
      </div>

      {/* Toggle button for small screens */}
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

      {/* Mobile navbar */}
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
              <div onClick={handleLogout}>
                <span>Logout</span>
              </div>
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
