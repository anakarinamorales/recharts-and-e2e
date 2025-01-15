'use client';

import Menu from '@/components/Menu';

import styles from './PageLayout.module.css';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
      <>
        <Menu />
        <main className={styles.container}>{children}</main>
      </>
    );
}
