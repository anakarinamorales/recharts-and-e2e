import Link from 'next/link';

import { useMetersContext } from '@/context/useMetersContext';

import styles from "./Menu.module.css";

export default function Menu() {
    const { meters, queryError } = useMetersContext();

  return (
    <nav className={styles.menuContainer}>
      <ul className={styles.navigationList}>
        <li className={styles.menuItem}>
          <Link href={`/`}>Home</Link>
        </li>
        {
          !queryError && meters?.map((meter) => (
            <li key={meter.name + meter.id} className={styles.menuItem}>
              <Link href={`/meter/${meter.id}`}>{meter.name}</Link>
            </li>
          ))
        }
      </ul>
    </nav>
  );
}
