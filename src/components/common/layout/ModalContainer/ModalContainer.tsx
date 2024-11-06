'use client';

import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import cn from 'classnames';
import { FC, useContext } from 'react';
import { Icon } from '@/components/common/uikit/Icon';
import { PortalRootContext } from '@/components/meta';
import { WithChildren } from '@/types/withChildren';
import styles from './ModalContainer.module.scss';

export type ModalProps = WithChildren & {
  className?: string;
  title?: string;
  onClose: () => void;
  isOpen?: boolean;
};

export const ModalContainer: FC<ModalProps> = ({
  className,
  title,
  children,
  onClose,
  isOpen = true,
}) => {
  const portalRootRef = useContext(PortalRootContext);

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: (prop: boolean) => !prop && onClose(),
  });

  const stylesOverlay = useTransitionStyles(context, {
    duration: 300,
    initial: {
      opacity: 0,
    },
  }).styles;

  const stylesDialog = useTransitionStyles(context, {
    duration: 300,
    initial: {
      transform: 'translate3d(0, 3%, 0)',
    },
  }).styles;

  const dismiss = useDismiss(context, {
    outsidePressEvent: 'click',
    bubbles: { escapeKey: false, outsidePress: false },
  });
  const role = useRole(context, { role: 'dialog' });

  const { getFloatingProps } = useInteractions([dismiss, role]);
  return (
    <>
      {isOpen && (
        <FloatingPortal root={portalRootRef}>
          <FloatingOverlay
            style={stylesOverlay}
            className={styles.dialogOverlay}
            lockScroll
          >
            <FloatingFocusManager context={context}>
              <div
                style={stylesDialog}
                className={cn(styles.dialog, className)}
                ref={refs.setFloating}
                {...getFloatingProps()}
              >
                {title && <h4 className={styles.title}>{title}</h4>}
                {children}
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className={styles.closeButton}
                  role="close"
                >
                  <Icon name="cross" />
                </button>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </>
  );
};
