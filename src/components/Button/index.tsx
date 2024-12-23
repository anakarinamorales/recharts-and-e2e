import styles from './Button.module.css';

export default function Button({
  children,
  type,
  onClick,
  className,
  disabled,
}: {
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
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
