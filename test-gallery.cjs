const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const image = { style: {}, setAttribute(name, value) { this[name] = value; } };
const context = vm.createContext({ document: { getElementById(id) { assert.equal(id, "image"); return image; } } });
vm.runInContext(fs.readFileSync(`${__dirname}/gallery.js`, "utf8"), context);
const html = fs.readFileSync(`${__dirname}/index.html`, "utf8");
const pictures = [...html.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*alt="([^"]+)"[^>]*>/g)];
assert.equal(pictures.length, 3);
for (const [tag, src, alt] of pictures) {
  assert.ok(fs.statSync(`${__dirname}/${src}`).size > 1000, `${src} must contain a photograph`);
  for (const handler of ['onmouseover="upDate(this)"', 'onmouseleave="undo()"', 'onfocus="upDate(this)"', 'onblur="undo()"']) assert.ok(tag.includes(handler));
  context.upDate({ src, alt });
  assert.equal(image.textContent, alt);
  assert.equal(image.style.backgroundImage, `url("${src}")`);
  assert.equal(image["aria-label"], alt);
  context.undo();
  assert.equal(image.textContent, "Hover over an image below to display here.");
  assert.equal(image.style.backgroundImage, "url('')");
  assert.equal(image["aria-label"], "Photo preview");
}
console.log("PASS: all three photos update and reset the preview; mouse and keyboard handlers are wired.");
