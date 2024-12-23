import CloseButton from './CloseButton';
import styles from './Modal.module.css';
import { forwardRef, RefObject } from 'react';

type CustomDialogProps = {
  children: React.ReactNode;
  toggleDialog: () => void;
};

export function toggleDialog(dialogRef: RefObject<HTMLDialogElement | null>) {
  if (!dialogRef.current) {
    return;
  }

  if (dialogRef.current.hasAttribute('open')) {
    dialogRef.current.close();
    return;
  }

  dialogRef.current.showModal();
}

// eslint-disable-next-line react/display-name
const Dialog = forwardRef<HTMLDialogElement, CustomDialogProps>(
  ({ children, toggleDialog }, ref) => {
    return (
      <dialog
        ref={ref}
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            toggleDialog();
          }
        }}
      >
        <div className={styles.content}>
          <CloseButton onClick={toggleDialog} />
          {children}
        </div>
      </dialog>
    );
  }
);

export default Dialog;
