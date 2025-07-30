'use client';

import React, { CSSProperties } from 'react';
import { usePathname } from "next/navigation";
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

export default function ClientPathHandler({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showLayoutComponents = pathname !== '/';

    // useEffect(()=> {
    //  setTimeout(() => {
    //   window.location.href = "/";
    //   console.log('----in');
    //  },3000)
    // //  clearInterval(timeout);
    // }, []);

  return (
    <>
      {showLayoutComponents && <Header />}
      {showLayoutComponents ? (
        <div style={styles.layout}>
          <div style={styles.sidebar}>
            <Sidebar />
          </div>
          <div style={styles.content}>
            {children}
          </div>
        </div>
      ) : (
        children
      )}
      {showLayoutComponents && <Footer />}
    </>
  );
}

const styles: Record<string, CSSProperties> = {
  layout: {
    display: 'flex',
    minHeight: 'calc(100vh - 120px)',
  },
  sidebar: {
    width: '22%',
    backgroundColor: '#f0f0f0',
    padding: '20px',
    boxSizing: 'border-box',
  },
  content: {
    width: '78%',
    padding: '20px',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
  },
};
