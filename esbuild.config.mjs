import { build, context } from "esbuild";
import { cpSync } from "fs";

const dev = process.argv.includes("--dev");

const opts = {
  entryPoints: ["src/app.jsx"],
  bundle: true,
  outdir: "build/site",
  jsx: "automatic",
  jsxImportSource: "preact",
  minify: !dev,
  sourcemap: dev,
};

cpSync("public", "build/site", { recursive: true });

if (dev) {
  const ctx = await context(opts);
  await ctx.watch();
  const { port } = await ctx.serve({ servedir: "build/site", port: 8080 });
  console.log(`Dev server: http://localhost:${port}`);
} else {
  await build(opts);
}
