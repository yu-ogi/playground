const { execSync } = require("child_process");
const path = require("path");
const axios = require("axios");
const fs = require("fs-extra");

const release_url = "https://github.com/akashic-games/akashic-engine-standalone-release-action/releases/download/%TAG%/akashic-engine-standalone-%VERSION%.js";

(async () => {
  try {
    // NOTE: @akashic/akashic-engine@3.0.0-beta.31 '3.0.0-beta.31'
    const ret = execSync(`npm view "@akashic/akashic-engine@>=3.0.0-beta.31" version`, { encoding: "utf-8" });
    // NOTE: ["3.0.0-beta.31", "3.0.0-beta.32", ..] -> [.., "3.0.0-beta.32", "3.0.0-beta.31"]
    const versions = ret.match(/'(.+)'/g).map(v => v.slice(1, -1)).reverse();

    for (let i = 0; i < versions.length; i++) {
      const version = versions[i];
      const output = path.join(__dirname, "..", "public", "engine", `akashic-engine-standalone-${version}.js`);
      if (fs.existsSync(output)) continue;
      const url = release_url.replace("%TAG%", encodeURIComponent(`akashic-engine@${version}`)).replace("%VERSION%", version);
      const js = await axios(url);
      fs.writeFileSync(output, js.data);
    }

    const versionsJSONPath = path.join(__dirname, "..", "src", "constants", "versions.json");
    const versionsJSON = JSON.parse(fs.readFileSync(versionsJSONPath, "utf-8"));
    versionsJSON.akashicEngineVersions = versions.map(v => ({
      version: v,
      name: `akashic-engine-standalone-${v}.js`
    }));
    fs.writeFileSync(versionsJSONPath, JSON.stringify(versionsJSON, undefined, 2));
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
