import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { classNames } from "../../internal/classNames";
import { CheckIcon } from "../../internal/icons/CheckIcon";
import styles from "./Alert.module.scss";

export type AlertTone = "info" | "success" | "warning" | "danger";
export interface AlertRootProps extends HTMLAttributes<HTMLDivElement> {
  tone?: AlertTone;
}
export type AlertTitleProps = HTMLAttributes<HTMLHeadingElement>;
export type AlertDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type AlertActionsProps = HTMLAttributes<HTMLDivElement>;

interface AlertStatusIconProps {
  tone: AlertTone;
}

function AlertStatusIcon({ tone }: AlertStatusIconProps) {
  if (tone === "success") {
    return <CheckIcon className={styles["status-icon-svg"]} />;
  }

  if (tone === "info") {
    return (
      <svg
        aria-hidden="true"
        className={styles["status-icon-svg"]}
        fill="none"
        focusable="false"
        viewBox="0 0 16 16"
      >
        <path d="M8 7v5" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        <path d="M8 4.5h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (tone === "warning") {
    return (
      <svg
        aria-hidden="true"
        className={styles["status-icon-svg"]}
        fill="none"
        focusable="false"
        viewBox="0 0 16 16"
      >
        <path d="M8 4.5v4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        <path d="M8 11.5h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={styles["status-icon-svg"]}
      fill="none"
      focusable="false"
      viewBox="0 0 16 16"
    >
      <path d="M8 4.5v4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M8 11.5h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

const AlertRoot = forwardRef<HTMLDivElement, AlertRootProps>(function AlertRoot(
  { children, className, tone = "info", ...props },
  ref,
) {
  return (
    <div {...props} ref={ref} className={classNames(styles.root, className)} data-tone={tone}>
      <span aria-hidden="true" className={styles["status-icon"]}>
        <AlertStatusIcon tone={tone} />
      </span>
      <div className={styles.content}>{children}</div>
    </div>
  );
});

const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(function AlertTitle(
  { children, className, ...props },
  ref,
) {
  return (
    <h2 {...props} ref={ref} className={classNames(styles.title, className)}>
      {children}
    </h2>
  );
});

const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  function AlertDescription({ className, ...props }, ref) {
    return <p {...props} ref={ref} className={classNames(styles.description, className)} />;
  },
);

const AlertActions = forwardRef<HTMLDivElement, AlertActionsProps>(function AlertActions(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classNames(styles.actions, className)} />;
});

AlertRoot.displayName = "Alert.Root";
AlertTitle.displayName = "Alert.Title";
AlertDescription.displayName = "Alert.Description";
AlertActions.displayName = "Alert.Actions";

export const Alert = {
  Root: AlertRoot,
  Title: AlertTitle,
  Description: AlertDescription,
  Actions: AlertActions,
};
