// ============================================================
// RAYONS PAR DEFAUT
// Utilisés uniquement lors de la toute première initialisation
// de la base Firestore (collection "rayons" vide).
// Modifiables ensuite par Stéphanie via le panneau Admin.
// ============================================================
const RAYONS_DEFAUT = [
  {
    id: "fruits-legumes",
    nom: "🥦 Fruits & Légumes",
    ordre: 1,
    motscles: ["pomme","banane","poire","salade","tomate","carotte","courgette",
      "oignon","ail","citron","orange","pomme de terre","patate","fraise",
      "avocat","poivron","concombre","champignon","raisin","kiwi","melon",
      "haricot vert","brocoli","chou","poireau","radis","clémentine","mandarine"]
  },
  {
    id: "boulangerie",
    nom: "🥖 Boulangerie & Pâtisserie",
    ordre: 2,
    motscles: ["pain","baguette","croissant","brioche","viennoiserie","pain de mie",
      "pain complet","biscotte","pain burger","tortilla","chausson"]
  },
  {
    id: "cremerie",
    nom: "🧀 Crémerie",
    ordre: 3,
    motscles: ["lait","yaourt","yogourt","fromage","beurre","crème","crème fraîche",
      "oeuf","œuf","fromage blanc","mozzarella","emmental","comté","camembert",
      "petit suisse","margarine"]
  },
  {
    id: "viande-poisson",
    nom: "🥩 Viande & Poisson",
    ordre: 4,
    motscles: ["poulet","boeuf","bœuf","porc","steak","saucisse","jambon","poisson",
      "saumon","thon","dinde","agneau","merguez","lardons","chorizo","haché",
      "escalope","filet","crevette","cabillaud"]
  },
  {
    id: "epicerie-salee",
    nom: "🍝 Épicerie salée",
    ordre: 5,
    motscles: ["pâtes","riz","farine","huile","sel","poivre","conserve","sauce tomate",
      "lentille","semoule","quinoa","épice","bouillon","vinaigre","moutarde",
      "ketchup","mayonnaise","boîte de conserve","thon en boîte","olives","cornichon"]
  },
  {
    id: "epicerie-sucree",
    nom: "🍫 Épicerie sucrée",
    ordre: 6,
    motscles: ["sucre","chocolat","biscuit","gâteau","confiture","miel","céréales",
      "bonbon","pâte à tartiner","nutella","gaufre","compote","farine de blé",
      "levure","vanille","chips"]
  },
  {
    id: "boissons",
    nom: "🥤 Boissons",
    ordre: 7,
    motscles: ["eau","jus","soda","coca","limonade","café","thé","vin","bière",
      "sirop","lait végétal","jus d'orange","boisson"]
  },
  {
    id: "surgeles",
    nom: "🧊 Surgelés",
    ordre: 8,
    motscles: ["surgelé","glace","frites surgelées","pizza surgelée","légumes surgelés",
      "poisson pané","cordon bleu"]
  },
  {
    id: "hygiene-beaute",
    nom: "🧴 Hygiène & Beauté",
    ordre: 9,
    motscles: ["dentifrice","shampoing","savon","gel douche","déodorant","rasoir",
      "coton-tige","mouchoir","papier toilette","protection hygiénique","crème visage"]
  },
  {
    id: "entretien-maison",
    nom: "🧽 Entretien & Maison",
    ordre: 10,
    motscles: ["lessive","liquide vaisselle","éponge","sac poubelle","essuie-tout",
      "papier essuie-tout","nettoyant","javel","adoucissant","ampoule","pile"]
  },
  {
    id: "bebe",
    nom: "👶 Bébé",
    ordre: 11,
    motscles: ["couche","lingette bébé","lait infantile","petit pot","compote bébé"]
  },
  {
    id: "animaux",
    nom: "🐾 Animaux",
    ordre: 12,
    motscles: ["croquette","pâtée","litière","friandise chat","friandise chien"]
  },
  {
    id: "autre",
    nom: "📦 Autre",
    ordre: 99,
    motscles: []
  }
];

/**
 * Détermine automatiquement le rayon d'un article à partir de son nom,
 * en cherchant une correspondance de mot-clé (insensible à la casse/accents).
 * @param {string} nomArticle
 * @param {Array} rayons - liste des rayons courants (depuis Firestore)
 * @returns {string} id du rayon trouvé, ou "autre" si aucune correspondance
 */
function classifierArticle(nomArticle, rayons) {
  const normalise = (s) => s
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // retire les accents

  const nom = normalise(nomArticle);

  for (const rayon of rayons) {
    if (!rayon.motscles) continue;
    for (const mot of rayon.motscles) {
      if (nom.includes(normalise(mot))) {
        return rayon.id;
      }
    }
  }
  return "autre";
}
