const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const image = { style: {}, setAttribute(name, value) { this[name] = value; } };
const figures = Array.from({ length: 6 }, () => ({ setAttribute(name, value) { this[name] = value; } }));
const logs = [];
const context = vm.createContext({
  console: { log(message) { logs.push(message); } },
  document: {
    getElementById(id) { assert.equal(id, "image"); return image; },
    querySelectorAll(selector) { assert.equal(selector, ".gallery figure"); return figures; }
  }
});
vm.runInContext(fs.readFileSync(`${__dirname}/gallery.js`, "utf8"), context);
const html = fs.readFileSync(`${__dirname}/index.html`, "utf8");
const pictures = [...html.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*alt="([^"]+)"[^>]*>/g)];
assert.equal(pictures.length, 6);
assert.ok(html.includes('onload="addTabFocus()"'));
assert.equal((html.match(/<figure\b/g) || []).length, 6);
assert.ok(!html.includes('tabindex='), "Focus must be added dynamically");
for (const [tag] of html.matchAll(/<figure\b[^>]*>/g)) {
  for (const handler of ["onmouseover", "onmouseleave", "onfocus", "onblur"]) assert.ok(tag.includes(handler + "="));
}
context.addTabFocus();
assert.ok(figures.every(figure => figure.tabindex === "0"));
assert.equal(logs.length, 1);
assert.ok(logs[0].includes("6 figures"));
for (const [tag, src, alt] of pictures) {
  assert.ok(fs.statSync(`${__dirname}/${src}`).size > 1000, `${src} must contain a photograph`);
  context.upDate({ src, alt });
  assert.equal(image.textContent, alt);
  assert.equal(image.style.backgroundImage, `url("${src}")`);
  assert.equal(image["aria-label"], alt);
  context.undo();
  assert.equal(image.textContent, "Hover over an image below to display here.");
  assert.equal(image.style.backgroundImage, "url('')");
  assert.equal(image["aria-label"], "Photo preview");
}
console.log("PASS: all six photos update and reset the preview; load adds keyboard focus; mouse and keyboard handlers are wired.");
