import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { classNames } from "../../internal/classNames";
import styles from "./Card.module.scss";

export type CardRootProps = HTMLAttributes<HTMLDivElement>;
export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;
export type CardContentProps = HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = HTMLAttributes<HTMLDivElement>;
export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export interface CardTitleProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const CardRoot = forwardRef<HTMLDivElement, CardRootProps>(function CardRoot(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classNames(styles.root, className)} />;
});

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classNames(styles.header, className)} />;
});

const CardTitle = forwardRef<HTMLDivElement, CardTitleProps>(function CardTitle(
  { asChild = false, className, ...props },
  ref,
) {
  if (asChild) {
    return <Slot {...props} ref={ref} className={classNames(styles.title, className)} />;
  }

  return <div {...props} ref={ref} className={classNames(styles.title, className)} />;
});

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  function CardDescription({ className, ...props }, ref) {
    return <p {...props} ref={ref} className={classNames(styles.description, className)} />;
  },
);

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(function CardContent(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classNames(styles.content, className)} />;
});

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classNames(styles.footer, className)} />;
});

CardRoot.displayName = "Card.Root";
CardHeader.displayName = "Card.Header";
CardTitle.displayName = "Card.Title";
CardDescription.displayName = "Card.Description";
CardContent.displayName = "Card.Content";
CardFooter.displayName = "Card.Footer";

export const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
};
