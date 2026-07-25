// ============================================================
// AUTHENTIFICATION
// Auth simplifiée par pseudo + mot de passe (hash SHA-256),
// gérée entièrement côté client + Firestore.
// Pas de Firebase Auth : adapté à un usage familial restreint,
// cohérent avec le même choix fait pour le projet FIFI Régul.
// Voir DEPLOIEMENT.md > "Sécurité" pour les limites à connaître.
// ============================================================

const FAMILLE_PSEUDOS = ["Michel", "Stéphanie", "Julie", "Morgane", "Matthieu"];
const ADMIN_PSEUDO = "Stéphanie";

// Mots de passe par défaut à la toute première utilisation.
// A CHANGER IMMEDIATEMENT après la première connexion via le panneau Admin.
const MOTS_DE_PASSE_INITIAUX = {
  "Michel": "michel2026",
  "Stéphanie": "stephanie2026",
  "Julie": "julie2026",
  "Morgane": "morgane2026",
  "Matthieu": "matthieu2026"
};

async function sha256(texte) {
  const enc = new TextEncoder().encode(texte);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Crée les documents "users" par défaut si la collection est vide
 * (première utilisation de l'app).
 */
async function initialiserUtilisateursSiBesoin() {
  const snap = await db.collection("users").limit(1).get();
  if (!snap.empty) return;

  const batch = db.batch();
  for (const pseudo of FAMILLE_PSEUDOS) {
    const hash = await sha256(MOTS_DE_PASSE_INITIAUX[pseudo]);
    const ref = db.collection("users").doc(pseudo);
    batch.set(ref, {
      pseudo,
      passwordHash: hash,
      role: pseudo === ADMIN_PSEUDO ? "admin" : "membre"
    });
  }
  await batch.commit();
  console.log("Utilisateurs initialisés avec les mots de passe par défaut.");
}

/**
 * Vérifie les identifiants et renvoie { ok, role } ou { ok: false, message }
 */
async function verifierIdentifiants(pseudo, motDePasse) {
  if (!pseudo || !motDePasse) {
    return { ok: false, message: "Merci de remplir tous les champs." };
  }
  const doc = await db.collection("users").doc(pseudo).get();
  if (!doc.exists) {
    return { ok: false, message: "Utilisateur inconnu." };
  }
  const hash = await sha256(motDePasse);
  const data = doc.data();
  if (hash !== data.passwordHash) {
    return { ok: false, message: "Mot de passe incorrect." };
  }
  return { ok: true, role: data.role };
}

/**
 * Change le mot de passe d'un utilisateur (utilisé par l'admin).
 */
async function changerMotDePasse(pseudo, nouveauMotDePasse) {
  const hash = await sha256(nouveauMotDePasse);
  await db.collection("users").doc(pseudo).update({ passwordHash: hash });
}

// ---------- Session locale ----------
function sauvegarderSession(pseudo, role) {
  localStorage.setItem("liste_famille_session", JSON.stringify({ pseudo, role }));
}
function lireSession() {
  try {
    return JSON.parse(localStorage.getItem("liste_famille_session"));
  } catch {
    return null;
  }
}
function effacerSession() {
  localStorage.removeItem("liste_famille_session");
}
