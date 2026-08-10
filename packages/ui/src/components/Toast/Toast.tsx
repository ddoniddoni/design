import * as ToastPrimitive from "@radix-ui/react-toast";
import { forwardRef } from "react";
import { classNames } from "../../internal/classNames";
import styles from "./Toast.module.scss";

export type ToastTone = "neutral" | "success" | "warning" | "danger" | "info";
export type ToastProviderProps = ToastPrimitive.ToastProviderProps;
export type ToastViewportProps = ToastPrimitive.ToastViewportProps;
export type ToastRootProps = ToastPrimitive.ToastProps & { tone?: ToastTone };
export type ToastTitleProps = ToastPrimitive.ToastTitleProps;
export type ToastDescriptionProps = ToastPrimitive.ToastDescriptionProps;
export type ToastActionProps = ToastPrimitive.ToastActionProps;
export type ToastCloseProps = ToastPrimitive.ToastCloseProps;

const ToastViewport = forwardRef<HTMLOListElement, ToastViewportProps>(function ToastViewport(
  { className, ...props },
  ref,
) {
  return (
    <ToastPrimitive.Viewport
      {...props}
      ref={ref}
      className={classNames(styles.viewport, className)}
    />
  );
});

const ToastRoot = forwardRef<HTMLLIElement, ToastRootProps>(function ToastRoot(
  { className, tone = "neutral", ...props },
  ref,
) {
  return (
    <ToastPrimitive.Root
      {...props}
      ref={ref}
      className={classNames(styles.root, className)}
      data-tone={tone}
    />
  );
});

const ToastTitle = forwardRef<HTMLDivElement, ToastTitleProps>(function ToastTitle(
  { className, ...props },
  ref,
) {
  return (
    <ToastPrimitive.Title {...props} ref={ref} className={classNames(styles.title, className)} />
  );
});

const ToastDescription = forwardRef<HTMLDivElement, ToastDescriptionProps>(
  function ToastDescription({ className, ...props }, ref) {
    return (
      <ToastPrimitive.Description
        {...props}
        ref={ref}
        className={classNames(styles.description, className)}
      />
    );
  },
);

const ToastAction = forwardRef<HTMLButtonElement, ToastActionProps>(function ToastAction(
  { className, type = "button", ...props },
  ref,
) {
  return (
    <ToastPrimitive.Action
      {...props}
      ref={ref}
      className={classNames(styles.action, className)}
      type={type}
    />
  );
});

const ToastClose = forwardRef<HTMLButtonElement, ToastCloseProps>(function ToastClose(
  { className, type = "button", ...props },
  ref,
) {
  return (
    <ToastPrimitive.Close
      {...props}
      ref={ref}
      className={classNames(styles.close, className)}
      type={type}
    />
  );
});

ToastViewport.displayName = "Toast.Viewport";
ToastRoot.displayName = "Toast.Root";
ToastTitle.displayName = "Toast.Title";
ToastDescription.displayName = "Toast.Description";
ToastAction.displayName = "Toast.Action";
ToastClose.displayName = "Toast.Close";

export const Toast = {
  Provider: ToastPrimitive.Provider,
  Viewport: ToastViewport,
  Root: ToastRoot,
  Title: ToastTitle,
  Description: ToastDescription,
  Action: ToastAction,
  Close: ToastClose,
};
