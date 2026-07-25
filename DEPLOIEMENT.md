# Liste de Courses Famille — Guide de mise en production

PWA de liste de courses collaborative en temps réel, hébergée sur GitHub Pages
avec synchronisation via Firebase (Firestore). Utilisateurs : Michel,
Stéphanie (admin), Julie, Morgane, Matthieu.

---

## 1. Créer le projet Firebase

1. Va sur https://console.firebase.google.com → **Ajouter un projet**.
   Nom libre, ex. `liste-courses-famille`. Google Analytics : pas nécessaire,
   tu peux le désactiver.
2. Une fois le projet créé : **Créer une application Web** (icône `</>`).
   Nom : `liste-courses`. Ne coche pas "Firebase Hosting" (on utilise GitHub
   Pages).
3. Firebase t'affiche un bloc `firebaseConfig` du type :
   ```js
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "liste-courses-famille.firebaseapp.com",
     projectId: "liste-courses-famille",
     storageBucket: "liste-courses-famille.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef"
   };
   ```
   Copie ces valeurs dans le fichier **`js/firebase-config.js`**, à la place
   des `VOTRE_...`.

## 2. Activer Firestore (base de données temps réel)

1. Dans la console Firebase : **Firestore Database** → **Créer une base de
   données**.
2. Choisis **Mode production** (les règles ci-dessous gèrent l'accès).
3. Région : choisis `eur3 (europe-west)` pour la France.
4. Une fois créée, va dans l'onglet **Règles** et remplace le contenu par :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Accès ouvert à la collection restreinte à un usage familial.
    // La sécurité repose sur le fait que l'app n'est pas indexée/publique
    // et que le login pseudo/mot de passe filtre l'accès côté application.
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

> ⚠️ **Important — à lire** : voir la section [Sécurité](#5-sécurité--limites-à-connaître)
> plus bas. Ces règles ouvertes sont un compromis simple adapté à un usage
> familial (5 personnes), pas à une app publique. C'est le même principe que
> pour FIFI Régul (données accessibles si on connaît l'URL exacte des
> documents, mais pas listées ni indexées).

## 3. Activer les notifications push (Firebase Cloud Messaging)

1. Dans la console Firebase : **Paramètres du projet** (roue crantée) →
   onglet **Cloud Messaging**.
2. Descends à **Certificats Web Push** → **Générer une paire de clés**.
3. Copie la clé générée (commence par un long code) dans
   **`js/firebase-config.js`**, variable `FCM_VAPID_KEY`.

**Ce qui fonctionne dès maintenant (sans configuration supplémentaire) :**
- Bannière in-app en temps réel dès qu'un membre a l'app ouverte.
- Notification navigateur classique quand l'app est ouverte ou en arrière-plan
  (onglet non fermé).

**Pour une vraie notification "push" reçue même app/navigateur complètement
fermé**, il faut une Cloud Function côté serveur qui envoie le message FCM
quand un document `notifications` est créé. C'est une étape plus avancée
(nécessite le plan Firebase "Blaze", gratuit jusqu'à un usage très large mais
demandant une carte bancaire enregistrée). Voir l'annexe
[Notifications push avancées](#annexe--notifications-push-avancées-cloud-function)
en fin de document si tu veux aller jusque-là plus tard. Ce n'est pas
bloquant : sans cette étape, la famille est déjà prévenue dès que l'un des
téléphones/PC a l'app ouverte quelque part.

## 4. Déployer sur GitHub Pages

1. Crée un nouveau dépôt GitHub, par exemple `liste-courses-famille`
   (public ou privé, les deux fonctionnent avec GitHub Pages sur un compte
   payant ; sur un compte gratuit, un dépôt **privé** ne permet pas Pages,
   il faudra le mettre en **public**).
2. Avec **GitHub Desktop** (comme pour FIFI Régul) :
   - Clone le dépôt en local.
   - Copie-colle tous les fichiers du projet (`index.html`, `manifest.json`,
     `sw.js`, les dossiers `css/`, `js/`, `icons/`) à la racine du dépôt.
   - Commit + Push.
3. Sur GitHub : **Settings** → **Pages** → Source : `Deploy from a branch`,
   branche `main`, dossier `/ (root)`. Sauvegarder.
4. Après 1-2 minutes, l'app est en ligne à :
   `https://TON-COMPTE-GITHUB.github.io/liste-courses-famille/`

## 5. Première utilisation

1. Ouvre l'URL ci-dessus. Au tout premier chargement, l'app crée
   automatiquement :
   - Les 5 comptes utilisateurs avec des mots de passe **temporaires**
     (visibles dans `js/auth.js`, section `MOTS_DE_PASSE_INITIAUX`).
   - Les rayons par défaut avec leurs mots-clés de classement.
2. Connecte-toi en **Stéphanie** avec son mot de passe temporaire.
3. Va dans **⚙️ Administration → Mots de passe** et change immédiatement
   tous les mots de passe (y compris le sien).
4. Chaque membre de la famille peut ensuite installer l'app sur son
   téléphone : ouvrir le lien dans le navigateur → menu → **Ajouter à
   l'écran d'accueil** (Android/Chrome) ou **Partager → Sur l'écran
   d'accueil** (iPhone/Safari).
5. Accepter la demande d'autorisation de notifications au premier lancement.

## 6. Mise à jour de l'app après modification du code

Comme pour tes autres projets GitHub Pages : modifie les fichiers en local,
puis dans GitHub Desktop, commit + push uniquement les fichiers changés.
Le site se met à jour automatiquement en 1-2 minutes, sans rien faire côté
utilisateurs (le Service Worker se met à jour tout seul au prochain
chargement).

---

## 5. Sécurité — limites à connaître

- **Pas de Firebase Auth** : le login pseudo/mot de passe est vérifié par
  l'application elle-même (hash SHA-256 stocké dans Firestore), pas par un
  vrai système d'authentification serveur. C'est suffisant pour un usage
  familial fermé, mais une personne qui connaîtrait l'URL Firestore exacte
  et le nom des collections pourrait techniquement lire/écrire les données
  sans mot de passe. Le risque est faible (app non référencée, données peu
  sensibles : liste de courses), mais à avoir en tête — comme pour la
  question déjà identifiée sur FIFI Régul concernant les données publiques
  sur GitHub Pages.
- **Mots de passe** : hashés (SHA-256), jamais stockés en clair dans la
  base. Le hash n'est cependant pas "salé" — à ne pas réutiliser pour un
  compte sensible ailleurs.
- **Pour renforcer plus tard** si souhaité : migrer vers Firebase
  Authentication (email/mot de passe ou lien magique) + règles Firestore
  vérifiant `request.auth.uid`. C'est un chantier plus lourd, à envisager
  seulement si l'app devait s'ouvrir à plus de monde.

---

## Annexe — Notifications push avancées (Cloud Function)

Étape optionnelle, pour recevoir une notification même app/navigateur
fermés sur tous les téléphones.

1. Passer le projet Firebase au plan **Blaze** (Paramètres du projet →
   Modifier le forfait). Gratuit jusqu'à 2 millions d'invocations/mois.
2. Installer Firebase CLI en local : `npm install -g firebase-tools`
3. `firebase login` puis `firebase init functions` dans un dossier à part.
4. Dans `functions/index.js` :

```js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.notifierCloture = functions.firestore
  .document("notifications/{id}")
  .onCreate(async (snap) => {
    const data = snap.data();
    const tokensSnap = await admin.firestore().collection("fcmTokens").get();
    const tokens = tokensSnap.docs.map(d => d.data().token).filter(Boolean);
    if (tokens.length === 0) return;

    await admin.messaging().sendEachForMulticast({
      tokens,
      notification: {
        title: "Liste de Courses",
        body: `🔒 ${data.pseudo} a clôturé la liste "${data.listeNom}"`
      }
    });
  });
```

5. `firebase deploy --only functions`
6. Côté app, il faut alors aussi enregistrer le token FCM de chaque
   appareil dans une collection `fcmTokens` (via
   `firebase.messaging().getToken({ vapidKey: FCM_VAPID_KEY })` après
   acceptation de la permission), ce qui n'est pas encore fait dans la
   version actuelle du code — à ajouter si cette étape est mise en place.

---

## Structure du projet

```
liste-famille/
├── index.html              Page principale
├── manifest.json            Manifest PWA
├── sw.js                     Service Worker (cache + push)
├── css/
│   ├── style.css             Styles de l'application
│   └── print.css             Mise en page impression A5 portrait
├── js/
│   ├── firebase-config.js    Config Firebase (à compléter)
│   ├── rayons-default.js     Rayons + classification automatique
│   ├── auth.js                Authentification pseudo/mot de passe
│   ├── notifications.js      Notifications de clôture de liste
│   └── app.js                 Logique principale de l'app
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── DEPLOIEMENT.md            Ce document
```
