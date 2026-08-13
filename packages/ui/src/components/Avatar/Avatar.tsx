import { forwardRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { classNames } from "../../internal/classNames";
import styles from "./Avatar.module.scss";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  alt: string;
  fallback?: ReactNode;
  size?: AvatarSize;
  src?: string;
}

function getInitials(label: string) {
  const words = label.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return "";
  }

  if (words.length === 1) {
    return Array.from(words[0] ?? "")
      .slice(0, 2)
      .join("");
  }

  return words
    .slice(0, 2)
    .flatMap((word) => Array.from(word).slice(0, 1))
    .join("");
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { alt, className, fallback, size = "md", src, ...props },
  ref,
) {
  const [failedSource, setFailedSource] = useState<string | undefined>(undefined);
  const hasImage = Boolean(src) && failedSource !== src;
  const fallbackContent = fallback ?? getInitials(alt);

  return (
    <span {...props} ref={ref} className={classNames(styles.root, className)} data-size={size}>
      {hasImage ? (
        <>
          <span aria-hidden="true" className={styles.fallback}>
            {fallbackContent}
          </span>
          <img alt={alt} className={styles.image} src={src} onError={() => setFailedSource(src)} />
        </>
      ) : (
        <span
          aria-hidden={alt ? undefined : "true"}
          aria-label={alt || undefined}
          className={styles.fallback}
          role={alt ? "img" : undefined}
        >
          {fallbackContent}
        </span>
      )}
    </span>
  );
});

Avatar.displayName = "Avatar";
