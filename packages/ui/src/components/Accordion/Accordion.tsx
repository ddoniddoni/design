import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { forwardRef } from "react";
import { classNames } from "../../internal/classNames";
import styles from "./Accordion.module.scss";

export type AccordionRootProps =
  AccordionPrimitive.AccordionSingleProps | AccordionPrimitive.AccordionMultipleProps;
export type AccordionItemProps = AccordionPrimitive.AccordionItemProps;
export type AccordionHeaderProps = AccordionPrimitive.AccordionHeaderProps;
export type AccordionTriggerProps = AccordionPrimitive.AccordionTriggerProps;
export type AccordionContentProps = AccordionPrimitive.AccordionContentProps;

const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(function AccordionRoot(
  { className, ...props },
  ref,
) {
  return (
    <AccordionPrimitive.Root {...props} ref={ref} className={classNames(styles.root, className)} />
  );
});

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { className, ...props },
  ref,
) {
  return (
    <AccordionPrimitive.Item {...props} ref={ref} className={classNames(styles.item, className)} />
  );
});

const AccordionHeader = forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
  function AccordionHeader({ className, ...props }, ref) {
    return (
      <AccordionPrimitive.Header
        {...props}
        ref={ref}
        className={classNames(styles.header, className)}
      />
    );
  },
);

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger({ className, ...props }, ref) {
    return (
      <AccordionPrimitive.Trigger
        {...props}
        ref={ref}
        className={classNames(styles.trigger, className)}
      />
    );
  },
);

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent({ className, ...props }, ref) {
    return (
      <AccordionPrimitive.Content
        {...props}
        ref={ref}
        className={classNames(styles.content, className)}
      />
    );
  },
);

AccordionRoot.displayName = "Accordion.Root";
AccordionItem.displayName = "Accordion.Item";
AccordionHeader.displayName = "Accordion.Header";
AccordionTrigger.displayName = "Accordion.Trigger";
AccordionContent.displayName = "Accordion.Content";

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Header: AccordionHeader,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};
