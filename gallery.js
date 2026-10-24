function upDate(previewPic) {
  const image = document.getElementById("image");
  image.textContent = previewPic.alt;
  image.style.backgroundImage = `url("${previewPic.src}")`;
  image.setAttribute("aria-label", previewPic.alt);
}

function undo() {
  const image = document.getElementById("image");
  image.style.backgroundImage = "url('')";
  image.textContent = "Hover over an image below to display here.";
  image.setAttribute("aria-label", "Photo preview");
}
