import Link from 'next/link';

import { useMetersContext } from '@/context/useMetersContext';

import styles from './Menu.module.css';
import { useState } from 'react';

export default function Menu() {
  const { meters, queryError } = useMetersContext();
  const [ariaExpanded, setAriaExpanded] = useState(() => false);

  function toggleMenu() {
    setAriaExpanded(!ariaExpanded);
  }

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
              <Link href={`/meter/${meter.id}`}>{meter.name}</Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}
