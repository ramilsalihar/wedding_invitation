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

test("uses a bundled script font with Cyrillic glyphs", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

  assert.match(layout, /Marck_Script/);
  assert.match(layout, /subsets:\s*\["cyrillic",\s*"latin"\]/);
});

test("the first heart interaction opens independently from audio playback", async () => {
  const invitation = await readFile(new URL("../app/Invitation.tsx", import.meta.url), "utf8");

  assert.doesNotMatch(invitation, /document\.addEventListener\("pointerdown"/);
  assert.doesNotMatch(invitation, /<audio[^>]+autoPlay/);
  assert.doesNotMatch(invitation, /className="heart-button"[^>]+onPointerDown=/);
  assert.match(
    invitation,
    /className="heart-button"[^>]+onClick=\{openInvitation\}/,
  );
  assert.match(
    invitation,
    /function openInvitation\(\) \{\s*setCoverOpen\(true\);\s*void startMusic\(\);\s*\}/,
  );
});
