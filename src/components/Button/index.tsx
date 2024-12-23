import styles from './Button.module.css';

export default function Button({
  children,
  className,
  disabled,
  onClick,
  type,
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type: 'submit' | 'button';
}) {
  return (
    <button
      className={className ? `${styles.btn} ${className}` : styles.btn}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
