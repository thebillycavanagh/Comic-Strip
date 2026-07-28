# Scheduled Comic Website

This replaces the earlier static version.

## Included
- Private email/password admin login
- Seven-day upload and scheduling page
- Automatic 7:19 AM America/Denver releases
- Automatic featured-comic switching and archive
- Countdown to the next scheduled page
- Optional banner message, title, and caption per release

## Firebase setup
1. Create a Firebase project and register a Web app.
2. Enable Authentication > Email/Password.
3. Create your admin user under Authentication > Users.
4. Create Cloud Firestore and Cloud Storage.
5. Paste the Firebase Web configuration into `firebase-config.js`.
6. Replace `REPLACE_WITH_YOUR_EMAIL` in `firebase-config.js`, `firestore.rules`, and `storage.rules` with your exact admin email.
7. Publish the Firestore and Storage rules in Firebase Console.

## GitHub Pages upload
Upload every file and the full `assets` folder to the root of your GitHub repository. Then enable Settings > Pages > Deploy from branch > main / root.

Public page: `index.html`
Private weekly scheduler: `admin.html`

Add the final GitHub Pages domain in Firebase Authentication > Settings > Authorized domains.

## Weekly use
1. Open `admin.html`.
2. Sign in.
3. Choose the first release date.
4. Upload one to seven comic images.
5. Add optional titles, captions, and banner messages.
6. Click **Upload and Schedule Week**.

The public page reads the stored release timestamps and automatically changes at 7:19 AM Mountain Time. No daily GitHub upload is required.
