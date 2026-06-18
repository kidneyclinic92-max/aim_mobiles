const { spawnSync } = require("node:child_process");
const path = require("node:path");
const nextBin = require("./next-bin");

const root = path.join(__dirname, "..");

console.log("Running Next.js production build with webpack...");
console.log("Project root:", root);

const result = spawnSync(
  process.execPath,
  [nextBin, "build", "--webpack"],
  {
    stdio: "inherit",
    cwd: root,
    env: {
      ...process.env,
      NODE_ENV: "production",
    },
  }
);

process.exit(result.status ?? 1);
