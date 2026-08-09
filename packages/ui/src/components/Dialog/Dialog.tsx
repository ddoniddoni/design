import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { classNames } from "../../internal/classNames";
import styles from "./Dialog.module.scss";

export type DialogRootProps = DialogPrimitive.DialogProps;
export type DialogTriggerProps = DialogPrimitive.DialogTriggerProps;
export type DialogPortalProps = DialogPrimitive.DialogPortalProps;
export type DialogOverlayProps = DialogPrimitive.DialogOverlayProps;
export type DialogContentProps = DialogPrimitive.DialogContentProps;
export type DialogTitleProps = DialogPrimitive.DialogTitleProps;
export type DialogDescriptionProps = DialogPrimitive.DialogDescriptionProps;
export type DialogCloseProps = DialogPrimitive.DialogCloseProps;
export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;
export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;

const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(function DialogOverlay(
  { className, ...props },
  ref,
) {
  return (
    <DialogPrimitive.Overlay
      {...props}
      ref={ref}
      className={classNames(styles.overlay, className)}
    />
  );
});

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  { className, ...props },
  ref,
) {
  return (
    <DialogPrimitive.Content
      {...props}
      ref={ref}
      className={classNames(styles.content, className)}
    />
  );
});

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(function DialogHeader(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classNames(styles.header, className)} />;
});

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(function DialogTitle(
  { className, ...props },
  ref,
) {
  return (
    <DialogPrimitive.Title {...props} ref={ref} className={classNames(styles.title, className)} />
  );
});

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  function DialogDescription({ className, ...props }, ref) {
    return (
      <DialogPrimitive.Description
        {...props}
        ref={ref}
        className={classNames(styles.description, className)}
      />
    );
  },
);

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(function DialogFooter(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classNames(styles.footer, className)} />;
});

DialogOverlay.displayName = "Dialog.Overlay";
DialogContent.displayName = "Dialog.Content";
DialogHeader.displayName = "Dialog.Header";
DialogTitle.displayName = "Dialog.Title";
DialogDescription.displayName = "Dialog.Description";
DialogFooter.displayName = "Dialog.Footer";

export const Dialog = {
  Root: DialogPrimitive.Root,
  Trigger: DialogPrimitive.Trigger,
  Portal: DialogPrimitive.Portal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: DialogPrimitive.Close,
};
