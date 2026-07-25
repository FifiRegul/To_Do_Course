// ============================================================
// CONFIGURATION FIREBASE
// Remplacez les valeurs ci-dessous par celles de VOTRE projet
// Firebase (Console Firebase > Paramètres du projet > Vos apps > Config)
// Voir DEPLOIEMENT.md section "1. Créer le projet Firebase"
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyDlbQ7W0Vvc4znhHNVVLTSBzvAwCtG0T9Q",
  authDomain: "todocourse-96295.firebaseapp.com",
  projectId: "todocourse-96295",
  storageBucket: "todocourse-96295.firebasestorage.app",
  messagingSenderId: "271519876241",
  appId: "1:271519876241:web:bc5fcdf9f3168cb58feb30"
};

// Clé VAPID publique pour les notifications push (Firebase Console >
// Cloud Messaging > Web Push certificates). Voir DEPLOIEMENT.md.
const FCM_VAPID_KEY = "BJ9dc-AOgb0p3vksI_nbxDQmtQtNjyfuS1R0ueIdNvNf0V7FVukFHH3rl9zirvLpxKwmmDW6LoPijpmP85JcWig";

firebase.initializeApp(firebaseConfig);
const app = firebase.firestore();

// Active le cache local + synchro multi-onglets (fonctionne aussi
// partiellement hors-ligne)
db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
  console.warn("Persistance Firestore non activée :", err.code);
});
