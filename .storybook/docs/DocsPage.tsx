import { DocsPage as StorybookDocsPage } from "@storybook/addon-docs/blocks";
import styles from "./DocsPage.module.scss";

export function DDoniDocsPage() {
  return (
    <article className={styles.docsPage}>
      <div className={styles.content}>
        <StorybookDocsPage />
      </div>
    </article>
  );
}
