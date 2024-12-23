import { forwardRef, RefObject } from 'react';

import CloseButton from '@/components/ModalDialog/CloseButton';

import styles from '@/components/ModalDialog/Modal.module.css';

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

Dialog.displayName = 'CustomDialog';

export default Dialog;
