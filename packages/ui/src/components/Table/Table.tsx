import { forwardRef } from "react";
import type {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
import { classNames } from "../../internal/classNames";
import styles from "./Table.module.scss";

export type TableContainerProps = HTMLAttributes<HTMLDivElement>;
export type TableRootProps = TableHTMLAttributes<HTMLTableElement>;
export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;
export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableRowProps = HTMLAttributes<HTMLTableRowElement>;
export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>;
export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;

const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(function TableContainer(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classNames(styles.container, className)} />;
});

const TableRoot = forwardRef<HTMLTableElement, TableRootProps>(function TableRoot(
  { className, ...props },
  ref,
) {
  return <table {...props} ref={ref} className={classNames(styles.root, className)} />;
});

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(function TableCaption(
  { className, ...props },
  ref,
) {
  return <caption {...props} ref={ref} className={classNames(styles.caption, className)} />;
});

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(function TableHeader(
  { className, ...props },
  ref,
) {
  return <thead {...props} ref={ref} className={classNames(styles.header, className)} />;
});

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(function TableBody(
  { className, ...props },
  ref,
) {
  return <tbody {...props} ref={ref} className={classNames(styles.body, className)} />;
});

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(function TableFooter(
  { className, ...props },
  ref,
) {
  return <tfoot {...props} ref={ref} className={classNames(styles.footer, className)} />;
});

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className, ...props },
  ref,
) {
  return <tr {...props} ref={ref} className={classNames(styles.row, className)} />;
});

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { className, ...props },
  ref,
) {
  return <th {...props} ref={ref} className={classNames(styles.head, className)} />;
});

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, ...props },
  ref,
) {
  return <td {...props} ref={ref} className={classNames(styles.cell, className)} />;
});

TableContainer.displayName = "Table.Container";
TableRoot.displayName = "Table.Root";
TableCaption.displayName = "Table.Caption";
TableHeader.displayName = "Table.Header";
TableBody.displayName = "Table.Body";
TableFooter.displayName = "Table.Footer";
TableRow.displayName = "Table.Row";
TableHead.displayName = "Table.Head";
TableCell.displayName = "Table.Cell";

export const Table = {
  Container: TableContainer,
  Root: TableRoot,
  Caption: TableCaption,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
};
