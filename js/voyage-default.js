// ============================================================
// PREPARATION VOYAGE - Annexe familiale
// Catégories + checklist par défaut, basées sur les pratiques
// courantes des blogs de voyageurs. Utilise le même principe que
// les listes de courses (catégories + articles à cocher).
//
// VOYAGE_CATEGORIES_DEFAUT ne sert qu'à la toute première
// initialisation de la collection Firestore "rayonsVoyage" (si vide).
// Ensuite, les catégories Voyage sont éditables comme les rayons de
// courses, via le panneau Admin (onglet "Rayons Voyage").
// ============================================================

const VOYAGE_CATEGORIES_DEFAUT = [
  {
    id: "voyage-billets",
    nom: "✈️ Billets & Réservations",
    ordre: 1,
    motscles: ["billet", "avion", "vol", "réservation", "hôtel", "location voiture", "assurance voyage", "itinéraire"]
  },
  {
    id: "voyage-papiers",
    nom: "🛂 Passeport, Visa & Papiers",
    ordre: 2,
    motscles: ["passeport", "visa", "carte identité", "cni", "permis de conduire", "photocopie", "devise", "carte bancaire", "argent liquide"]
  },
  {
    id: "voyage-bagages",
    nom: "🧳 Bagages",
    ordre: 3,
    motscles: ["valise", "bagage", "étiquette", "cadenas", "sac à dos", "sac de voyage"]
  },
  {
    id: "voyage-toilette",
    nom: "🧴 Trousse de toilette",
    ordre: 4,
    motscles: ["dentifrice", "brosse à dents", "shampoing", "gel douche", "déodorant", "rasoir", "crème solaire", "lunettes de soleil", "lentilles"]
  },
  {
    id: "voyage-vetements",
    nom: "👕 Vêtements à prévoir",
    ordre: 5,
    motscles: ["vêtement", "chaussure", "maillot de bain", "veste", "pull", "pyjama", "sous-vêtement", "chaussette"]
  },
  {
    id: "voyage-electronique",
    nom: "🔌 Électronique",
    ordre: 6,
    motscles: ["chargeur", "adaptateur", "batterie externe", "appareil photo", "carte mémoire", "câble"]
  },
  {
    id: "voyage-sante",
    nom: "💊 Santé & Pharmacie",
    ordre: 7,
    motscles: ["médicament", "ordonnance", "carte européenne", "premiers secours", "répulsif", "moustique"]
  },
  {
    id: "voyage-voiture",
    nom: "🚗 Préparatif Voiture",
    ordre: 8,
    motscles: ["huile", "pression", "pneu", "carte grise", "assurance auto", "gilet jaune", "triangle", "gps", "crit'air", "essence"]
  },
  {
    id: "voyage-maison",
    nom: "🏠 Avant de partir (maison)",
    ordre: 9,
    motscles: ["eau", "gaz", "électricité", "animaux", "courrier", "voisin", "réfrigérateur", "volet"]
  },
  {
    id: "voyage-autre",
    nom: "📦 Autre",
    ordre: 99,
    motscles: []
  }
];

// Checklist pré-remplie automatiquement à la création d'une liste
// de type "Préparation Voyage".
const VOYAGE_ITEMS_PAR_DEFAUT = {
  "voyage-billets": [
    "Billets d'avion imprimés ou téléchargés",
    "Réservation hôtel confirmée",
    "Réservation location de voiture",
    "Assurance voyage souscrite",
    "Itinéraire / feuille de route"
  ],
  "voyage-papiers": [
    "Passeport (validité > 6 mois)",
    "Visa si nécessaire",
    "Carte d'identité",
    "Permis de conduire international si besoin",
    "Photocopies des documents importants",
    "Devises locales / argent liquide",
    "Carte bancaire prévenue du voyage"
  ],
  "voyage-bagages": [
    "Valise principale",
    "Bagage cabine",
    "Étiquettes avec coordonnées",
    "Cadenas de valise",
    "Sac à dos / sac de jour"
  ],
  "voyage-toilette": [
    "Brosse à dents + dentifrice",
    "Shampoing / gel douche format voyage",
    "Déodorant",
    "Rasoir",
    "Trousse de médicaments",
    "Crème solaire",
    "Lunettes de soleil / lentilles"
  ],
  "voyage-vetements": [
    "Vêtements adaptés à la météo (jours + soirées)",
    "Chaussures confortables",
    "Maillot de bain",
    "Veste ou pull chaud",
    "Pyjama",
    "Sous-vêtements & chaussettes (prévoir +1)"
  ],
  "voyage-electronique": [
    "Chargeurs téléphone / appareils",
    "Adaptateur de prise électrique",
    "Batterie externe",
    "Appareil photo / carte mémoire"
  ],
  "voyage-sante": [
    "Médicaments habituels + ordonnance",
    "Carte européenne d'assurance maladie (CEAM)",
    "Petite trousse de premiers secours",
    "Répulsif anti-moustiques si besoin"
  ],
  "voyage-voiture": [
    "Contrôle niveau d'huile / pression des pneus",
    "Carte grise + attestation d'assurance",
    "Gilet jaune + triangle de signalisation",
    "GPS / carte routière de la destination",
    "Vignette Crit'Air si besoin",
    "Plein d'essence avant le départ"
  ],
  "voyage-maison": [
    "Couper l'eau / le gaz si absence longue",
    "Débrancher les appareils électriques",
    "Faire garder les animaux",
    "Arrêter ou rediriger le courrier",
    "Prévenir un voisin de confiance",
    "Vider le réfrigérateur des produits périssables",
    "Fermer portes, fenêtres et volets"
  ]
};
