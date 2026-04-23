const defaultLocale = "en";

const localeMetadata = {
  en: { code: "en", label: "English" },
  fr: { code: "fr", label: "Français" },
  es: { code: "es", label: "Español" },
  de: { code: "de", label: "Deutsch" },
  ru: { code: "ru", label: "Русский" },
  ja: { code: "ja", label: "日本語" },
};

function countLabel(locale, count, forms) {
  const rule = new Intl.PluralRules(locale).select(count);
  const word = forms[rule] ?? forms.other;
  return `${count} ${word}`;
}

const messages = {
  en: {
    siteName: "DIG4EL Lessons",
    siteTagline: "Lightweight grammar reading on any device",
    metaDescription:
      "Browse DIG4EL grammar lessons in a lightweight, mobile-first web interface.",
    skipToContent: "Skip to content",
    navHome: "Home",
    navLanguages: "Languages",
    localeLabel: "Interface language",
    localeApply: "Apply",
    languageAvailability: (count) => `${countLabel("en", count, { one: "lesson", other: "lessons" })} available`,
    browseLanguageDescription: (languageName) => `Browse ${languageName} lessons.`,
    chooseLanguage: "Choose a language",
    availableLessonCollections: "Available lesson collections",
    aboutDig4el: "About DIG4EL",
    aboutTitle: "A lightweight reading surface for structured lesson data",
    aboutBody1:
      "This site turns DIG4EL lesson JSON into pages that are pleasant to read on a phone, easy to share, and direct to navigate.",
    aboutBody2:
      "The interface is intentionally minimal: a language landing page, a lesson list, a focused reading view, and on-demand PDF export when someone needs an offline copy.",
    whyDesign: "Why this design?",
    designReasons: [
      "Small payloads and mostly server-rendered HTML",
      "Simple URLs for each language and lesson",
      "PDFs generated only when requested",
      "Automatic lesson discovery from folders",
    ],
    noLessonsFoundYet: "No lessons found yet",
    addJsonFiles:
      "Add JSON lesson files inside generated_lessons/<Language>/ and they will appear here automatically.",
    browseLessons: "Browse lessons",
    languageCardDescription: (languageName) =>
      `Open the current library of ${languageName} lessons and keep reading on the same clean, phone-friendly layout.`,
    noJsonLessons: "No JSON lessons in this language yet",
    noJsonLessonsDesc:
      "This language folder exists, but there are no readable JSON lesson files to show.",
    openLesson: "Open lesson",
    lessonSummaryFallback:
      "Open this lesson to read the introduction, section-by-section explanations, and practice drills.",
    example: "Example",
    target: "Target",
    meaning: "Meaning",
    focus: "Focus",
    practice: "Practice",
    translationDrills: "Translation drills",
    sourceTextMissing: "Source text not provided",
    targetTextMissing: "Target text not provided",
    references: "References",
    lessonSources: "Lesson sources",
    languageLibrary: "Language library",
    languageHeroText:
      "Pick a lesson and read it in a distraction-light layout designed for mobile devices first.",
    lessons: "Lessons",
    available: "available",
    readLessonFallback:
      "Read the lesson section by section, then review the drills below.",
    backToLessons: "Back to lessons",
    downloadPdf: "Download PDF",
    shareLesson: "Share lesson",
    linkCopied: "Link copied",
    wrapUp: "Wrap-up",
    keyTakeaway: "Key takeaway",
    returnHome: "Return home",
    notFound: "Not found",
    notFoundTitle: "That page is not here.",
    notFoundDescription:
      "The language or lesson link may be outdated, or the source file may have been removed.",
    serverError: "Server error",
    serverErrorTitle: "Something went wrong while loading the lesson.",
    serverErrorDescription:
      "Please try again in a moment. If the problem continues, check the server logs for the unreadable file.",
    footerLine1:
      "DIG4EL lessons are read directly from JSON files in generated_lessons. PDFs are generated on demand, so there is nothing extra to store.",
    footerLine2:
      "JSON files are listed automatically. Other file types are ignored for now.",
    dateNotProvided: "Date not provided",
    statusLesson: "Lesson",
    statusSketch: "Sketch",
    statusUnverified: "Unverified",
    lessonSectionFallback: "Lesson section",
    lessonCount: (count) => countLabel("en", count, { one: "lesson", other: "lessons" }),
    sectionCount: (count) => countLabel("en", count, { one: "section", other: "sections" }),
    drillCount: (count) => countLabel("en", count, { one: "drill", other: "drills" }),
    itemCount: (count) => countLabel("en", count, { one: "item", other: "items" }),
  },
  fr: {
    siteName: "Leçons DIG4EL",
    siteTagline: "Lecture grammaticale légère sur tout appareil",
    metaDescription:
      "Parcourez les leçons de grammaire DIG4EL dans une interface légère, pensée d'abord pour le mobile.",
    skipToContent: "Aller au contenu",
    navHome: "Accueil",
    navLanguages: "Langues",
    localeLabel: "Langue de l'interface",
    localeApply: "Appliquer",
    languageAvailability: (count) => `${countLabel("fr", count, { one: "leçon", other: "leçons" })} disponibles`,
    browseLanguageDescription: (languageName) => `Parcourir les leçons en ${languageName}.`,
    chooseLanguage: "Choisir une langue",
    availableLessonCollections: "Collections de leçons disponibles",
    aboutDig4el: "À propos de DIG4EL",
    aboutTitle: "Une interface de lecture légère pour des leçons structurées",
    aboutBody1:
      "Ce site transforme les leçons JSON de DIG4EL en pages agréables à lire sur téléphone, faciles à partager et directes à parcourir.",
    aboutBody2:
      "L'interface reste volontairement minimale : une page par langue, une liste de leçons, une lecture centrée sur le contenu et un export PDF à la demande.",
    whyDesign: "Pourquoi ce design ?",
    designReasons: [
      "Des pages légères et principalement rendues côté serveur",
      "Des URLs simples pour chaque langue et chaque leçon",
      "Des PDF générés uniquement quand on les demande",
      "Une détection automatique des leçons à partir des dossiers",
    ],
    noLessonsFoundYet: "Aucune leçon trouvée pour le moment",
    addJsonFiles:
      "Ajoutez des fichiers de leçon JSON dans generated_lessons/<Langue>/ et ils apparaîtront automatiquement ici.",
    browseLessons: "Voir les leçons",
    languageCardDescription: (languageName) =>
      `Ouvrez la bibliothèque actuelle des leçons en ${languageName} dans une mise en page claire et pensée pour le téléphone.`,
    noJsonLessons: "Aucune leçon JSON dans cette langue pour le moment",
    noJsonLessonsDesc:
      "Ce dossier de langue existe, mais aucun fichier JSON lisible n'est disponible à l'affichage.",
    openLesson: "Ouvrir la leçon",
    lessonSummaryFallback:
      "Ouvrez cette leçon pour lire l'introduction, les explications par section et les exercices de traduction.",
    example: "Exemple",
    target: "Langue cible",
    meaning: "Sens",
    focus: "Point clé",
    practice: "Pratique",
    translationDrills: "Exercices de traduction",
    sourceTextMissing: "Texte source non fourni",
    targetTextMissing: "Texte cible non fourni",
    references: "Références",
    lessonSources: "Sources de la leçon",
    languageLibrary: "Bibliothèque de langue",
    languageHeroText:
      "Choisissez une leçon et lisez-la dans une interface épurée, d'abord pensée pour le mobile.",
    lessons: "Leçons",
    available: "disponibles",
    readLessonFallback:
      "Lisez la leçon section par section, puis passez aux exercices ci-dessous.",
    backToLessons: "Retour aux leçons",
    downloadPdf: "Télécharger le PDF",
    shareLesson: "Partager la leçon",
    linkCopied: "Lien copié",
    wrapUp: "Récapitulatif",
    keyTakeaway: "À retenir",
    returnHome: "Retour à l'accueil",
    notFound: "Introuvable",
    notFoundTitle: "Cette page n'existe pas.",
    notFoundDescription:
      "Le lien vers la langue ou la leçon est peut-être obsolète, ou le fichier source a été supprimé.",
    serverError: "Erreur serveur",
    serverErrorTitle: "Un problème est survenu lors du chargement de la leçon.",
    serverErrorDescription:
      "Réessayez dans un instant. Si le problème persiste, consultez les journaux du serveur pour trouver le fichier illisible.",
    footerLine1:
      "Les leçons DIG4EL sont lues directement depuis les fichiers JSON de generated_lessons. Les PDF sont générés à la demande, sans stockage supplémentaire.",
    footerLine2:
      "Les fichiers JSON sont listés automatiquement. Les autres types de fichiers sont ignorés pour l'instant.",
    dateNotProvided: "Date non fournie",
    statusLesson: "Leçon",
    statusSketch: "Esquisse",
    statusUnverified: "Non vérifié",
    lessonSectionFallback: "Section de leçon",
    lessonCount: (count) => countLabel("fr", count, { one: "leçon", other: "leçons" }),
    sectionCount: (count) => countLabel("fr", count, { one: "section", other: "sections" }),
    drillCount: (count) => countLabel("fr", count, { one: "exercice", other: "exercices" }),
    itemCount: (count) => countLabel("fr", count, { one: "élément", other: "éléments" }),
  },
  es: {
    siteName: "Lecciones DIG4EL",
    siteTagline: "Lectura gramatical ligera en cualquier dispositivo",
    metaDescription:
      "Consulta las lecciones de gramática DIG4EL en una interfaz ligera y pensada primero para móviles.",
    skipToContent: "Ir al contenido",
    navHome: "Inicio",
    navLanguages: "Idiomas",
    localeLabel: "Idioma de la interfaz",
    localeApply: "Aplicar",
    languageAvailability: (count) => `${countLabel("es", count, { one: "lección", other: "lecciones" })} disponibles`,
    browseLanguageDescription: (languageName) => `Explorar lecciones en ${languageName}.`,
    chooseLanguage: "Elige un idioma",
    availableLessonCollections: "Colecciones de lecciones disponibles",
    aboutDig4el: "Sobre DIG4EL",
    aboutTitle: "Una superficie de lectura ligera para lecciones estructuradas",
    aboutBody1:
      "Este sitio convierte el JSON de las lecciones DIG4EL en páginas agradables de leer en el teléfono, fáciles de compartir y directas de recorrer.",
    aboutBody2:
      "La interfaz es deliberadamente mínima: una página por idioma, una lista de lecciones, una lectura centrada y exportación PDF bajo demanda.",
    whyDesign: "¿Por qué este diseño?",
    designReasons: [
      "Páginas pequeñas y mayormente renderizadas en el servidor",
      "URLs simples para cada idioma y cada lección",
      "PDF generados solo cuando se solicitan",
      "Descubrimiento automático de lecciones desde carpetas",
    ],
    noLessonsFoundYet: "Todavía no se encontraron lecciones",
    addJsonFiles:
      "Añade archivos JSON de lecciones dentro de generated_lessons/<Idioma>/ y aparecerán aquí automáticamente.",
    browseLessons: "Ver lecciones",
    languageCardDescription: (languageName) =>
      `Abre la biblioteca actual de lecciones en ${languageName} y sigue leyendo con la misma interfaz limpia y cómoda para móviles.`,
    noJsonLessons: "Todavía no hay lecciones JSON en este idioma",
    noJsonLessonsDesc:
      "Esta carpeta de idioma existe, pero no contiene archivos JSON legibles para mostrar.",
    openLesson: "Abrir lección",
    lessonSummaryFallback:
      "Abre esta lección para leer la introducción, las explicaciones por secciones y los ejercicios de traducción.",
    example: "Ejemplo",
    target: "Lengua meta",
    meaning: "Significado",
    focus: "Enfoque",
    practice: "Práctica",
    translationDrills: "Ejercicios de traducción",
    sourceTextMissing: "No se proporcionó texto fuente",
    targetTextMissing: "No se proporcionó texto meta",
    references: "Referencias",
    lessonSources: "Fuentes de la lección",
    languageLibrary: "Biblioteca de idioma",
    languageHeroText:
      "Elige una lección y léela en una interfaz despejada diseñada primero para móviles.",
    lessons: "Lecciones",
    available: "disponibles",
    readLessonFallback:
      "Lee la lección sección por sección y luego revisa los ejercicios de abajo.",
    backToLessons: "Volver a las lecciones",
    downloadPdf: "Descargar PDF",
    shareLesson: "Compartir lección",
    linkCopied: "Enlace copiado",
    wrapUp: "Resumen",
    keyTakeaway: "Idea clave",
    returnHome: "Volver al inicio",
    notFound: "No encontrado",
    notFoundTitle: "Esa página no está aquí.",
    notFoundDescription:
      "El enlace al idioma o a la lección puede estar desactualizado, o el archivo de origen puede haber sido eliminado.",
    serverError: "Error del servidor",
    serverErrorTitle: "Algo salió mal al cargar la lección.",
    serverErrorDescription:
      "Vuelve a intentarlo en un momento. Si el problema continúa, revisa los registros del servidor para encontrar el archivo ilegible.",
    footerLine1:
      "Las lecciones DIG4EL se leen directamente desde los archivos JSON de generated_lessons. Los PDF se generan bajo demanda, así que no hay nada extra que almacenar.",
    footerLine2:
      "Los archivos JSON se listan automáticamente. Por ahora se ignoran otros tipos de archivo.",
    dateNotProvided: "Fecha no proporcionada",
    statusLesson: "Lección",
    statusSketch: "Borrador",
    statusUnverified: "Sin verificar",
    lessonSectionFallback: "Sección de la lección",
    lessonCount: (count) => countLabel("es", count, { one: "lección", other: "lecciones" }),
    sectionCount: (count) => countLabel("es", count, { one: "sección", other: "secciones" }),
    drillCount: (count) => countLabel("es", count, { one: "ejercicio", other: "ejercicios" }),
    itemCount: (count) => countLabel("es", count, { one: "elemento", other: "elementos" }),
  },
  de: {
    siteName: "DIG4EL-Lektionen",
    siteTagline: "Leichte Grammatiklektüre auf jedem Gerät",
    metaDescription:
      "Durchsuchen Sie DIG4EL-Grammatiklektionen in einer leichten, mobilfreundlichen Oberfläche.",
    skipToContent: "Zum Inhalt springen",
    navHome: "Start",
    navLanguages: "Sprachen",
    localeLabel: "Sprache der Oberfläche",
    localeApply: "Anwenden",
    languageAvailability: (count) => `${countLabel("de", count, { one: "Lektion", other: "Lektionen" })} verfügbar`,
    browseLanguageDescription: (languageName) => `${languageName}-Lektionen durchsuchen.`,
    chooseLanguage: "Sprache wählen",
    availableLessonCollections: "Verfügbare Lektionensammlungen",
    aboutDig4el: "Über DIG4EL",
    aboutTitle: "Eine leichte Leseoberfläche für strukturierte Lektionen",
    aboutBody1:
      "Diese Website verwandelt DIG4EL-Lektions-JSON in Seiten, die sich auf dem Telefon angenehm lesen, leicht teilen und direkt navigieren lassen.",
    aboutBody2:
      "Die Oberfläche ist bewusst minimal: eine Sprachseite, eine Lektionsliste, eine fokussierte Leseansicht und PDF-Export bei Bedarf.",
    whyDesign: "Warum dieses Design?",
    designReasons: [
      "Kleine Datenmengen und überwiegend serverseitig gerendertes HTML",
      "Einfache URLs für jede Sprache und jede Lektion",
      "PDFs werden nur bei Bedarf erzeugt",
      "Lektionen werden automatisch aus Ordnern erkannt",
    ],
    noLessonsFoundYet: "Noch keine Lektionen gefunden",
    addJsonFiles:
      "Legen Sie JSON-Lektionsdateien in generated_lessons/<Sprache>/ ab, dann erscheinen sie hier automatisch.",
    browseLessons: "Lektionen ansehen",
    languageCardDescription: (languageName) =>
      `Öffnen Sie die aktuelle Bibliothek der ${languageName}-Lektionen und lesen Sie in derselben klaren, telefonfreundlichen Ansicht weiter.`,
    noJsonLessons: "In dieser Sprache gibt es noch keine JSON-Lektionen",
    noJsonLessonsDesc:
      "Dieser Sprachordner existiert, aber es gibt keine lesbaren JSON-Dateien zum Anzeigen.",
    openLesson: "Lektion öffnen",
    lessonSummaryFallback:
      "Öffnen Sie diese Lektion, um Einleitung, abschnittsweise Erklärungen und Übersetzungsübungen zu lesen.",
    example: "Beispiel",
    target: "Zielsprache",
    meaning: "Bedeutung",
    focus: "Schwerpunkt",
    practice: "Übung",
    translationDrills: "Übersetzungsübungen",
    sourceTextMissing: "Kein Ausgangstext angegeben",
    targetTextMissing: "Kein Zieltext angegeben",
    references: "Referenzen",
    lessonSources: "Quellen der Lektion",
    languageLibrary: "Sprachbibliothek",
    languageHeroText:
      "Wählen Sie eine Lektion und lesen Sie sie in einer ruhigen, mobiloptimierten Ansicht.",
    lessons: "Lektionen",
    available: "verfügbar",
    readLessonFallback:
      "Lesen Sie die Lektion Abschnitt für Abschnitt und gehen Sie dann zu den Übungen unten.",
    backToLessons: "Zurück zu den Lektionen",
    downloadPdf: "PDF herunterladen",
    shareLesson: "Lektion teilen",
    linkCopied: "Link kopiert",
    wrapUp: "Zusammenfassung",
    keyTakeaway: "Kernaussage",
    returnHome: "Zur Startseite",
    notFound: "Nicht gefunden",
    notFoundTitle: "Diese Seite ist nicht vorhanden.",
    notFoundDescription:
      "Der Link zur Sprache oder Lektion ist möglicherweise veraltet oder die Quelldatei wurde entfernt.",
    serverError: "Serverfehler",
    serverErrorTitle: "Beim Laden der Lektion ist ein Problem aufgetreten.",
    serverErrorDescription:
      "Bitte versuchen Sie es gleich noch einmal. Wenn das Problem bleibt, prüfen Sie die Serverprotokolle auf eine unlesbare Datei.",
    footerLine1:
      "DIG4EL-Lektionen werden direkt aus JSON-Dateien in generated_lessons gelesen. PDFs werden bei Bedarf erzeugt, daher muss nichts zusätzlich gespeichert werden.",
    footerLine2:
      "JSON-Dateien werden automatisch aufgelistet. Andere Dateitypen werden derzeit ignoriert.",
    dateNotProvided: "Kein Datum angegeben",
    statusLesson: "Lektion",
    statusSketch: "Skizze",
    statusUnverified: "Ungeprüft",
    lessonSectionFallback: "Lektionsabschnitt",
    lessonCount: (count) => countLabel("de", count, { one: "Lektion", other: "Lektionen" }),
    sectionCount: (count) => countLabel("de", count, { one: "Abschnitt", other: "Abschnitte" }),
    drillCount: (count) => countLabel("de", count, { one: "Übung", other: "Übungen" }),
    itemCount: (count) => countLabel("de", count, { one: "Eintrag", other: "Einträge" }),
  },
  ru: {
    siteName: "Уроки DIG4EL",
    siteTagline: "Лёгкое чтение по грамматике на любом устройстве",
    metaDescription:
      "Просматривайте грамматические уроки DIG4EL в лёгком интерфейсе, ориентированном на мобильные устройства.",
    skipToContent: "Перейти к содержимому",
    navHome: "Главная",
    navLanguages: "Языки",
    localeLabel: "Язык интерфейса",
    localeApply: "Применить",
    languageAvailability: (count) =>
      `${countLabel("ru", count, {
        one: "урок",
        few: "урока",
        many: "уроков",
        other: "урока",
      })} доступно`,
    browseLanguageDescription: (languageName) => `Просмотреть уроки языка ${languageName}.`,
    chooseLanguage: "Выберите язык",
    availableLessonCollections: "Доступные коллекции уроков",
    aboutDig4el: "О DIG4EL",
    aboutTitle: "Лёгкий интерфейс чтения для структурированных уроков",
    aboutBody1:
      "Этот сайт превращает JSON-уроки DIG4EL в страницы, которые удобно читать на телефоне, легко делиться ими и просто просматривать.",
    aboutBody2:
      "Интерфейс намеренно минимален: страница языка, список уроков, сфокусированное чтение и экспорт PDF по запросу.",
    whyDesign: "Почему такой дизайн?",
    designReasons: [
      "Небольшой объём данных и в основном серверный HTML",
      "Простые URL для каждого языка и каждого урока",
      "PDF создаются только по запросу",
      "Автоматическое обнаружение уроков по папкам",
    ],
    noLessonsFoundYet: "Пока уроков не найдено",
    addJsonFiles:
      "Добавьте JSON-файлы уроков в generated_lessons/<Язык>/, и они автоматически появятся здесь.",
    browseLessons: "Открыть уроки",
    languageCardDescription: (languageName) =>
      `Откройте текущую библиотеку уроков ${languageName} и продолжайте читать в том же чистом интерфейсе, удобном для телефона.`,
    noJsonLessons: "Для этого языка пока нет JSON-уроков",
    noJsonLessonsDesc:
      "Эта языковая папка существует, но в ней нет читаемых JSON-файлов для показа.",
    openLesson: "Открыть урок",
    lessonSummaryFallback:
      "Откройте этот урок, чтобы прочитать введение, объяснения по разделам и упражнения на перевод.",
    example: "Пример",
    target: "Целевой язык",
    meaning: "Значение",
    focus: "Фокус",
    practice: "Практика",
    translationDrills: "Упражнения на перевод",
    sourceTextMissing: "Исходный текст не указан",
    targetTextMissing: "Целевой текст не указан",
    references: "Источники",
    lessonSources: "Источники урока",
    languageLibrary: "Языковая библиотека",
    languageHeroText:
      "Выберите урок и читайте его в спокойном интерфейсе, сначала рассчитанном на мобильные устройства.",
    lessons: "Уроки",
    available: "доступно",
    readLessonFallback:
      "Читайте урок раздел за разделом, а затем переходите к упражнениям ниже.",
    backToLessons: "Назад к урокам",
    downloadPdf: "Скачать PDF",
    shareLesson: "Поделиться уроком",
    linkCopied: "Ссылка скопирована",
    wrapUp: "Итог",
    keyTakeaway: "Главное",
    returnHome: "Вернуться на главную",
    notFound: "Не найдено",
    notFoundTitle: "Этой страницы здесь нет.",
    notFoundDescription:
      "Ссылка на язык или урок могла устареть, либо исходный файл был удалён.",
    serverError: "Ошибка сервера",
    serverErrorTitle: "При загрузке урока что-то пошло не так.",
    serverErrorDescription:
      "Повторите попытку чуть позже. Если проблема сохранится, проверьте журналы сервера на наличие нечитаемого файла.",
    footerLine1:
      "Уроки DIG4EL читаются напрямую из JSON-файлов в generated_lessons. PDF создаются по запросу, поэтому ничего лишнего хранить не нужно.",
    footerLine2:
      "JSON-файлы отображаются автоматически. Остальные типы файлов пока игнорируются.",
    dateNotProvided: "Дата не указана",
    statusLesson: "Урок",
    statusSketch: "Черновик",
    statusUnverified: "Не проверено",
    lessonSectionFallback: "Раздел урока",
    lessonCount: (count) =>
      countLabel("ru", count, {
        one: "урок",
        few: "урока",
        many: "уроков",
        other: "урока",
      }),
    sectionCount: (count) =>
      countLabel("ru", count, {
        one: "раздел",
        few: "раздела",
        many: "разделов",
        other: "раздела",
      }),
    drillCount: (count) =>
      countLabel("ru", count, {
        one: "упражнение",
        few: "упражнения",
        many: "упражнений",
        other: "упражнения",
      }),
    itemCount: (count) =>
      countLabel("ru", count, {
        one: "элемент",
        few: "элемента",
        many: "элементов",
        other: "элемента",
      }),
  },
  ja: {
    siteName: "DIG4EL レッスン",
    siteTagline: "どの端末でも軽やかに読める文法レッスン",
    metaDescription:
      "DIG4EL の文法レッスンを、軽量でモバイルファーストなインターフェースで閲覧できます。",
    skipToContent: "本文へ移動",
    navHome: "ホーム",
    navLanguages: "言語",
    localeLabel: "表示言語",
    localeApply: "適用",
    languageAvailability: (count) => `${count} 件のレッスン`,
    browseLanguageDescription: (languageName) => `${languageName} のレッスンを閲覧します。`,
    chooseLanguage: "言語を選択",
    availableLessonCollections: "利用できるレッスン一覧",
    aboutDig4el: "DIG4EL について",
    aboutTitle: "構造化されたレッスンのための軽量な読書画面",
    aboutBody1:
      "このサイトは DIG4EL のレッスン JSON を、スマートフォンで読みやすく、共有しやすく、迷わずたどれるページに変換します。",
    aboutBody2:
      "画面構成は意図的に最小限です。言語ページ、レッスン一覧、集中して読める本文画面、そして必要なときだけ使う PDF 書き出しで構成されています。",
    whyDesign: "この設計にした理由",
    designReasons: [
      "通信量を抑え、ほとんどをサーバー描画の HTML にするため",
      "各言語と各レッスンにシンプルな URL を持たせるため",
      "PDF は必要なときだけ生成するため",
      "フォルダからレッスンを自動検出するため",
    ],
    noLessonsFoundYet: "まだレッスンが見つかっていません",
    addJsonFiles:
      "generated_lessons/<Language>/ に JSON レッスンファイルを追加すると、ここに自動表示されます。",
    browseLessons: "レッスンを見る",
    languageCardDescription: (languageName) =>
      `${languageName} の現在のレッスン一覧を開き、同じすっきりしたモバイル向けレイアウトで読み進められます。`,
    noJsonLessons: "この言語にはまだ JSON レッスンがありません",
    noJsonLessonsDesc:
      "この言語フォルダは存在しますが、表示できる JSON ファイルがまだありません。",
    openLesson: "レッスンを開く",
    lessonSummaryFallback:
      "このレッスンを開くと、導入、各セクションの説明、翻訳練習を読めます。",
    example: "例",
    target: "対象文",
    meaning: "意味",
    focus: "焦点",
    practice: "練習",
    translationDrills: "翻訳練習",
    sourceTextMissing: "元文がありません",
    targetTextMissing: "対象文がありません",
    references: "参考資料",
    lessonSources: "レッスンの出典",
    languageLibrary: "言語ライブラリ",
    languageHeroText:
      "レッスンを選んで、モバイル向けに整えた静かな画面で読み進めてください。",
    lessons: "レッスン",
    available: "件",
    readLessonFallback:
      "レッスンをセクションごとに読み、そのあと下の練習に進んでください。",
    backToLessons: "レッスン一覧へ戻る",
    downloadPdf: "PDF をダウンロード",
    shareLesson: "レッスンを共有",
    linkCopied: "リンクをコピーしました",
    wrapUp: "まとめ",
    keyTakeaway: "要点",
    returnHome: "ホームに戻る",
    notFound: "見つかりません",
    notFoundTitle: "このページは存在しません。",
    notFoundDescription:
      "言語またはレッスンへのリンクが古いか、元のファイルが削除された可能性があります。",
    serverError: "サーバーエラー",
    serverErrorTitle: "レッスンの読み込み中に問題が発生しました。",
    serverErrorDescription:
      "しばらくしてからもう一度お試しください。問題が続く場合は、サーバーログで読み取れないファイルを確認してください。",
    footerLine1:
      "DIG4EL のレッスンは generated_lessons 内の JSON ファイルを直接読み込みます。PDF は必要時に生成するため、追加保存は不要です。",
    footerLine2:
      "JSON ファイルは自動で一覧化されます。その他の形式のファイルは現在は無視されます。",
    dateNotProvided: "日付未設定",
    statusLesson: "レッスン",
    statusSketch: "草案",
    statusUnverified: "未検証",
    lessonSectionFallback: "レッスンの節",
    lessonCount: (count) => `${count} レッスン`,
    sectionCount: (count) => `${count} セクション`,
    drillCount: (count) => `${count} 練習`,
    itemCount: (count) => `${count} 項目`,
  },
};

export function normalizeLocale(value) {
  if (!value) {
    return null;
  }

  const normalized = String(value).trim().toLowerCase().replace(/_/g, "-");

  if (localeMetadata[normalized]) {
    return normalized;
  }

  const [base] = normalized.split("-");
  return localeMetadata[base] ? base : null;
}

export function detectPreferredLocale({ cookieLocale, acceptLanguage }) {
  const cookieMatch = normalizeLocale(cookieLocale);

  if (cookieMatch) {
    return cookieMatch;
  }

  const ranked = String(acceptLanguage ?? "")
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((param) => param.trim().startsWith("q="));
      const q = qParam ? Number(qParam.trim().slice(2)) : 1;

      return {
        locale: normalizeLocale(tag),
        q: Number.isFinite(q) ? q : 0,
      };
    })
    .filter((entry) => entry.locale)
    .sort((left, right) => right.q - left.q);

  return ranked[0]?.locale ?? defaultLocale;
}

export function getSupportedLocales() {
  return Object.values(localeMetadata);
}

export function getI18n(inputLocale) {
  const locale = normalizeLocale(inputLocale) ?? defaultLocale;
  const catalog = messages[locale] ?? messages[defaultLocale];

  function text(key, ...args) {
    const fallback = messages[defaultLocale][key];
    const value = catalog[key] ?? fallback;
    return typeof value === "function" ? value(...args) : value;
  }

  function statusLabel(statusKey) {
    if (statusKey === "unverified") {
      return text("statusUnverified");
    }

    if (statusKey === "sketch") {
      return text("statusSketch");
    }

    return text("statusLesson");
  }

  return {
    locale,
    locales: getSupportedLocales(),
    text,
    statusLabel,
    lessonCount: (count) => text("lessonCount", count),
    sectionCount: (count) => text("sectionCount", count),
    drillCount: (count) => text("drillCount", count),
    itemCount: (count) => text("itemCount", count),
  };
}
