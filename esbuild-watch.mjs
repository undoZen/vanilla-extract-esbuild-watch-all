import chokidar from "chokidar";
import esbuild from "esbuild";
import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";
import { globbySync } from "globby";

const filesToWatch = globbySync("./src/**/*.css.ts")
console.log('filesToWatch', filesToWatch)

const builder = await esbuild.build({
  color: true,
  entryPoints: filesToWatch,
  plugins: [vanillaExtractPlugin()],
  outbase: 'src',
  outdir: 'src',
  minify: false,
  bundle: true,
  sourcemap: false,
  logLevel: "error",
  incremental: true,
});

chokidar
  .watch("src/**/*.css.ts", { awaitWriteFinish: true, ignoreInitial: true })
  .on("all", (eventName, path) => {
    console.log(`${path} ${eventName}`);
    return builder.rebuild();
  });
