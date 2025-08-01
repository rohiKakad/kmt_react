'use client';

import React, { CSSProperties } from 'react';

export default function Sidebar() {


    return (
        <aside style={styles.sidebar}>
            <h2 style={styles.title}>Dashboard Menu</h2>
            <nav>
                <ul style={styles.navList}>
                    <li><a href="/forms" style={styles.navItem}>Forms</a></li>
                    <li><a href="/calculator" style={styles.navItem}>Calculators</a></li>
                    <li><a href="/rates" style={styles.navItem}>Rates</a></li>
                    <li><a href="/tables" style={styles.navItem}>tables</a></li>
                    <li><a href="/create-form" style={styles.navItem}>Create form</a></li>
                </ul>
            </nav>
        </aside>
    );
}

const styles: Record<string, CSSProperties> = {
    sidebar: {
        width: '250px',
        height: '100vh',
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        padding: '20px',
        boxSizing: 'border-box',
        fontFamily: 'Segoe UI, sans-serif',
    },
    title: {
        fontSize: '1.5rem',
        marginBottom: '20px',
        borderBottom: '2px solid #34495e',
        paddingBottom: '10px',
    },
    navList: {
        listStyle: 'none',
        padding: 0,
    },
    navItem: {
        display: 'block',
        color: '#ecf0f1',
        textDecoration: 'none',
        padding: '10px 0',
        fontSize: '1rem',
        borderBottom: '1px solid #34495e',
    },
};
