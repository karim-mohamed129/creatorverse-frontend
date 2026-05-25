"use strict";

const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const trackedExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".css",
  ".scss",
  ".sass",
  ".json",
  ".md",
  ".html",
]);

const ignoredDirNames = new Set([
  ".git",
  ".expo",
  "node_modules",
  "dist",
  "build",
  ".next",
]);

const watchedDirectories = [
  "app",
  "components",
  "constants",
  "hooks",
  "scripts",
].map((dirName) => path.join(rootDir, dirName));

const watchedRootFiles = [
  "package.json",
  "app.json",
  "tsconfig.json",
  "index.css",
  ".gitignore",
].map((fileName) => path.join(rootDir, fileName));

const fileCache = new Map();
const debounceTimers = new Map();
const scanIntervalMs = 700;

function isBackupFile(filePath) {
  const parsed = path.parse(filePath);
  return parsed.name.endsWith("_old");
}

function shouldTrackFile(filePath) {
  const relativePath = path.relative(rootDir, filePath);

  if (!relativePath || relativePath.startsWith("..")) {
    return false;
  }

  const parts = relativePath.split(path.sep);
  if (parts.some((part) => ignoredDirNames.has(part))) {
    return false;
  }

  if (isBackupFile(filePath)) {
    return false;
  }

  return trackedExtensions.has(path.extname(filePath).toLowerCase());
}

function getBackupPath(filePath) {
  const parsed = path.parse(filePath);
  return path.join(parsed.dir, `${parsed.name}_old${parsed.ext}`);
}

function readFileIfTracked(filePath) {
  if (!shouldTrackFile(filePath)) {
    return null;
  }

  try {
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) {
      return null;
    }

    return fs.readFileSync(filePath);
  } catch {
    return null;
  }
}

function snapshotDirectory(directoryPath) {
  let entries = [];

  try {
    entries = fs.readdirSync(directoryPath, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirNames.has(entry.name)) {
        snapshotDirectory(fullPath);
      }
      continue;
    }

    const fileContents = readFileIfTracked(fullPath);
    if (fileContents) {
      fileCache.set(fullPath, fileContents);
    }
  }
}

function snapshotRootFiles() {
  for (const filePath of watchedRootFiles) {
    const fileContents = readFileIfTracked(filePath);
    if (fileContents) {
      fileCache.set(filePath, fileContents);
    }
  }
}

function backupPreviousVersion(filePath) {
  const previousContents = fileCache.get(filePath);
  const latestContents = readFileIfTracked(filePath);

  if (!latestContents) {
    fileCache.delete(filePath);
    return;
  }

  if (!previousContents) {
    fileCache.set(filePath, latestContents);
    return;
  }

  if (Buffer.compare(previousContents, latestContents) === 0) {
    return;
  }

  const backupPath = getBackupPath(filePath);
  fs.writeFileSync(backupPath, previousContents);
  fileCache.set(filePath, latestContents);

  console.log(
    `[backup] ${path.relative(rootDir, filePath)} -> ${path.relative(rootDir, backupPath)}`
  );
}

function queueBackup(filePath) {
  if (!filePath || !shouldTrackFile(filePath)) {
    return;
  }

  const existingTimer = debounceTimers.get(filePath);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  const timer = setTimeout(() => {
    debounceTimers.delete(filePath);
    backupPreviousVersion(filePath);
  }, 150);

  debounceTimers.set(filePath, timer);
}

function scanDirectoryForChanges(directoryPath) {
  let entries = [];

  try {
    entries = fs.readdirSync(directoryPath, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirNames.has(entry.name)) {
        scanDirectoryForChanges(fullPath);
      }
      continue;
    }

    queueBackup(fullPath);
  }
}

for (const directoryPath of watchedDirectories) {
  if (fs.existsSync(directoryPath)) {
    snapshotDirectory(directoryPath);
  }
}

snapshotRootFiles();

const intervalId = setInterval(() => {
  for (const directoryPath of watchedDirectories) {
    if (fs.existsSync(directoryPath)) {
      scanDirectoryForChanges(directoryPath);
    }
  }

  for (const filePath of watchedRootFiles) {
    if (fs.existsSync(filePath)) {
      queueBackup(filePath);
    }
  }
}, scanIntervalMs);

process.on("SIGINT", () => {
  clearInterval(intervalId);

  console.log("\n[backup] watcher stopped");
  process.exit(0);
});

console.log("[backup] polling app, components, scripts, and root config files...");
