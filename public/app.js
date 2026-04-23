const localePickers = document.querySelectorAll("[data-locale-picker]");

document.addEventListener("click", (event) => {
  for (const picker of localePickers) {
    if (!picker.contains(event.target)) {
      picker.removeAttribute("open");
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  for (const picker of localePickers) {
    picker.removeAttribute("open");
  }
});

const shareButtons = document.querySelectorAll("[data-share]");

for (const button of shareButtons) {
  button.addEventListener("click", async () => {
    const rawUrl = button.dataset.shareUrl || window.location.href;
    const shareUrl = new URL(rawUrl, window.location.origin).toString();
    const shareTitle = button.dataset.shareTitle || document.title;
    const originalLabel = button.dataset.defaultLabel || button.textContent;
    const copiedLabel = button.dataset.copiedLabel || "Link copied";

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        button.textContent = copiedLabel;
        window.setTimeout(() => {
          button.textContent = originalLabel;
        }, 1800);
      }
    } catch {
      button.textContent = originalLabel;
    }
  });
}
