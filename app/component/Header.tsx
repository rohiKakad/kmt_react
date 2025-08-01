"use client";

import { useRouter } from "next/navigation";
import React from "react";

function Navigation() {
 const router = useRouter()
  return (
    <>
      <nav style={styles.nav}>
        <a href="#" style={styles.navItem}>
          Home
        </a>
        <a href="#" style={styles.navItem}>
          About
        </a>
        <a href="#" style={styles.navItem}>
          Contact
        </a>
      </nav>
      <ul>
        <button type="button" style={styles.button} onClick={() => router.push('/')}>Logout</button>
      </ul>
    </>
  );
}

export default function Header() {
  return (
    <header style={styles.header}>
      <Navigation />
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#4A90E2",
    // padding: '20px 40px',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    borderBottom: "4px solid #357ABD",
  },
  logo: {
    fontSize: "1.8rem",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    gap: "30px",
    padding: "10px 0",
  },
  navItem: {
    color: "white",
    textDecoration: "none",
    fontSize: "1.1rem",
    padding: "8px 12px",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
  },
   button: {
    backgroundColor: "#ccff007d",  // classic blue
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3", 
  }
};
