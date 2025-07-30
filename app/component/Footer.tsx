'use client';

import React, { CSSProperties } from 'react';

export default function Footer() {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.section}>
                    <h3 style={styles.heading}>About Us</h3>
                    <p style={styles.text}>
                        MyApp is your go-to platform for modern web solutions. We aim to deliver high-quality experiences for developers and users alike.
                    </p>
                </div>
                <div style={styles.section}>
                    <h3 style={styles.heading}>Quick Links</h3>
                    <ul style={styles.list}>
                        <li><a href="#" style={styles.link}>Home</a></li>
                        <li><a href="#" style={styles.link}>Features</a></li>
                        <li><a href="#" style={styles.link}>Pricing</a></li>
                        <li><a href="#" style={styles.link}>Contact</a></li>
                    </ul>
                </div>
                <div style={styles.section}>
                    <h3 style={styles.heading}>Contact</h3>
                    <p style={styles.text}>Email: support@myapp.com</p>
                    <p style={styles.text}>Phone: +91 98765 43210</p>
                </div>
            </div>
            <div style={styles.bottom}>
                <p style={styles.bottomText}>© 2025 MyApp. All rights reserved.</p>
            </div>
        </footer>
    );
}

const styles : Record<string, CSSProperties> = {
    footer: {
        backgroundColor: '#222',
        color: '#fff',
        padding: '40px 20px 20px',
        fontFamily: 'Arial, sans-serif',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    section: {
        flex: '1',
        minWidth: '250px',
        marginBottom: '20px',
    },
    heading: {
        fontSize: '1.2rem',
        marginBottom: '10px',
        borderBottom: '2px solid #555',
        paddingBottom: '5px',
    },
    text: {
        fontSize: '0.95rem',
        lineHeight: '1.5',
    },
    list: {
        listStyle: 'none',
        padding: 0,
    },
    link: {
        color: '#ccc',
        textDecoration: 'none',
        display: 'block',
        marginBottom: '8px',
    },
    bottom: {
        borderTop: '1px solid #444',
        marginTop: '20px',
        paddingTop: '10px',
        textAlign: 'center',
    },
    bottomText: {
        fontSize: '0.85rem',
        color: '#aaa',
    },
};
