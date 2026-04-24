const SMALL_CAPS_EQUIVALENTS = Object.freeze({
  "\u01eb": "q",
  "\u0262": "g",
  "\u026a": "i",
  "\u0274": "n",
  "\u0280": "r",
  "\u028f": "y",
  "\u0299": "b",
  "\u029c": "h",
  "\u029f": "l",
  "\ua730": "f",
  "\ua731": "s",
  "\u1d00": "a",
  "\u1d04": "c",
  "\u1d05": "d",
  "\u1d07": "e",
  "\u1d0a": "j",
  "\u1d0b": "k",
  "\u1d0d": "m",
  "\u1d0f": "o",
  "\u1d18": "p",
  "\u1d1b": "t",
  "\u1d1c": "u",
  "\u1d20": "v",
  "\u1d21": "w",
  "\u1d22": "z",
});

function foldSmallCaps(value) {
  return Array.from(String(value ?? ""), (char) => SMALL_CAPS_EQUIVALENTS[char] ?? char).join("");
}

export function normalizeForSearch(value, locale = "en") {
  return foldSmallCaps(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase(locale)
    .replace(/\s+/g, " ")
    .trim();
}

if (typeof document !== "undefined") {
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

  const languageFilter = document.querySelector("[data-language-filter]");

  if (languageFilter) {
    const searchLocale = document.documentElement.lang || "en";
    const languageCards = [...document.querySelectorAll("[data-language-card]")].map((card) => ({
      element: card,
      searchKey: normalizeForSearch(
        card.querySelector("h2")?.textContent || card.dataset.languageName || card.textContent,
        searchLocale,
      ),
    }));
    const emptyState = document.querySelector("[data-language-empty]");

    const setVisibility = (element, isVisible) => {
      element.hidden = !isVisible;
      element.style.display = isVisible ? "" : "none";
    };

    const applyLanguageFilter = () => {
      const query = normalizeForSearch(languageFilter.value, searchLocale);
      let visibleCount = 0;

      for (const card of languageCards) {
        const matches = !query || card.searchKey.includes(query);
        setVisibility(card.element, matches);

        if (matches) {
          visibleCount += 1;
        }
      }

      if (emptyState) {
        setVisibility(emptyState, visibleCount === 0);
      }
    };

    languageFilter.addEventListener("input", applyLanguageFilter);
    languageFilter.addEventListener("change", applyLanguageFilter);
    languageFilter.addEventListener("search", applyLanguageFilter);
    languageFilter.addEventListener("keyup", applyLanguageFilter);
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
}
