import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const componentDirectory = new URL("../packages/ui/src/components/", import.meta.url);
const publicIndexPath = new URL("../packages/ui/src/index.ts", import.meta.url);
const previewConfigPath = new URL("../.storybook/preview.ts", import.meta.url);
const tokenCssPath = new URL("../packages/tokens/dist/tokens.css", import.meta.url);
const storybookIndexPath = new URL("../storybook-static/index.json", import.meta.url);

const componentContracts = [
  ["Actions", "Button"],
  ["Actions", "IconButton"],
  ["Forms", "Field"],
  ["Forms", "Input"],
  ["Forms", "Textarea"],
  ["Forms", "Checkbox"],
  ["Forms", "RadioGroup"],
  ["Forms", "Select"],
  ["Forms", "Switch"],
  ["Forms", "FilterBar"],
  ["Layout", "Card"],
  ["Layout", "PageHeader"],
  ["Navigation", "Accordion"],
  ["Navigation", "Tabs"],
  ["Navigation", "Pagination"],
  ["Data Display", "Badge"],
  ["Data Display", "Table"],
  ["Feedback", "Alert"],
  ["Feedback", "EmptyState"],
  ["Feedback", "Skeleton"],
  ["Feedback", "Spinner"],
  ["Feedback", "Toast"],
  ["Overlays", "Dialog"],
  ["Overlays", "DropdownMenu"],
  ["Overlays", "Popover"],
  ["Overlays", "Tooltip"],
].map(([category, component]) => ({
  category,
  component,
  documentPath: new URL(
    `../packages/ui/src/components/${component}/${component}.docs.mdx`,
    import.meta.url,
  ),
  storyPath: new URL(
    `../packages/ui/src/components/${component}/${component}.stories.tsx`,
    import.meta.url,
  ),
  title: `Components/${category}/${component}`,
}));

const requiredSectionIds = ["usage", "props", "accessibility", "tokens"];

const sidebarOrder = componentContracts.flatMap(({ category, component }, index) => {
  const previousCategory = componentContracts[index - 1]?.category;

  return previousCategory === category ? [component] : [category, component];
});

function getPath(url) {
  return fileURLToPath(url);
}

function getFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, directory);

    return entry.isDirectory() ? getFiles(entryPath) : [getPath(entryPath)];
  });
}

function getDocumentContractErrors(contract, tokenNames) {
  const errors = [];
  const documentPath = getPath(contract.documentPath);
  const storyPath = getPath(contract.storyPath);

  if (!existsSync(documentPath)) {
    return [`missing document: ${documentPath}`];
  }

  if (!existsSync(storyPath)) {
    return [`missing story: ${storyPath}`];
  }

  const source = readFileSync(documentPath, "utf8");
  const storySource = readFileSync(storyPath, "utf8");
  const storyModuleName = `${contract.component}Stories`;

  if (!source.includes(`# ${contract.component}\n`)) {
    errors.push(`expected exactly one H1 named "${contract.component}"`);
  }

  if (!source.includes(`<Meta of={${storyModuleName}} name="문서" />`)) {
    errors.push(`expected Meta to attach ${storyModuleName}`);
  }

  if (!source.includes(`import * as ${storyModuleName} from "./${contract.component}.stories";`)) {
    errors.push(`expected ${storyModuleName} import`);
  }

  const sectionIds = Array.from(source.matchAll(/<h2 id="([a-z0-9-]+)">/g), ([, id]) => id);

  for (const sectionId of requiredSectionIds) {
    if (!sectionIds.includes(sectionId)) {
      errors.push(`missing required section id: ${sectionId}`);
    }
  }

  const duplicateSectionIds = sectionIds.filter((id, index) => sectionIds.indexOf(id) !== index);

  if (duplicateSectionIds.length > 0) {
    errors.push(`duplicate section ids: ${[...new Set(duplicateSectionIds)].join(", ")}`);
  }

  if (
    !/<Canvas\s+of=\{[A-Za-z0-9]+Stories\.[A-Za-z0-9]+\}\s+sourceState="shown"\s*\/>/.test(source)
  ) {
    errors.push("expected at least one source-visible Canvas block");
  }

  if (!/<Controls\s+of=\{[A-Za-z0-9]+Stories\.[A-Za-z0-9]+\}\s*\/>/.test(source)) {
    errors.push("expected a Controls block");
  }

  const storyReferences = Array.from(
    source.matchAll(/<(?:Canvas|Controls)\s+of=\{[A-Za-z0-9]+Stories\.([A-Za-z0-9]+)\}/g),
    ([, storyName]) => storyName,
  );

  for (const storyName of storyReferences) {
    if (!storySource.includes(`export const ${storyName}`)) {
      errors.push(`references missing story export: ${storyName}`);
    }
  }

  if (!storySource.includes(`title: "${contract.title}"`)) {
    errors.push(`expected Storybook title: ${contract.title}`);
  }

  for (const tokenName of source.matchAll(/--dds-[a-z0-9-]+/g)) {
    const token = tokenName[0];

    if (token.endsWith("-")) {
      continue;
    }

    if (!tokenNames.has(token)) {
      errors.push(`references undefined token: ${token}`);
    }
  }

  return errors;
}

function getStorybookErrors(contract) {
  const index = JSON.parse(readFileSync(getPath(storybookIndexPath), "utf8"));
  const entries = Object.values(index.entries);
  const document = entries.find(
    (entry) =>
      entry.type === "docs" &&
      entry.title === contract.title &&
      entry.tags?.includes("attached-mdx"),
  );

  if (!document) {
    return [`missing attached Docs entry for ${contract.title}`];
  }

  if (document.storiesImports?.length !== 1) {
    return [`expected one story import in Docs entry for ${contract.title}`];
  }

  return [];
}

function getNavigationErrors() {
  const errors = [];
  const publicIndexSource = readFileSync(getPath(publicIndexPath), "utf8");
  const previewConfigSource = readFileSync(getPath(previewConfigPath), "utf8");

  for (const { component } of componentContracts) {
    if (!publicIndexSource.includes(`export { ${component} } from "./components/${component}";`)) {
      errors.push(`missing public export: ${component}`);
    }
  }

  let previousPosition = -1;

  for (const label of sidebarOrder) {
    const position = previewConfigSource.indexOf(`"${label}"`, previousPosition + 1);

    if (position === -1) {
      errors.push(`missing sidebar item: ${label}`);
      continue;
    }

    previousPosition = position;
  }

  return errors;
}

const componentFiles = getFiles(componentDirectory).filter((path) => path.endsWith(".docs.mdx"));
const expectedDocumentPaths = new Set(
  componentContracts.map(({ documentPath }) => getPath(documentPath)),
);
const unexpectedDocumentPaths = componentFiles.filter((path) => !expectedDocumentPaths.has(path));
const missingDocumentPaths = [...expectedDocumentPaths].filter(
  (path) => !componentFiles.includes(path),
);

const errors = [];

if (unexpectedDocumentPaths.length > 0) {
  errors.push(`unexpected Docs files:\n- ${unexpectedDocumentPaths.join("\n- ")}`);
}

if (missingDocumentPaths.length > 0) {
  errors.push(`missing Docs files:\n- ${missingDocumentPaths.join("\n- ")}`);
}

if (!existsSync(getPath(tokenCssPath))) {
  errors.push("tokens CSS is missing. Run npm run build -w @ddoni-ds/tokens first.");
}

if (!existsSync(getPath(storybookIndexPath))) {
  errors.push("Storybook index is missing. Run npm run build-storybook first.");
}

if (!existsSync(getPath(publicIndexPath))) {
  errors.push("UI public index is missing.");
}

if (!existsSync(getPath(previewConfigPath))) {
  errors.push("Storybook preview configuration is missing.");
}

if (errors.length === 0) {
  const tokenNames = new Set(
    readFileSync(getPath(tokenCssPath), "utf8").match(/--dds-[a-z0-9-]+/g) ?? [],
  );
  const navigationErrors = getNavigationErrors();

  if (navigationErrors.length > 0) {
    errors.push(`Navigation and public API\n- ${navigationErrors.join("\n- ")}`);
  }

  for (const contract of componentContracts) {
    const documentErrors = getDocumentContractErrors(contract, tokenNames);
    const storybookErrors = getStorybookErrors(contract);

    if (documentErrors.length > 0 || storybookErrors.length > 0) {
      errors.push(
        `${contract.component}\n- ${[...documentErrors, ...storybookErrors].join("\n- ")}`,
      );
      continue;
    }

    process.stdout.write(`PASS ${contract.title}\n`);
  }
}

if (errors.length > 0) {
  throw new Error(`Storybook documentation contract failed.\n- ${errors.join("\n- ")}`);
}

process.stdout.write(
  `All ${componentContracts.length} Storybook documentation contracts passed.\n`,
);
