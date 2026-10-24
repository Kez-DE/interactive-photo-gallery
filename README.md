# Nature in Focus — Interactive Photo Gallery

An accessible six-image JavaScript gallery: hover over a thumbnail to display its photograph and alternative text in the main preview. Leaving the thumbnail restores the original text and empty background. Keyboard focus and touch selection are also supported.

**Live webpage:** https://kez-de.github.io/interactive-photo-gallery/

## Assignment functions

- `upDate(previewPic)` reads the image's `alt` and `src`, updates the text of `#image`, and sets its background image.
- `addTabFocus()` runs on body load, loops over all six figures, adds `tabindex="0"`, and logs confirmation in the console.
- Each figure keeps `onmouseover` and `onmouseleave`, and adds equivalent `onfocus` and `onblur` handlers.
- `undo()` restores `background-image: url('')` and the exact text `Hover over an image below to display here.`

Open `index.html` in a browser. No dependencies or build step are required. Source files are `index.html`, `style.css`, and `gallery.js`.

## Verify

Run `node test-gallery.cjs`. In a browser, hover over each of the six figures, then move the pointer away. Check that the preview image and caption appear and reset. Repeat using Tab to focus and leave each thumbnail.

## Photos

Photographs are downloaded locally from Unsplash so the gallery does not depend on third-party image requests at runtime:

- [Mountains](https://images.unsplash.com/photo-1464822759023-fed622ff2c3b).
- [Forest](https://images.unsplash.com/photo-1448375240586-882707db888b).
- [Coast](https://images.unsplash.com/photo-1507525428034-b723cf961d3e).
- [Lake](https://images.unsplash.com/photo-1470770841072-f978cf4d019e).
- [Desert](https://images.unsplash.com/photo-1509316785289-025f5b846b35).
- [Waterfall](https://images.unsplash.com/photo-1432405972618-c60b0225b8f9).

Photo use is covered by the [Unsplash License](https://unsplash.com/license).

## Validation and peer review

- W3C Nu HTML validator: no errors or warnings on 2026-10-24.
- JavaScript checks: `node test-gallery.cjs` verifies all six photographs, preview updates and resets, event handlers, and dynamically added tabindex values.
- [Validate the live page with W3C](https://validator.w3.org/nu/?doc=https%3A%2F%2Fkez-de.github.io%2Finteractive-photo-gallery%2F).
- [Evaluate the live page with WAVE](https://wave.webaim.org/report#/https://kez-de.github.io/interactive-photo-gallery/).

Four common mistakes to check during peer review:

1. Missing `<title>` in the document head.
2. Missing or unhelpful alternative text on a photograph.
3. Skipped heading levels, such as moving directly from h1 to h3.
4. Mouse-only events, or failing to add tabindex on load so keyboard users cannot focus each figure.

These are review examples, not claims that a peer has reviewed this project. Course peer reviews must be completed separately.
