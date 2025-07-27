import { FC, memo } from 'react';

import styles from './modal.module.css';
import { useParams } from 'react-router-dom';
import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => {
    const orderNumber: string | undefined = useParams()?.number;
    return (
      <>
        <div className={styles.modal}>
          <div className={styles.header}>
            <h3
              className={
                orderNumber
                  ? `${styles.title} text text_type_digits-default`
                  : `${styles.title} text text_type_main-large`
              }
            >
              {orderNumber ? `#${String(orderNumber).padStart(6, '0')}` : title}
            </h3>
            <button className={styles.button} type='button'>
              <CloseIcon type='primary' onClick={onClose} />
            </button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
        <ModalOverlayUI onClick={onClose} />
      </>
    );
  }
);
