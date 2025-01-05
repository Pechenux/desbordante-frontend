'use client';

import {
  FloatingPortal,
  autoUpdate,
  offset,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { FC, useContext, useState } from 'react';
import { Icon } from '@/components/common/uikit';
import { PortalRootContext } from '@/components/meta';
import colors from '@/constants/colors';
import { WithChildren } from '@/types/withChildren';

import styles from './Tooltip.module.scss';

type TolltipProps = WithChildren & {
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
};

export const Tooltip: FC<TolltipProps> = ({ position = 'top', children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const portalRootRef = useContext(PortalRootContext);

  const { refs, floatingStyles, context } = useFloating({
    open: isHovered,
    onOpenChange: setIsHovered,
    whileElementsMounted: autoUpdate,
    placement: position,
    middleware: [offset(5)],
  });

  const hover = useHover(context, { move: false });
  const role = useRole(context, { role: 'tooltip' });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    role,
  ]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps({ className: styles.tooltip })}
      >
        <Icon
          name="info"
          size={16}
          color={colors.primary[100]}
          className={styles.icon}
        />
      </div>

      {isHovered && (
        <FloatingPortal root={portalRootRef}>
          <div
            {...getFloatingProps({
              ref: refs.setFloating,
              className: styles.content,
              style: floatingStyles,
            })}
          >
            {children}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};
