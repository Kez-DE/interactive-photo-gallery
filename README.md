# Nature in Focus — Interactive Photo Gallery

A JavaScript DOM assignment: hover over a thumbnail to display its photograph and alternative text in the main preview. Leaving the thumbnail restores the original text and empty background. Keyboard focus and touch selection are also supported.

**Live webpage:** https://kez-de.github.io/interactive-photo-gallery/

## Assignment functions

- `upDate(previewPic)` reads the image's `alt` and `src`, updates the text of `#image`, and sets its background image.
- `undo()` restores `background-image: url('')` and the exact text `Hover over an image below to display here.`

Open `index.html` in a browser. No dependencies or build step are required. Source files are `index.html`, `style.css`, and `gallery.js`.

## Verify

Run `node test-gallery.cjs`. In a browser, hover over each of the three thumbnails, then move the pointer away. Check that the preview image and caption appear and reset. Repeat using Tab to focus and leave each thumbnail.

## Photos

Photographs are downloaded locally from Unsplash so the gallery does not depend on third-party image requests at runtime:

- [Mountains](https://images.unsplash.com/photo-1464822759023-fed622ff2c3b).
- [Forest](https://images.unsplash.com/photo-1448375240586-882707db888b).
- [Coast](https://images.unsplash.com/photo-1507525428034-b723cf961d3e).

Photo use is covered by the [Unsplash License](https://unsplash.com/license).
