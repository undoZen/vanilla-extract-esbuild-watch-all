#!/usr/bin/env node

import chokidar from "chokidar";
import esbuild from "esbuild";
import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";
import { globbySync } from "globby";

const newBuild = () => {
  const filesToWatch = globbySync("./src/**/*.css.ts")
  console.log('watching files:', filesToWatch)
  return esbuild.build({
  color: true,
  entryPoints: filesToWatch,
    plugins: [vanillaExtractPlugin()],
    outbase: 'src',
    outdir: 'src',
    format: 'esm',
    minify: false,
    bundle: true,
    sourcemap: false,
    logLevel: "error",
    incremental: true,
  });
}
let builder = await newBuild()

chokidar
  .watch("src/**/*.css.ts", { awaitWriteFinish: true, ignoreInitial: true })
  .on("all", async (eventName, path) => {
    console.log(`${path} ${eventName}`);
    if (eventName === 'change') {
      return builder.rebuild()
    }
    if ([ 'add', 'unlink' ].includes(eventName)) {
      builder = await newBuild()
      return builder.rebuild();
    }
  });
