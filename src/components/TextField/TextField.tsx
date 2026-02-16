import { forwardRef, useId } from 'react';
import { clsx } from 'clsx';
import type { TextFieldProps } from './TextField.types';
import styles from './TextField.module.css';

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      isError: isErrorProp = false,
      size = 'md',
      leftSlot,
      rightSlot,
      fullWidth = false,
      disabled,
      readOnly,
      className,
      id: idProp,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const isError = isErrorProp || !!errorMessage;
    const descriptionId = isError ? errorId : helperText ? helperId : undefined;

    return (
      <div
        className={clsx(
          styles.wrapper,
          fullWidth && styles.fullWidth,
          className,
        )}
      >
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <div
          className={clsx(
            styles.inputWrapper,
            styles[size],
            isError && styles.error,
            disabled && styles.disabled,
            readOnly && styles.readonly,
          )}
        >
          {leftSlot && <span className={styles.slot}>{leftSlot}</span>}
          <input
            ref={ref}
            id={id}
            className={styles.input}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={isError || undefined}
            aria-describedby={descriptionId}
            {...rest}
          />
          {rightSlot && <span className={styles.slot}>{rightSlot}</span>}
        </div>
        {isError && errorMessage && (
          <p id={errorId} className={styles.errorMessage} role="alert">
            {errorMessage}
          </p>
        )}
        {!isError && helperText && (
          <p id={helperId} className={styles.helperText}>
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

TextField.displayName = 'TextField';
