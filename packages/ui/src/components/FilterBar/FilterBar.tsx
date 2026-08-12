import { forwardRef } from "react";
import type { FormHTMLAttributes, HTMLAttributes } from "react";
import { classNames } from "../../internal/classNames";
import styles from "./FilterBar.module.scss";

export type FilterBarRootProps = Omit<FormHTMLAttributes<HTMLFormElement>, "role">;
export type FilterBarControlsProps = HTMLAttributes<HTMLDivElement>;
export type FilterBarActionsProps = HTMLAttributes<HTMLDivElement>;

const FilterBarRoot = forwardRef<HTMLFormElement, FilterBarRootProps>(function FilterBarRoot(
  { "aria-label": ariaLabel = "목록 필터", className, ...props },
  ref,
) {
  return (
    <form
      {...props}
      ref={ref}
      aria-label={ariaLabel}
      className={classNames(styles.root, className)}
      role="search"
    />
  );
});

const FilterBarControls = forwardRef<HTMLDivElement, FilterBarControlsProps>(
  function FilterBarControls({ className, ...props }, ref) {
    return <div {...props} ref={ref} className={classNames(styles.controls, className)} />;
  },
);

const FilterBarActions = forwardRef<HTMLDivElement, FilterBarActionsProps>(
  function FilterBarActions({ className, ...props }, ref) {
    return <div {...props} ref={ref} className={classNames(styles.actions, className)} />;
  },
);

FilterBarRoot.displayName = "FilterBar.Root";
FilterBarControls.displayName = "FilterBar.Controls";
FilterBarActions.displayName = "FilterBar.Actions";

export const FilterBar = {
  Root: FilterBarRoot,
  Controls: FilterBarControls,
  Actions: FilterBarActions,
};
