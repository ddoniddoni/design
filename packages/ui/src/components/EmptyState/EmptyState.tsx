import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { classNames } from "../../internal/classNames";
import styles from "./EmptyState.module.scss";

export type EmptyStateRootProps = HTMLAttributes<HTMLDivElement>;
export type EmptyStateIconProps = Omit<HTMLAttributes<HTMLSpanElement>, "aria-hidden">;
export type EmptyStateTitleProps = HTMLAttributes<HTMLHeadingElement>;
export type EmptyStateDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type EmptyStateActionsProps = HTMLAttributes<HTMLDivElement>;

const EmptyStateRoot = forwardRef<HTMLDivElement, EmptyStateRootProps>(function EmptyStateRoot(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classNames(styles.root, className)} />;
});

const EmptyStateIcon = forwardRef<HTMLSpanElement, EmptyStateIconProps>(function EmptyStateIcon(
  { children, className, ...props },
  ref,
) {
  return (
    <span {...props} ref={ref} aria-hidden="true" className={classNames(styles.icon, className)}>
      {children}
    </span>
  );
});

const EmptyStateTitle = forwardRef<HTMLHeadingElement, EmptyStateTitleProps>(
  function EmptyStateTitle({ children, className, ...props }, ref) {
    return (
      <h2 {...props} ref={ref} className={classNames(styles.title, className)}>
        {children}
      </h2>
    );
  },
);

const EmptyStateDescription = forwardRef<HTMLParagraphElement, EmptyStateDescriptionProps>(
  function EmptyStateDescription({ className, ...props }, ref) {
    return <p {...props} ref={ref} className={classNames(styles.description, className)} />;
  },
);

const EmptyStateActions = forwardRef<HTMLDivElement, EmptyStateActionsProps>(
  function EmptyStateActions({ className, ...props }, ref) {
    return <div {...props} ref={ref} className={classNames(styles.actions, className)} />;
  },
);

EmptyStateRoot.displayName = "EmptyState.Root";
EmptyStateIcon.displayName = "EmptyState.Icon";
EmptyStateTitle.displayName = "EmptyState.Title";
EmptyStateDescription.displayName = "EmptyState.Description";
EmptyStateActions.displayName = "EmptyState.Actions";

export const EmptyState = {
  Root: EmptyStateRoot,
  Icon: EmptyStateIcon,
  Title: EmptyStateTitle,
  Description: EmptyStateDescription,
  Actions: EmptyStateActions,
};
