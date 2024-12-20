import styles from "./Button.module.css";

export default function Button({
  children,
  type,
  onClick,
  className,
}: {
  children: React.ReactNode;
  type: 'submit' | 'button';
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      className={className ? `${styles.btn} ${className}` : styles.btn}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
