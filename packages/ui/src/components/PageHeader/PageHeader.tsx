import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { classNames } from "../../internal/classNames";
import styles from "./PageHeader.module.scss";

export type PageHeaderRootProps = HTMLAttributes<HTMLElement>;
export type PageHeaderContentProps = HTMLAttributes<HTMLDivElement>;
export type PageHeaderTitleProps = HTMLAttributes<HTMLHeadingElement>;
export type PageHeaderDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type PageHeaderActionsProps = HTMLAttributes<HTMLDivElement>;

const PageHeaderRoot = forwardRef<HTMLElement, PageHeaderRootProps>(function PageHeaderRoot(
  { className, ...props },
  ref,
) {
  return <header {...props} ref={ref} className={classNames(styles.root, className)} />;
});

const PageHeaderContent = forwardRef<HTMLDivElement, PageHeaderContentProps>(
  function PageHeaderContent({ className, ...props }, ref) {
    return <div {...props} ref={ref} className={classNames(styles.content, className)} />;
  },
);

const PageHeaderTitle = forwardRef<HTMLHeadingElement, PageHeaderTitleProps>(
  function PageHeaderTitle({ children, className, ...props }, ref) {
    return (
      <h1 {...props} ref={ref} className={classNames(styles.title, className)}>
        {children}
      </h1>
    );
  },
);

const PageHeaderDescription = forwardRef<HTMLParagraphElement, PageHeaderDescriptionProps>(
  function PageHeaderDescription({ className, ...props }, ref) {
    return <p {...props} ref={ref} className={classNames(styles.description, className)} />;
  },
);

const PageHeaderActions = forwardRef<HTMLDivElement, PageHeaderActionsProps>(
  function PageHeaderActions({ className, ...props }, ref) {
    return <div {...props} ref={ref} className={classNames(styles.actions, className)} />;
  },
);

PageHeaderRoot.displayName = "PageHeader.Root";
PageHeaderContent.displayName = "PageHeader.Content";
PageHeaderTitle.displayName = "PageHeader.Title";
PageHeaderDescription.displayName = "PageHeader.Description";
PageHeaderActions.displayName = "PageHeader.Actions";

export const PageHeader = {
  Root: PageHeaderRoot,
  Content: PageHeaderContent,
  Title: PageHeaderTitle,
  Description: PageHeaderDescription,
  Actions: PageHeaderActions,
};
