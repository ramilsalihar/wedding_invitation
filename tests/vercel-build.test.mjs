import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("uses the standard Next.js build expected by Vercel", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.equal(packageJson.scripts.dev, "next dev");
  assert.equal(packageJson.scripts.build, "next build");
  assert.equal(packageJson.scripts.start, "next start");
  assert.equal(packageJson.dependencies.vinext, undefined);
  assert.equal(packageJson.devDependencies.vinext, undefined);
  assert.equal(packageJson.devDependencies.wrangler, undefined);
});

test("production build contains the statically generated root route", async () => {
  const routeManifest = JSON.parse(
    await readFile(new URL("../.next/app-path-routes-manifest.json", import.meta.url), "utf8"),
  );

  assert.equal(routeManifest["/page"], "/", "expected the production build to contain /");
  await access(new URL("../.next/server/app/index.html", import.meta.url));
});
