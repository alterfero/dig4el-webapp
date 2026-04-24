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

function normalizeForSearch(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const languageFilter = document.querySelector("[data-language-filter]");

if (languageFilter) {
  const languageCards = [...document.querySelectorAll("[data-language-card]")];
  const emptyState = document.querySelector("[data-language-empty]");

  const applyLanguageFilter = () => {
    const query = normalizeForSearch(languageFilter.value);
    let visibleCount = 0;

    for (const card of languageCards) {
      const languageName = normalizeForSearch(card.dataset.languageName);
      const matches = !query || languageName.includes(query);

      card.hidden = !matches;

      if (matches) {
        visibleCount += 1;
      }
    }

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  };

  languageFilter.addEventListener("input", applyLanguageFilter);
  applyLanguageFilter();
}

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
