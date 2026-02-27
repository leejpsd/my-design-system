import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Spinner } from '../Spinner';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.css';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      colorScheme = 'primary',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      className,
      as: Component = 'button',
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <Component
        ref={ref}
        className={clsx(
          styles.button,
          styles[variant],
          styles[size],
          styles[colorScheme],
          fullWidth && styles.fullWidth,
          isLoading && styles.loading,
          className,
        )}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        aria-disabled={isDisabled || undefined}
        {...rest}
      >
        {isLoading && <Spinner size="sm" className={styles.spinner} />}
        {!isLoading && leftIcon && (
          <span className={styles.icon}>{leftIcon}</span>
        )}
        <span className={styles.label}>{children}</span>
        {!isLoading && rightIcon && (
          <span className={styles.icon}>{rightIcon}</span>
        )}
      </Component>
    );
  },
);

Button.displayName = 'Button';
