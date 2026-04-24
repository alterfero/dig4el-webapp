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
    siteName: "DIG4EL draft lessons for teachers",
    siteTagline: "Draft lessons for teachers",
    metaDescription:
      "Browse DIG4EL grammar lessons on any device",
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
    aboutTitle: "DIG4EL is a software supporting the creation of grammatical descriptions for endangered languages.",
    aboutBody1:
      "This site displays DIG4EL lessons in a friendly format, easy to share, and direct to navigate.",
    aboutBody2:
      "The interface is minimal to enable the use of this app on all phones and slow Internet connection.",
    whyDesign: "Information",
    designReasons: [
        "These lessons are draft material meant to support teachers.",
        "These lessons may contain errors!",
       "For more information: Visit dig4el.org"
    ],
    noLessonsFoundYet: "No lessons found yet",
    addJsonFiles:
      "",
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
      "Pick a lesson.",
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
      "Don't forget lessons may contain errors!.",
    footerLine2:
        "All DIG4EL lessons are governed by a Creative Commons BY-NC license.",
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
    siteName: "Leçons provisoires DIG4EL pour les enseignants",
    siteTagline: "Leçons provisoires pour les enseignants",
    metaDescription:
      "Parcourez les leçons de grammaire DIG4EL sur n'importe quel appareil",
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
    aboutTitle: "DIG4EL est un logiciel qui soutient la création de descriptions grammaticales pour les langues en danger.",
    aboutBody1:
      "Ce site présente les leçons DIG4EL dans un format convivial, facile à partager et simple à parcourir.",
    aboutBody2:
      "L'interface est minimale afin de permettre l'utilisation de cette application sur tous les téléphones et avec une connexion Internet lente.",
    whyDesign: "Informations",
    designReasons: [
      "Ces leçons sont des supports provisoires destinés à aider les enseignants.",
      "Ces leçons peuvent contenir des erreurs !",
      "Pour plus d'informations : visitez dig4el.org",
    ],
    noLessonsFoundYet: "Aucune leçon trouvée pour le moment",
    addJsonFiles: "",
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
    languageHeroText: "Choisissez une leçon.",
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
    footerLine1: "N'oubliez pas que les leçons peuvent contenir des erreurs !",
    footerLine2: "Toutes les leçons DIG4EL sont régies par une licence Creative Commons BY-NC.",
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
    siteName: "Lecciones provisionales DIG4EL para docentes",
    siteTagline: "Lecciones provisionales para docentes",
    metaDescription:
      "Consulta las lecciones de gramática DIG4EL en cualquier dispositivo",
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
    aboutTitle: "DIG4EL es un software que apoya la creación de descripciones gramaticales para lenguas en peligro.",
    aboutBody1:
      "Este sitio muestra las lecciones DIG4EL en un formato amigable, fácil de compartir y directo de navegar.",
    aboutBody2:
      "La interfaz es mínima para permitir el uso de esta aplicación en todo tipo de teléfonos y con conexiones lentas a Internet.",
    whyDesign: "Información",
    designReasons: [
      "Estas lecciones son materiales provisionales destinados a apoyar a los docentes.",
      "¡Estas lecciones pueden contener errores!",
      "Para más información: visita dig4el.org",
    ],
    noLessonsFoundYet: "Todavía no se encontraron lecciones",
    addJsonFiles: "",
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
    languageHeroText: "Elige una lección.",
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
    footerLine1: "No olvides que las lecciones pueden contener errores.",
    footerLine2: "Todas las lecciones DIG4EL están regidas por una licencia Creative Commons BY-NC.",
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
    siteName: "DIG4EL-Entwurfslektionen für Lehrkräfte",
    siteTagline: "Entwurfslektionen für Lehrkräfte",
    metaDescription:
      "Durchsuchen Sie DIG4EL-Grammatiklektionen auf jedem Gerät",
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
    aboutTitle: "DIG4EL ist eine Software zur Unterstützung der Erstellung grammatischer Beschreibungen für bedrohte Sprachen.",
    aboutBody1:
      "Diese Website zeigt DIG4EL-Lektionen in einem benutzerfreundlichen Format, das leicht zu teilen und direkt zu navigieren ist.",
    aboutBody2:
      "Die Oberfläche ist bewusst minimal, damit diese App auf allen Telefonen und auch bei langsamen Internetverbindungen genutzt werden kann.",
    whyDesign: "Informationen",
    designReasons: [
      "Diese Lektionen sind Entwurfsmaterialien zur Unterstützung von Lehrkräften.",
      "Diese Lektionen können Fehler enthalten!",
      "Weitere Informationen finden Sie unter dig4el.org",
    ],
    noLessonsFoundYet: "Noch keine Lektionen gefunden",
    addJsonFiles: "",
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
    languageHeroText: "Wählen Sie eine Lektion.",
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
    footerLine1: "Bitte denken Sie daran, dass die Lektionen Fehler enthalten können.",
    footerLine2: "Alle DIG4EL-Lektionen stehen unter einer Creative-Commons-BY-NC-Lizenz.",
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
    siteName: "Черновые уроки DIG4EL для преподавателей",
    siteTagline: "Черновые уроки для преподавателей",
    metaDescription:
      "Просматривайте грамматические уроки DIG4EL на любом устройстве",
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
    aboutTitle: "DIG4EL — это программное обеспечение, поддерживающее создание грамматических описаний для языков, находящихся под угрозой исчезновения.",
    aboutBody1:
      "Этот сайт показывает уроки DIG4EL в удобном формате, которым легко делиться и который легко просматривать.",
    aboutBody2:
      "Интерфейс сделан минималистичным, чтобы приложением можно было пользоваться на любых телефонах и при медленном интернете.",
    whyDesign: "Информация",
    designReasons: [
      "Эти уроки являются черновыми материалами, предназначенными для поддержки преподавателей.",
      "Эти уроки могут содержать ошибки!",
      "Подробнее: посетите dig4el.org",
    ],
    noLessonsFoundYet: "Пока уроков не найдено",
    addJsonFiles: "",
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
    languageHeroText: "Выберите урок.",
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
    footerLine1: "Помните, что уроки могут содержать ошибки.",
    footerLine2: "Все уроки DIG4EL распространяются по лицензии Creative Commons BY-NC.",
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
    siteName: "DIG4EL 教員向け草稿レッスン",
    siteTagline: "教員向け草稿レッスン",
    metaDescription:
      "DIG4EL の文法レッスンをどの端末でも閲覧できます",
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
    aboutTitle: "DIG4EL は、危機言語の文法記述作成を支援するソフトウェアです。",
    aboutBody1:
      "このサイトでは、DIG4EL のレッスンを親しみやすく、共有しやすく、迷わずたどれる形式で表示します。",
    aboutBody2:
      "このアプリは、あらゆる携帯電話や低速なインターネット接続でも使えるよう、インターフェースを最小限にしています。",
    whyDesign: "情報",
    designReasons: [
      "これらのレッスンは、教員を支援するための草稿資料です。",
      "これらのレッスンには誤りが含まれる場合があります。",
      "詳しくは dig4el.org をご覧ください",
    ],
    noLessonsFoundYet: "まだレッスンが見つかっていません",
    addJsonFiles: "",
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
    languageHeroText: "レッスンを選んでください。",
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
    footerLine1: "レッスンには誤りが含まれる場合があることにご注意ください。",
    footerLine2: "すべての DIG4EL レッスンは Creative Commons BY-NC ライセンスの下にあります。",
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
