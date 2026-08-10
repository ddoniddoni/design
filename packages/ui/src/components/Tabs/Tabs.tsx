import * as TabsPrimitive from "@radix-ui/react-tabs";
import { forwardRef } from "react";
import { classNames } from "../../internal/classNames";
import styles from "./Tabs.module.scss";

export type TabsRootProps = TabsPrimitive.TabsProps;
export type TabsListProps = TabsPrimitive.TabsListProps;
export type TabsTriggerProps = TabsPrimitive.TabsTriggerProps;
export type TabsContentProps = TabsPrimitive.TabsContentProps;

const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(function TabsRoot(
  { className, ...props },
  ref,
) {
  return <TabsPrimitive.Root {...props} ref={ref} className={classNames(styles.root, className)} />;
});

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { className, ...props },
  ref,
) {
  return <TabsPrimitive.List {...props} ref={ref} className={classNames(styles.list, className)} />;
});

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger(
  { className, ...props },
  ref,
) {
  return (
    <TabsPrimitive.Trigger {...props} ref={ref} className={classNames(styles.trigger, className)} />
  );
});

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent(
  { className, ...props },
  ref,
) {
  return (
    <TabsPrimitive.Content {...props} ref={ref} className={classNames(styles.content, className)} />
  );
});

TabsRoot.displayName = "Tabs.Root";
TabsList.displayName = "Tabs.List";
TabsTrigger.displayName = "Tabs.Trigger";
TabsContent.displayName = "Tabs.Content";

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};
