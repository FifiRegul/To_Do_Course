// ============================================================
// NOTIFICATIONS DE CLOTURE DE LISTE
// - Bannière in-app en temps réel (fonctionne toujours, dès que
//   l'app est ouverte, via Firestore onSnapshot).
// - Notification navigateur (Notification API) si la permission
//   est accordée : s'affiche même si l'onglet est en arrière-plan.
// - Pour une vraie notification "push" reçue même app fermée,
//   voir DEPLOIEMENT.md > "Notifications push avancées (Cloud Function)".
// ============================================================

let dernierIdNotifTraite = null;

function demanderPermissionNotification() {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
}

/**
 * Enregistre un événement de clôture de liste dans Firestore.
 * Tous les membres connectés le reçoivent en temps réel.
 */
async function publierClotureListe(listeNom, pseudo) {
  await db.collection("notifications").add({
    type: "cloture",
    listeNom,
    pseudo,
    date: firebase.firestore.FieldValue.serverTimestamp()
  });
}

/**
 * Écoute les nouvelles notifications de clôture et affiche
 * une bannière + notification navigateur pour chacune.
 */
function ecouterNotificationsCloture(pseudoActuel) {
  db.collection("notifications")
    .orderBy("date", "desc")
    .limit(1)
    .onSnapshot((snap) => {
      if (snap.empty) return;
      const doc = snap.docs[0];
      const data = doc.data();

      // Ignore au premier chargement (évite de re-notifier l'historique)
      if (dernierIdNotifTraite === null) {
        dernierIdNotifTraite = doc.id;
        return;
      }
      if (doc.id === dernierIdNotifTraite) return;
      dernierIdNotifTraite = doc.id;

      // N'affiche pas à la personne qui vient de clôturer elle-même
      if (data.pseudo === pseudoActuel) return;

      const texte = `🔒 ${data.pseudo} a clôturé la liste "${data.listeNom}"`;
      afficherBanniereCloture(texte);

      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Liste de Courses", { body: texte, icon: "icons/icon-192.png" });
      }
    });
}

function afficherBanniereCloture(texte) {
  const banner = document.getElementById("closure-banner");
  const textEl = document.getElementById("closure-banner-text");
  textEl.textContent = texte;
  banner.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("closure-banner-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.getElementById("closure-banner").classList.add("hidden");
    });
  }
});
