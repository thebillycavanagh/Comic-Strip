window.COMIC_SITE_CONFIG = {
  siteTitle: "Fresh Comic. Every Day.",
  timezone: "America/Denver",
  releaseHour: 0,
  releaseMinute: 0,

  // Replace these with your own comic image file paths.
  currentComic: {
    src: "assets/comic-1.png",
    alt: "Today's featured comic",
    date: "Today"
  },

  previousComics: [
    { src: "assets/comic-2.png", alt: "Previous comic 1", date: "Yesterday" },
    { src: "assets/comic-3.png", alt: "Previous comic 2", date: "Earlier" },
    { src: "assets/comic-4.png", alt: "Previous comic 3", date: "Earlier" }
  ],

  // Firebase is only needed when you want the admin page to update
  // the banner for every visitor without re-uploading this site.
  firebase: {
    enabled: false,
    apiKey: "PASTE_FIREBASE_API_KEY",
    authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://PASTE_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "PASTE_PROJECT_ID"
  },

  fallbackMessage: "A new comic page is on the way."
};