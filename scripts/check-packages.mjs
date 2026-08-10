import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const rootDirectory = fileURLToPath(new URL("..", import.meta.url));
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const packageContracts = [
  {
    workspace: "@ddoni-ds/tokens",
    build: true,
    requiredFiles: ["package.json", "README.md", "dist/tokens.css"],
    requiredPrefixes: [],
  },
  {
    workspace: "@ddoni-ds/ui",
    build: true,
    requiredFiles: [
      "package.json",
      "README.md",
      "dist/index.js",
      "dist/index.cjs",
      "dist/styles.css",
      "dist/types/index.d.ts",
      "dist/types/index.d.ts.map",
    ],
    requiredPrefixes: ["dist/types/components/"],
  },
  {
    workspace: "@ddoni-ds/tailwind",
    build: false,
    requiredFiles: ["package.json", "README.md", "theme.css"],
    requiredPrefixes: [],
  },
];

const forbiddenFilePatterns = [
  { label: "source", pattern: /(^|\/)src\// },
  {
    label: "test",
    pattern: /(^|\/)(?:tests?(?:\/|$)|[^/]*\.(?:test|spec)\.[^/]+$)/i,
  },
  {
    label: "story",
    pattern: /(^|\/)(?:stories(?:\/|$)|[^/]*\.stories\.[^/]+$)/i,
  },
  {
    label: "local config",
    pattern: /(^|\/)(?:eslint|prettier|stylelint|tsconfig|vite|vitest)(?:\.[^/]+|config\.[^/]+)$/i,
  },
  { label: "coverage", pattern: /(^|\/)coverage(?:\/|$)/ },
  { label: "environment file", pattern: /(^|\/)\.env(?:\.|$)/ },
  { label: "npm credentials", pattern: /(^|\/)\.npmrc$/ },
  { label: "npm token", pattern: /(^|\/)(?:npm-token|npm_token)(?:\.|$)/i },
];

function runNpm(args) {
  execFileSync(npmCommand, args, {
    cwd: rootDirectory,
    stdio: "inherit",
  });
}

function getPackManifest(workspace) {
  const output = execFileSync(npmCommand, ["pack", "--dry-run", "--json", "-w", workspace], {
    cwd: rootDirectory,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  });
  const manifests = JSON.parse(output);

  if (!Array.isArray(manifests) || manifests.length !== 1) {
    throw new Error(`${workspace}: npm pack returned an unexpected manifest.`);
  }

  const [manifest] = manifests;

  if (!manifest || !Array.isArray(manifest.files)) {
    throw new Error(`${workspace}: npm pack manifest does not contain a file list.`);
  }

  return manifest.files.map((file) => file.path);
}

function assertPackageContract(contract, files) {
  const fileSet = new Set(files);
  const errors = [];

  for (const requiredFile of contract.requiredFiles) {
    if (!fileSet.has(requiredFile)) {
      errors.push(`missing required file: ${requiredFile}`);
    }
  }

  for (const requiredPrefix of contract.requiredPrefixes) {
    if (!files.some((file) => file.startsWith(requiredPrefix))) {
      errors.push(`missing required files under: ${requiredPrefix}`);
    }
  }

  for (const file of files) {
    for (const forbidden of forbiddenFilePatterns) {
      if (forbidden.pattern.test(file)) {
        errors.push(`contains forbidden ${forbidden.label} file: ${file}`);
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(`${contract.workspace}\n- ${errors.join("\n- ")}`);
  }

  process.stdout.write(`PASS ${contract.workspace}: ${files.length} files\n`);
}

for (const contract of packageContracts) {
  if (contract.build) {
    runNpm(["run", "build", "-w", contract.workspace]);
  }
}

runNpm(["run", "test:smoke", "-w", "@ddoni-ds/tailwind"]);

for (const contract of packageContracts) {
  assertPackageContract(contract, getPackManifest(contract.workspace));
}

process.stdout.write("All package tarball contracts passed.\n");
