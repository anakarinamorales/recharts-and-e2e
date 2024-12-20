import styles from './CloseButton.module.css';

export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button aria-label="Close modal dialog" className={styles.container} onClick={onClick}>
      X
    </button>
  );
}
