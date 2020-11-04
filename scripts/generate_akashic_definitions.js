// akashic-engine の型定義を生成するスクリプト。
// usage node generate_akashic_definitions <akashic_engine_version>
// e.g. node generate_akashic_definitions 3.0.1

const { execSync } = require("child_process");
const path = require("path");
const dts = require("dts-bundle");
const fs = require("fs-extra");

const aksVersion = process.argv[2];

try {
  execSync(`npm install @akashic/akashic-engine@${aksVersion} --no-save`);

  (() => {
    const output = path.join(__dirname, "..", "public", "types", aksVersion, "akashic-engine.d.ts");
    fs.removeSync(output);

    dts.bundle({
      name: "g",
      main: "node_modules/@akashic/akashic-engine/index.runtime.d.ts",
      out: output,
      headerText: `v${aksVersion}\n\n`
    });

    // NOTE: グローバル変数 `g` として解決するため無理やり namespace で定義し直す
    let str = fs.readFileSync(output, { encoding: "utf-8" });
    str = str.replace(/declare module 'g'/, "declare namespace g");
    fs.writeFileSync(output, str);

    ["@akashic/playlog", "@akashic/trigger", "@akashic/pdi-types"].forEach(name => {
      const ver = require(path.join(__dirname, "..", `./node_modules/${name}/package.json`)).version;
      dts.bundle({
        name: name,
        main: `node_modules/${name}/lib/index.d.ts`,
        out: path.join(__dirname, "..", "public", "types", aksVersion, `${name.split("/")[1]}.d.ts`),
        headerText: `v${ver}\n\n`
      });
    });
  })();

  (() => {
    [
      "@akashic-extension/akashic-timeline",
      "@akashic-extension/akashic-label",
      "@akashic-extension/akashic-box2d"
    ].forEach(name => {
      execSync(`npm install ${name}@next --no-save`);
      const ver = require(path.join(__dirname, "..", `node_modules/${name}/package.json`)).version;
      dts.bundle({
        name: name,
        main: `node_modules/${name}/lib/index.d.ts`,
        out: path.join(__dirname, "..", "public", "types", "extra", `${name.split("/")[1]}.d.ts`),
        headerText: `v${ver}\n\n`
      });
    });
  })();
} catch (e) {
  console.error(e);
  process.exit(1);
}
