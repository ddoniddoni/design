import { forwardRef } from "react";
import type { HTMLAttributes, LabelHTMLAttributes } from "react";
import { classNames } from "../../internal/classNames";
import styles from "./Field.module.scss";

export interface FieldRootProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  invalid?: boolean;
}

export type FieldLabelProps = LabelHTMLAttributes<HTMLLabelElement>;
export type FieldDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type FieldErrorProps = HTMLAttributes<HTMLParagraphElement>;

const FieldRoot = forwardRef<HTMLDivElement, FieldRootProps>(function FieldRoot(
  { className, disabled = false, invalid = false, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={classNames(styles.root, className)}
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
    />
  );
});

const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(function FieldLabel(
  { className, htmlFor, ...props },
  ref,
) {
  return (
    <label {...props} ref={ref} className={classNames(styles.label, className)} htmlFor={htmlFor} />
  );
});

const FieldDescription = forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  function FieldDescription({ className, ...props }, ref) {
    return <p {...props} ref={ref} className={classNames(styles.description, className)} />;
  },
);

const FieldError = forwardRef<HTMLParagraphElement, FieldErrorProps>(function FieldError(
  { className, ...props },
  ref,
) {
  return <p {...props} ref={ref} className={classNames(styles.error, className)} />;
});

FieldRoot.displayName = "Field.Root";
FieldLabel.displayName = "Field.Label";
FieldDescription.displayName = "Field.Description";
FieldError.displayName = "Field.Error";

export const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Description: FieldDescription,
  Error: FieldError,
};
