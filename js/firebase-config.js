// ============================================================
// CONFIGURATION FIREBASE
// Remplacez les valeurs ci-dessous par celles de VOTRE projet
// Firebase (Console Firebase > Paramètres du projet > Vos apps > Config)
// Voir DEPLOIEMENT.md section "1. Créer le projet Firebase"
// ============================================================
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJET.firebaseapp.com",
  projectId: "VOTRE_PROJET",
  storageBucket: "VOTRE_PROJET.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId: "VOTRE_APP_ID"
};

// Clé VAPID publique pour les notifications push (Firebase Console >
// Cloud Messaging > Web Push certificates). Voir DEPLOIEMENT.md.
const FCM_VAPID_KEY = "VOTRE_CLE_VAPID_PUBLIQUE";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Active le cache local + synchro multi-onglets (fonctionne aussi
// partiellement hors-ligne)
db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
  console.warn("Persistance Firestore non activée :", err.code);
});
