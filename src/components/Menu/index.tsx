import Link from 'next/link';

import { useMetersContext } from '@/context/useMetersContext';

import styles from './Menu.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Menu() {
  const { meters, queryError } = useMetersContext();
  const [ariaExpanded, setAriaExpanded] = useState(() => false);
  const router = useRouter();

  function toggleMenu() {
    setAriaExpanded(!ariaExpanded);
  }

  // The ariaExpanded state is maintained between renders because the parent component (PageLayout) hasn't changed.
  // So, navigating between /meter/1 and /meter/2 will not reset the state related to the aria-expanded for the navbar.
  // That's why I'm manually ensuring that the state is cleared once the url changes.
  // https://nextjs.org/docs/pages/api-reference/functions/use-router#resetting-state-after-navigation
  useEffect(() => {
    setAriaExpanded(false);
  }, [router.query.id]);

  return (
    <nav
      aria-label='Main menu'
      className={styles.menuContainer}
      role='navigation'
    >
      <button
        aria-expanded={ariaExpanded}
        aria-label='Main menu'
        className={styles.burgerBtn}
        onClick={toggleMenu}
        onKeyDown={(event) => {
          const keyCode = event.key;
          if (keyCode === 'Escape' && ariaExpanded) {
            setAriaExpanded(false);
          }
        }}
      />
      <ul className={styles.navigationList}>
        <li className={styles.menuItem}>
          <Link href={`/`}>Home</Link>
        </li>
        {!queryError &&
          meters?.map((meter) => (
            <li key={meter.name + meter.id} className={styles.menuItem}>
              <Link href={`/meter/${meter.id}`} prefetch>
                {meter.name}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}
