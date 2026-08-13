import { forwardRef } from "react";
import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  LiHTMLAttributes,
  OlHTMLAttributes,
} from "react";
import { classNames } from "../../internal/classNames";
import styles from "./Breadcrumb.module.scss";

export type BreadcrumbRootProps = HTMLAttributes<HTMLElement>;
export type BreadcrumbListProps = OlHTMLAttributes<HTMLOListElement>;
export type BreadcrumbItemProps = LiHTMLAttributes<HTMLLIElement>;

export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export type BreadcrumbCurrentPageProps = Omit<HTMLAttributes<HTMLSpanElement>, "aria-current">;
export type BreadcrumbSeparatorProps = Omit<
  LiHTMLAttributes<HTMLLIElement>,
  "aria-hidden" | "children"
>;

const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbRootProps>(function BreadcrumbRoot(
  { "aria-label": ariaLabel = "경로 탐색", className, ...props },
  ref,
) {
  return (
    <nav
      {...props}
      ref={ref}
      aria-label={ariaLabel}
      className={classNames(styles.root, className)}
    />
  );
});

const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(function BreadcrumbList(
  { className, ...props },
  ref,
) {
  return <ol {...props} ref={ref} className={classNames(styles.list, className)} />;
});

const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(function BreadcrumbItem(
  { className, ...props },
  ref,
) {
  return <li {...props} ref={ref} className={classNames(styles.item, className)} />;
});

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(function BreadcrumbLink(
  { children, className, ...props },
  ref,
) {
  return (
    <a {...props} ref={ref} className={classNames(styles.link, className)}>
      {children}
    </a>
  );
});

const BreadcrumbCurrentPage = forwardRef<HTMLSpanElement, BreadcrumbCurrentPageProps>(
  function BreadcrumbCurrentPage({ className, ...props }, ref) {
    return (
      <span
        {...props}
        ref={ref}
        aria-current="page"
        className={classNames(styles["current-page"], className)}
      />
    );
  },
);

const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
  function BreadcrumbSeparator({ className, ...props }, ref) {
    return (
      <li
        {...props}
        ref={ref}
        aria-hidden="true"
        className={classNames(styles.separator, className)}
      >
        ›
      </li>
    );
  },
);

BreadcrumbRoot.displayName = "Breadcrumb.Root";
BreadcrumbList.displayName = "Breadcrumb.List";
BreadcrumbItem.displayName = "Breadcrumb.Item";
BreadcrumbLink.displayName = "Breadcrumb.Link";
BreadcrumbCurrentPage.displayName = "Breadcrumb.CurrentPage";
BreadcrumbSeparator.displayName = "Breadcrumb.Separator";

export const Breadcrumb = {
  Root: BreadcrumbRoot,
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  CurrentPage: BreadcrumbCurrentPage,
  Separator: BreadcrumbSeparator,
};
