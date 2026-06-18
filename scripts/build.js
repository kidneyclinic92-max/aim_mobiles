const { spawnSync } = require("node:child_process");
const path = require("node:path");
const nextBin = require("./next-bin");

const root = path.join(__dirname, "..");
const result = spawnSync(process.execPath, [nextBin, "build", "--webpack"], {
  stdio: "inherit",
  cwd: root,
  env: process.env,
});

process.exit(result.status ?? 1);
