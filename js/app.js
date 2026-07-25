// ============================================================
// APPLICATION - LISTE DE COURSES FAMILLE
// ============================================================

let session = null;          // { pseudo, role }
let rayonsActuels = [];      // depuis Firestore, triés par "ordre"
let listesActuelles = [];    // depuel Firestore
let listeActiveId = null;
let unsubArticles = null;
let articlesActuels = [];
let historiqueCache = [];    // pour l'autocomplete

// ------------------------------------------------------------
// DEMARRAGE
// ------------------------------------------------------------
window.addEventListener("load", async () => {
  try {
    await initialiserUtilisateursSiBesoin();
    await initialiserRayonsSiBesoin();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").catch(console.error);
    }

    const s = lireSession();
    document.getElementById("splash").classList.add("hidden");

    if (s && s.pseudo) {
      demarrerSession(s.pseudo, s.role);
    } else {
      document.getElementById("login-screen").classList.remove("hidden");
    }
  } catch (err) {
    console.error("Erreur au démarrage :", err);
    afficherErreurDemarrage(err);
  }
});

function afficherErreurDemarrage(err) {
  const splash = document.getElementById("splash");
  let message = "Impossible de se connecter à la base de données.";
  const txt = String(err && err.message || err);
  if (txt.includes("PERMISSION_DENIED") || txt.includes("permission")) {
    message = "Accès refusé par les règles Firestore. Vérifiez qu'elles autorisent la lecture/écriture (voir DEPLOIEMENT.md, étape 2).";
  } else if (txt.includes("VOTRE_") || txt.includes("api-key-not-valid") || txt.includes("invalid-api-key")) {
    message = "La configuration Firebase (js/firebase-config.js) contient encore des valeurs à remplacer (VOTRE_API_KEY, etc.). Voir DEPLOIEMENT.md, étape 1.";
  } else if (txt.includes("project") || txt.includes("not-found")) {
    message = "Le projet Firebase indiqué dans js/firebase-config.js est introuvable. Vérifiez le projectId.";
  }
  splash.innerHTML = `
    <div class="splash-logo">⚠️</div>
    <div class="splash-title">Problème de connexion</div>
    <div class="splash-sub" style="max-width:320px;text-align:center;margin-top:10px;line-height:1.4;">${message}</div>
    <div class="splash-sub" style="margin-top:16px;font-size:11px;opacity:0.7;">Détail technique : ${escapeHtml(txt)}</div>
  `;
}

async function initialiserRayonsSiBesoin() {
  const snap = await db.collection("rayons").limit(1).get();
  if (!snap.empty) return;
  const batch = db.batch();
  RAYONS_DEFAUT.forEach(r => {
    batch.set(db.collection("rayons").doc(r.id), r);
  });
  await batch.commit();
}

// ------------------------------------------------------------
// LOGIN
// ------------------------------------------------------------
document.getElementById("login-btn").addEventListener("click", async () => {
  const pseudo = document.getElementById("login-pseudo").value;
  const mdp = document.getElementById("login-password").value;
  const errEl = document.getElementById("login-error");
  errEl.classList.add("hidden");

  const res = await verifierIdentifiants(pseudo, mdp);
  if (!res.ok) {
    errEl.textContent = res.message;
    errEl.classList.remove("hidden");
    return;
  }
  sauvegarderSession(pseudo, res.role);
  demarrerSession(pseudo, res.role);
});

document.getElementById("logout-btn").addEventListener("click", () => {
  effacerSession();
  if (unsubArticles) unsubArticles();
  location.reload();
});

function demarrerSession(pseudo, role) {
  session = { pseudo, role };
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("app-screen").classList.remove("hidden");
  document.getElementById("current-user").textContent = `👋 ${pseudo}`;
  if (role === "admin") {
    document.getElementById("admin-btn").classList.remove("hidden");
  }

  demanderPermissionNotification();
  ecouterNotificationsCloture(pseudo);
  ecouterRayons();
  ecouterListes();
  ecouterHistorique();
}

// ------------------------------------------------------------
// RAYONS (temps réel)
// ------------------------------------------------------------
function ecouterRayons() {
  db.collection("rayons").orderBy("ordre").onSnapshot((snap) => {
    rayonsActuels = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    remplirSelectRayons();
    if (listeActiveId) afficherArticles();
    if (!document.getElementById("modal-admin").classList.contains("hidden")) {
      renderAdminRayons();
    }
  });
}

function remplirSelectRayons() {
  const sel = document.getElementById("article-rayon");
  sel.innerHTML = `<option value="">Rayon auto</option>` +
    rayonsActuels.map(r => `<option value="${r.id}">${r.nom}</option>`).join("");
}

// ------------------------------------------------------------
// LISTES (temps réel)
// ------------------------------------------------------------
function ecouterListes() {
  db.collection("listes").orderBy("dateCreation", "desc").onSnapshot((snap) => {
    listesActuelles = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    renderListsTabs();

    if (listesActuelles.length === 0) {
      listeActiveId = null;
      document.getElementById("list-empty-state").classList.remove("hidden");
      document.getElementById("list-view").classList.add("hidden");
      return;
    }
    document.getElementById("list-empty-state").classList.add("hidden");

    if (!listeActiveId || !listesActuelles.find(l => l.id === listeActiveId)) {
      listeActiveId = listesActuelles.find(l => !l.cloturee)?.id || listesActuelles[0].id;
    }
    selectionnerListe(listeActiveId);
  });
}

function renderListsTabs() {
  const container = document.getElementById("lists-tabs");
  container.innerHTML = listesActuelles.map(l => `
    <div class="list-tab ${l.id === listeActiveId ? "active" : ""} ${l.cloturee ? "closed" : ""}"
         data-id="${l.id}">
      ${l.cloturee ? "🔒 " : ""}${escapeHtml(l.nom)}
    </div>
  `).join("");

  container.querySelectorAll(".list-tab").forEach(tab => {
    tab.addEventListener("click", () => selectionnerListe(tab.dataset.id));
  });
}

function selectionnerListe(listeId) {
  listeActiveId = listeId;
  renderListsTabs();

  const liste = listesActuelles.find(l => l.id === listeId);
  if (!liste) return;

  document.getElementById("list-view").classList.remove("hidden");
  document.getElementById("list-title").textContent = liste.nom;

  const closeBtn = document.getElementById("close-list-btn");
  const deleteBtn = document.getElementById("delete-list-btn");
  const closedTag = document.getElementById("list-closed-tag");
  const form = document.querySelector(".add-article-form");

  closedTag.classList.toggle("hidden", !liste.cloturee);
  form.style.opacity = liste.cloturee ? "0.5" : "1";
  form.querySelectorAll("input,select,button").forEach(el => el.disabled = !!liste.cloturee);

  if (session.role === "admin") {
    closeBtn.classList.toggle("hidden", !!liste.cloturee);
    deleteBtn.classList.remove("hidden");
  } else {
    closeBtn.classList.add("hidden");
    deleteBtn.classList.add("hidden");
  }

  if (unsubArticles) unsubArticles();
  unsubArticles = db.collection("listes").doc(listeId).collection("articles")
    .orderBy("dateAjout")
    .onSnapshot((snap) => {
      articlesActuels = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      afficherArticles();
    });
}

// ------------------------------------------------------------
// NOUVELLE LISTE
// ------------------------------------------------------------
function ouvrirModalNouvelleListe() {
  document.getElementById("modal-new-list").classList.remove("hidden");
  document.getElementById("new-list-name").value = "";
  document.getElementById("new-list-name").focus();
}
document.getElementById("new-list-btn").addEventListener("click", ouvrirModalNouvelleListe);
document.getElementById("create-first-list-btn").addEventListener("click", ouvrirModalNouvelleListe);
document.getElementById("new-list-cancel").addEventListener("click", () => {
  document.getElementById("modal-new-list").classList.add("hidden");
});
document.getElementById("new-list-confirm").addEventListener("click", async () => {
  const nom = document.getElementById("new-list-name").value.trim();
  if (!nom) return;
  await db.collection("listes").add({
    nom,
    creePar: session.pseudo,
    dateCreation: firebase.firestore.FieldValue.serverTimestamp(),
    cloturee: false
  });
  document.getElementById("modal-new-list").classList.add("hidden");
});

document.getElementById("close-list-btn").addEventListener("click", async () => {
  const liste = listesActuelles.find(l => l.id === listeActiveId);
  if (!liste) return;
  if (!confirm(`Clôturer la liste "${liste.nom}" et prévenir la famille ?`)) return;
  await db.collection("listes").doc(listeActiveId).update({
    cloturee: true,
    dateCloture: firebase.firestore.FieldValue.serverTimestamp(),
    clotureePar: session.pseudo
  });
  await publierClotureListe(liste.nom, session.pseudo);
});

document.getElementById("delete-list-btn").addEventListener("click", async () => {
  const liste = listesActuelles.find(l => l.id === listeActiveId);
  if (!liste) return;
  if (!confirm(`Supprimer définitivement la liste "${liste.nom}" ?`)) return;
  const articlesSnap = await db.collection("listes").doc(listeActiveId).collection("articles").get();
  const batch = db.batch();
  articlesSnap.docs.forEach(d => batch.delete(d.ref));
  batch.delete(db.collection("listes").doc(listeActiveId));
  await batch.commit();
});

// ------------------------------------------------------------
// AJOUT D'ARTICLE + AUTOCOMPLETE
// ------------------------------------------------------------
const inputNom = document.getElementById("article-name");
const autocompleteList = document.getElementById("autocomplete-list");

inputNom.addEventListener("input", () => {
  const val = inputNom.value.trim().toLowerCase();
  if (val.length < 1) {
    autocompleteList.classList.add("hidden");
    return;
  }
  const matches = historiqueCache
    .filter(h => h.nom.toLowerCase().includes(val))
    .sort((a, b) => (b.totalCount || 0) - (a.totalCount || 0))
    .slice(0, 8);

  if (matches.length === 0) {
    autocompleteList.classList.add("hidden");
    return;
  }
  autocompleteList.innerHTML = matches.map(m => {
    const rayon = rayonsActuels.find(r => r.id === m.rayonId);
    return `<div class="autocomplete-item" data-nom="${escapeHtml(m.nom)}" data-rayon="${m.rayonId || ""}">
      <span>${escapeHtml(m.nom)}</span>
      <span class="ac-rayon">${rayon ? rayon.nom : ""}</span>
    </div>`;
  }).join("");
  autocompleteList.classList.remove("hidden");

  autocompleteList.querySelectorAll(".autocomplete-item").forEach(item => {
    item.addEventListener("click", () => {
      inputNom.value = item.dataset.nom;
      document.getElementById("article-rayon").value = item.dataset.rayon || "";
      autocompleteList.classList.add("hidden");
    });
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".autocomplete-wrap")) {
    autocompleteList.classList.add("hidden");
  }
});

document.getElementById("add-article-btn").addEventListener("click", ajouterArticle);
inputNom.addEventListener("keydown", (e) => {
  if (e.key === "Enter") ajouterArticle();
});

async function ajouterArticle() {
  const nom = inputNom.value.trim();
  if (!nom || !listeActiveId) return;

  const liste = listesActuelles.find(l => l.id === listeActiveId);
  if (liste?.cloturee) return;

  const qty = parseFloat(document.getElementById("article-qty").value) || 1;
  const unite = document.getElementById("article-unit").value;
  let rayonId = document.getElementById("article-rayon").value;
  if (!rayonId) {
    rayonId = classifierArticle(nom, rayonsActuels);
  }

  await db.collection("listes").doc(listeActiveId).collection("articles").add({
    nom,
    quantite: qty,
    unite,
    rayonId,
    coche: false,
    ajoutePar: session.pseudo,
    dateAjout: firebase.firestore.FieldValue.serverTimestamp()
  });

  await enregistrerDansHistorique(nom, rayonId, session.pseudo);

  inputNom.value = "";
  document.getElementById("article-qty").value = "1";
  document.getElementById("article-unit").value = "";
  document.getElementById("article-rayon").value = "";
  autocompleteList.classList.add("hidden");
  inputNom.focus();
}

// ------------------------------------------------------------
// HISTORIQUE (suggestions personnelles + familiales)
// ------------------------------------------------------------
function ecouterHistorique() {
  db.collection("historique").onSnapshot((snap) => {
    historiqueCache = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  });
}

function slugify(nom) {
  return nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function enregistrerDansHistorique(nom, rayonId, pseudo) {
  const id = slugify(nom);
  if (!id) return;
  const ref = db.collection("historique").doc(id);
  await db.runTransaction(async (tx) => {
    const doc = await tx.get(ref);
    if (doc.exists) {
      const data = doc.data();
      const utilisateurs = data.utilisateurs || {};
      utilisateurs[pseudo] = (utilisateurs[pseudo] || 0) + 1;
      tx.update(ref, {
        rayonId,
        dernierUtilise: firebase.firestore.FieldValue.serverTimestamp(),
        totalCount: (data.totalCount || 0) + 1,
        utilisateurs
      });
    } else {
      tx.set(ref, {
        nom,
        rayonId,
        dernierUtilise: firebase.firestore.FieldValue.serverTimestamp(),
        totalCount: 1,
        utilisateurs: { [pseudo]: 1 }
      });
    }
  });
}

// ------------------------------------------------------------
// AFFICHAGE DES ARTICLES (groupés par rayon + panier)
// ------------------------------------------------------------
function afficherArticles() {
  const aAcheter = articlesActuels.filter(a => !a.coche);
  const dansLePanier = articlesActuels.filter(a => a.coche);

  // Groupement par rayon
  const parRayon = {};
  aAcheter.forEach(a => {
    const rid = a.rayonId || "autre";
    if (!parRayon[rid]) parRayon[rid] = [];
    parRayon[rid].push(a);
  });

  const rayonsOrdonnes = [...rayonsActuels].sort((a, b) => a.ordre - b.ordre);
  const container = document.getElementById("rayons-container");

  container.innerHTML = rayonsOrdonnes
    .filter(r => parRayon[r.id]?.length)
    .map(r => `
      <div class="rayon-group">
        <div class="rayon-header">${r.nom} <span style="opacity:.6;font-weight:400;">(${parRayon[r.id].length})</span></div>
        <div class="rayon-items">
          ${parRayon[r.id].map(articleRowHtml).join("")}
        </div>
      </div>
    `).join("") || `<p style="text-align:center;color:#999;padding:24px 0;">Aucun article à acheter 🎉</p>`;

  document.getElementById("cart-count").textContent = dansLePanier.length;
  document.getElementById("cart-list").innerHTML = dansLePanier.map(articleRowHtml).join("");

  container.querySelectorAll(".article-check, .article-delete").forEach(bindArticleActions);
  document.getElementById("cart-list").querySelectorAll(".article-check, .article-delete").forEach(bindArticleActions);
}

function articleRowHtml(a) {
  const meta = [a.quantite, a.unite].filter(Boolean).join(" ");
  return `
    <div class="article-row" data-id="${a.id}">
      <button class="article-check" data-id="${a.id}" data-coche="${a.coche}"></button>
      <div class="article-info">
        <div class="article-name">${escapeHtml(a.nom)}</div>
        <div class="article-meta">${meta ? meta + " · " : ""}ajouté par ${escapeHtml(a.ajoutePar || "?")}</div>
      </div>
      <button class="article-delete" data-id="${a.id}">🗑️</button>
    </div>
  `;
}

function bindArticleActions(el) {
  const id = el.dataset.id;
  if (el.classList.contains("article-check")) {
    el.addEventListener("click", () => basculerArticle(id));
  } else {
    el.addEventListener("click", () => supprimerArticle(id));
  }
}

async function basculerArticle(articleId) {
  const article = articlesActuels.find(a => a.id === articleId);
  if (!article) return;
  await db.collection("listes").doc(listeActiveId).collection("articles").doc(articleId).update({
    coche: !article.coche,
    dateCoche: !article.coche ? firebase.firestore.FieldValue.serverTimestamp() : null
  });
}

async function supprimerArticle(articleId) {
  await db.collection("listes").doc(listeActiveId).collection("articles").doc(articleId).delete();
}

// ------------------------------------------------------------
// IMPRESSION A5 (articles à acheter uniquement, non cochés)
// ------------------------------------------------------------
document.getElementById("print-btn").addEventListener("click", () => {
  const liste = listesActuelles.find(l => l.id === listeActiveId);
  if (!liste) return;

  const aAcheter = articlesActuels.filter(a => !a.coche);
  const parRayon = {};
  aAcheter.forEach(a => {
    const rid = a.rayonId || "autre";
    if (!parRayon[rid]) parRayon[rid] = [];
    parRayon[rid].push(a);
  });
  const rayonsOrdonnes = [...rayonsActuels].sort((a, b) => a.ordre - b.ordre);

  const dateStr = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });

  const html = `
    <div class="print-header">
      <div class="print-emoji">🛒</div>
      <h1>${escapeHtml(liste.nom)}</h1>
      <div class="print-date">Imprimé le ${dateStr}</div>
    </div>
    ${rayonsOrdonnes.filter(r => parRayon[r.id]?.length).map(r => `
      <div class="print-rayon">
        <div class="print-rayon-title">${r.nom}</div>
        ${parRayon[r.id].map(a => `
          <div class="print-article">
            <span class="box"></span>
            <span>${escapeHtml(a.nom)}</span>
            <span class="qty">${[a.quantite, a.unite].filter(Boolean).join(" ")}</span>
          </div>
        `).join("")}
      </div>
    `).join("") || "<p>Aucun article à acheter.</p>"}
    <div class="print-footer">Liste de Courses Famille — ${aAcheter.length} article(s) à acheter</div>
  `;

  document.getElementById("print-area").innerHTML = html;
  window.print();
});

// ------------------------------------------------------------
// PANNEAU ADMIN
// ------------------------------------------------------------
document.getElementById("admin-btn").addEventListener("click", () => {
  document.getElementById("modal-admin").classList.remove("hidden");
  renderAdminUsers();
  renderAdminRayons();
});
document.getElementById("admin-close").addEventListener("click", () => {
  document.getElementById("modal-admin").classList.add("hidden");
});

document.querySelectorAll(".admin-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    document.querySelectorAll(".admin-tab-content").forEach(c => c.classList.add("hidden"));
    document.getElementById(`admin-tab-${tab.dataset.tab}`).classList.remove("hidden");
  });
});

function renderAdminUsers() {
  const container = document.getElementById("admin-users-list");
  container.innerHTML = FAMILLE_PSEUDOS.map(pseudo => `
    <div class="admin-user-row">
      <span class="name">${pseudo} ${pseudo === ADMIN_PSEUDO ? '<span class="admin-role-tag">admin</span>' : ""}</span>
      <input type="password" placeholder="Nouveau mot de passe" data-pseudo="${pseudo}" class="admin-pwd-input">
      <button class="btn-small admin-pwd-save" data-pseudo="${pseudo}">Enregistrer</button>
    </div>
  `).join("");

  container.querySelectorAll(".admin-pwd-save").forEach(btn => {
    btn.addEventListener("click", async () => {
      const pseudo = btn.dataset.pseudo;
      const input = container.querySelector(`.admin-pwd-input[data-pseudo="${pseudo}"]`);
      const val = input.value.trim();
      if (val.length < 4) {
        alert("Le mot de passe doit contenir au moins 4 caractères.");
        return;
      }
      await changerMotDePasse(pseudo, val);
      input.value = "";
      btn.textContent = "✓ Fait";
      setTimeout(() => btn.textContent = "Enregistrer", 1500);
    });
  });
}

function renderAdminRayons() {
  const container = document.getElementById("admin-rayons-list");
  container.innerHTML = rayonsActuels.map(r => `
    <div class="admin-rayon-row" data-id="${r.id}">
      <div class="rayon-name-row">
        <input type="text" class="rayon-name" value="${escapeHtml(r.nom)}">
        <button class="icon-btn rayon-delete">🗑️</button>
      </div>
      <div class="rayon-hint">Mots-clés (séparés par des virgules) :</div>
      <textarea class="rayon-keywords">${(r.motscles || []).join(", ")}</textarea>
      <button class="btn-small rayon-save" style="margin-top:6px;">Enregistrer ce rayon</button>
    </div>
  `).join("");

  container.querySelectorAll(".rayon-save").forEach(btn => {
    btn.addEventListener("click", async () => {
      const row = btn.closest(".admin-rayon-row");
      const id = row.dataset.id;
      const nom = row.querySelector(".rayon-name").value.trim();
      const motscles = row.querySelector(".rayon-keywords").value
        .split(",").map(s => s.trim()).filter(Boolean);
      await db.collection("rayons").doc(id).update({ nom, motscles });
      btn.textContent = "✓ Enregistré";
      setTimeout(() => btn.textContent = "Enregistrer ce rayon", 1500);
    });
  });

  container.querySelectorAll(".rayon-delete").forEach(btn => {
    btn.addEventListener("click", async () => {
      const row = btn.closest(".admin-rayon-row");
      const id = row.dataset.id;
      if (!confirm("Supprimer ce rayon ? Les articles déjà classés dedans resteront tels quels.")) return;
      await db.collection("rayons").doc(id).delete();
    });
  });
}

document.getElementById("add-rayon-btn").addEventListener("click", async () => {
  const nom = prompt("Nom du nouveau rayon (avec emoji si souhaité) :");
  if (!nom) return;
  const id = slugify(nom) || ("rayon-" + Date.now());
  const maxOrdre = Math.max(0, ...rayonsActuels.map(r => r.ordre || 0));
  await db.collection("rayons").doc(id).set({
    nom, motscles: [], ordre: maxOrdre + 1
  });
});

// ------------------------------------------------------------
// UTILITAIRES
// ------------------------------------------------------------
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
