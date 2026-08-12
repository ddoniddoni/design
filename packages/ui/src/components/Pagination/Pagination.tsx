import { forwardRef } from "react";
import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  LiHTMLAttributes,
  OlHTMLAttributes,
} from "react";
import { classNames } from "../../internal/classNames";
import styles from "./Pagination.module.scss";

export type PaginationRootProps = HTMLAttributes<HTMLElement>;
export type PaginationListProps = OlHTMLAttributes<HTMLOListElement>;
export type PaginationItemProps = LiHTMLAttributes<HTMLLIElement>;

export interface PaginationLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export type PaginationPreviousProps = PaginationLinkProps;
export type PaginationNextProps = PaginationLinkProps;
export type PaginationEllipsisProps = Omit<
  LiHTMLAttributes<HTMLLIElement>,
  "aria-hidden" | "children"
>;

const PaginationRoot = forwardRef<HTMLElement, PaginationRootProps>(function PaginationRoot(
  { "aria-label": ariaLabel = "페이지 탐색", className, ...props },
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

const PaginationList = forwardRef<HTMLOListElement, PaginationListProps>(function PaginationList(
  { className, ...props },
  ref,
) {
  return <ol {...props} ref={ref} className={classNames(styles.list, className)} />;
});

const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(function PaginationItem(
  { className, ...props },
  ref,
) {
  return <li {...props} ref={ref} className={classNames(styles.item, className)} />;
});

const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(function PaginationLink(
  { children, className, ...props },
  ref,
) {
  return (
    <a {...props} ref={ref} className={classNames(styles.link, className)}>
      {children}
    </a>
  );
});

const PaginationPrevious = forwardRef<HTMLAnchorElement, PaginationPreviousProps>(
  function PaginationPrevious(
    { "aria-label": ariaLabel = "이전 페이지", children = "이전", className, ...props },
    ref,
  ) {
    return (
      <a
        {...props}
        ref={ref}
        aria-label={ariaLabel}
        className={classNames(styles.previous, className)}
      >
        {children}
      </a>
    );
  },
);

const PaginationNext = forwardRef<HTMLAnchorElement, PaginationNextProps>(function PaginationNext(
  { "aria-label": ariaLabel = "다음 페이지", children = "다음", className, ...props },
  ref,
) {
  return (
    <a {...props} ref={ref} aria-label={ariaLabel} className={classNames(styles.next, className)}>
      {children}
    </a>
  );
});

const PaginationEllipsis = forwardRef<HTMLLIElement, PaginationEllipsisProps>(
  function PaginationEllipsis({ className, ...props }, ref) {
    return (
      <li
        {...props}
        ref={ref}
        aria-hidden="true"
        className={classNames(styles.ellipsis, className)}
      >
        …
      </li>
    );
  },
);

PaginationRoot.displayName = "Pagination.Root";
PaginationList.displayName = "Pagination.List";
PaginationItem.displayName = "Pagination.Item";
PaginationLink.displayName = "Pagination.Link";
PaginationPrevious.displayName = "Pagination.Previous";
PaginationNext.displayName = "Pagination.Next";
PaginationEllipsis.displayName = "Pagination.Ellipsis";

export const Pagination = {
  Root: PaginationRoot,
  List: PaginationList,
  Item: PaginationItem,
  Link: PaginationLink,
  Previous: PaginationPrevious,
  Next: PaginationNext,
  Ellipsis: PaginationEllipsis,
};
