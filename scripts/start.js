const { spawnSync } = require("node:child_process");

const port = process.env.PORT || "3000";

const result = spawnSync(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["next", "start", "-p", port],
  { stdio: "inherit" }
);

process.exit(result.status ?? 1);
