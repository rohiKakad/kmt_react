'use client';

import React from 'react';

const Dashboard = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Dashboard</h1>
            <p style={styles.description}>Welcome to your dashboard. Here you can manage your data, view analytics, and access tools.</p>
        </div>
    );
};

export default Dashboard;

const styles = {
    container: {
        padding: '40px',
        backgroundColor: '#f5f7fa',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '40px auto',
        fontFamily: 'Segoe UI, sans-serif',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#333',
    },
    description: {
        fontSize: '1rem',
        color: '#555',
        lineHeight: '1.6',
    },
};
