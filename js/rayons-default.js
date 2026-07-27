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
      "haricot vert","brocoli","chou","poireau","radis","clémentine","mandarine","fruits","légumes","primeur","fruits frais","légumes frais","marché frais","étal primeur","fruits bio","légumes bio","produits locaux","fruits de saison","légumes de saison","origine France","circuit court","zéro pesticide","commerce équitable","panier de légumes","panier de fruits", "fruits en vrac","légumes en vrac","anti-gaspillage","fruits pas chers","livraison primeur","clémentines","mandarines","oranges","oranges à jus","oranges de table","citrons jaunes","citrons verts","pamplemousses","pomelos","citrons-caviars","kumquats","bergamotes","pommes","poires","pêches","pêches blanches","pêches jaunes","brugnons","nectarines","abricots","prunes","reines-claudes","mirabelles","quetsches","cerises","pommes Gala","pommes Golden","pommes Granny Smith","pommes Pink Lady","fraises","framboises","myrtilles","mûres","groseilles","cassis","airelles","fraises des bois","bananes","mangues","ananas","fruits de la passion","avocats","papayes","litchis","kiwis","kiwis jaunes","grenades","caramboles","pitayas","fruits du dragon","kakis","maracujas","physalis","mangoustans","ramboutans","melon Charentais","melon jaune", "melon brodé","melon vert","pastèque","pastèque sans pépins","mini pastèque","noix","noisettes","amandes","dattes", "figues séchées","raisins secs","pruneaux","pignons de pin","noix de cajou","noix de pécan","noix de macadamia","pistaches","tomates","tomates cerises","tomates grappe","tomates cœur de bœuf","tomates Roma","poivrons","poivrons rouges","poivrons verts","poivrons jaunes","courgettes","aubergines","concombres","concombres noa","salades","laitues","batavia","feuille de chêne","roquette","mâche","épinards","blettes","endives","chicorée","frisée","romana","pissenlit","mesclun","pousses d'épinard","pommes de terre","carottes","navets","radis","radis roses","radis noirs","betteraves","céleris-raves","panais","topinambours","rutabagas","patates douces","ignames","manioc","crosnes","chou-fleur","brocoli","chou vert","chou rouge","chou de Bruxelles","chou kale","chou chinois","chou romanesco","chou rave", "oignons","oignons jaunes","oignons rouges","oignons doux","ail","ail blanc","ail violet","ail rose","échalotes","ciboule","céleri-branche","poireaux","potiron","potimarron","courge butternut","courge spaghetti","patidou","courge musquée","giraumon","petits pois","haricots verts","haricots beurre","fèves","mangetouts","pois gourmands","champignons de Paris","girolles","cèpes","shiitakés","pleurotes","morilles","trompettes de la mort","enokitaké","persil","persil plat","persil frisé","basilic","ciboulette","menthe fraîche","coriandre","thym","romarin","aneth","estragon","sauge","cerfeuil","laurier","marjolaine","sarriette","gingembre frais","curcuma frais","piments-frais","raifort","citronnelle","légumes découpés","salades préparées","fruits épluchés","jus de fruits frais","gaspacho","poêlées de légumes","soupes fraîches","brochettes de fruits","bâtonnets de légumes"]
  },
  {
    id: "boulangerie",
    nom: "🥖 Boulangerie & Pâtisserie",
    ordre: 2,
    motscles: ["pain","baguette","croissant","brioche","viennoiserie","pain de mie","bruchetta",
      "pain complet","biscotte","pain burger","tortilla","chausson","pain frais","pain de mie","baguette","baguette tradition","pain complet","pain de campagne","pain aux céréales","pain de seigle","pain bio","pain sans gluten","croissants","chocolatines","brioches","brioche tressée","chouquettes","chouquettes fraîches","pains aux raisins","chaussons aux pommes","donuts","muffins","pâtisseries fraîches","tartes aux fruits","tarte aux pommes","tarte au citron méringuée","éclair au chocolat","éclair au café","millefeuille","religieuse","paris-brest","gâteaux d'anniversaire","macarons","flan pâtissier","pâte à choux","pâte feuilletée","pâte brisée","pâte sablée","galette des rois","pain spécial","biscottes","pains grillés","toast","pains pour burger","pains pour hot-dog","pains pita","pains naan","tortillas","wraps","boulangerie artisanale","pâtisserie fine"]
  },
  {
    id: "cremerie",
    nom: "🧀 Crémerie",
    ordre: 3,
    motscles: ["lait","yaourt","yogourt","fromage","beurre","crème","crème fraîche",
      "oeuf","œuf","fromage blanc","mozzarella","bille de mozza","emmental","comté","camembert",
      "petit suisse","margarine","crémerie","produits laitiers","lait","lait entier","lait demi-écrémé","lait écrémé","lait bio","lait sans lactose","lait de croissance","beurre","beurre doux","beurre demi-sel","beurre bio","crème fraîche","crème fraîche épaisse","crème fluide","crème liquide","crème légère","crème chantilly","yaourts","yaourt nature","yaourts aux fruits","yaourts brassés","yaourts grecs","skyr","fromage blanc","petit-suisse","faisselle","desserts laitiers","crème dessert","mousse au chocolat","riz au lait","îles-flottantes","puddings","fromages","camembert","brie","coulommiers","comté","emmental","emmental râpé","gruyère","parmesan","roquefort","bleu d'auvergne","chèvre","bûche de chèvre","crottin de chavignol","raclette","fondue","reblochon","tartiflette","mozzarella","burrata","ricotta","mascarpone","feta","cheddar","mimolette","gouda","edam","fromage à tartiner","fromage fondu","aliments végétaux","boissons végétales","lait d'amande","lait de soja","lait d'avoine","lait de riz","beurre végétal","margarine","yaourts végétaux"]
  },
  {
    id: "viande-poisson",
    nom: "🥩 Viande & Poisson",
    ordre: 4,
    motscles: ["poulet","boeuf","bœuf","porc","steak","saucisse","jambon","poisson","saumon","thon","dinde","agneau","merguez","lardons","chorizo","haché","escalope","filet","crevette","cabillaud","viande","poisson","boucherie","charcuterie","poissonnerie","viande bovine","bœuf","steak haché","entrecôte","faux-filet","rôti de bœuf","rumsteak","veau","steak de veau","escalope de veau","rôti de veau","blanquette de veau","porc","côtes de porc","rôti de porc","filet mignon","saucisses","chipolatas","merguez","agneau","gigot d'agneau","côtelettes d'agneau","volaille","poulet","poulet fermier","escalope de poulet","cuisses de poulet","dinde","escalope de dinde","canard","magret de canard","cuisse de canard","lapin","charcuterie","jambon blanc","jambon cru","jambon de bayonne","jambon de parme","saucisson sec","rosette","bacon","lardons","pâté","terrine","foie gras","rillettes","boudin noir","boudin blanc","andouillette","poisson frais","saumon","pavé de saumon","cabillaud","dos de cabillaud","colin","lieu noir","truite","bar","loup de mer","dorade","sole","merlu","sardines fraîches", "maquereaux","thon frais","crevettes","crevettes cuites","gambas","langoustines","homard", "crabes","moules","huîtres","coquilles saint-jacques","encornets","seiches","poulpe","poisson fumé","saumon fumé","truite fumée","haddock","surimi","traiteur de la mer","carpaccio de bœuf","carpaccio de saumon","tartare de bœuf"]
  },
  {
    id: "epicerie-salee",
    nom: "🍝 Épicerie salée",
    ordre: 5,
    motscles: ["pâtes","riz","farine","huile","sel","poivre","conserve","sauce tomate",
      "lentille","semoule","quinoa","épice","bouillon","vinaigre","moutarde",
      "ketchup","mayonnaise","boîte de conserve","thon en boîte","olives","cornichon","épicerie salée","pâtes","pâtes fraîches","spaghetti","coquillettes","penne","fusilli","lasagnes","riz","riz basmati","riz-thaï","riz-rond","rizar-borio","riz-complet","semoule","quinoa","boulgour","lentilles","lentilles vertes","lentilles corail","pois chiches","haricots blancs","haricots rouges","purée en flocons","conserves","conserves de légumes","boîtes de tomates","sauce tomate","double concentré de tomate", "sauce pesto", "sauce bolognaise", "sauce carbonara", "boîtes de thon","sardines en boîte","maquereaux en boîte","maïs en boîte","petits pois carottes en conserve","plats cuisinés", "cassoulet", "choucroute", "raviolis en boîte", "soupes en brique", "soupes déshydratées","bouillons cubiques","huiles","huile d'olive","huile de tournesol","huile de colza","huile de friture","vinaigres","vinaigre de vin","vinaigre de cidre","vinaigre balsamique","sel","sel fin","gros sel", "fleur de sel", "poivre", "épices", "paprika", "curry", "herbes de provence", "moutarde", "mayonnaise","ketchup","sauce soja","sauce barbecue","chips","chips ondulées","biscuits apéritifs","cacahuètes","noix de cajou grillées","pistaches apéritif","tuiles apéritives","crackers","pain de mie toast"]
  },
  {
    id: "epicerie-sucree",
    nom: "🍫 Épicerie sucrée",
    ordre: 6,
    motscles: ["sucre","chocolat","biscuit","gâteau","confiture","miel","céréales",
      "bonbon","pâte à tartiner","nutella","gaufre","compote","farine de blé",
      "levure","vanille","chips","épicerie sucrée","café","café moulu","café en grain","café en capsules","dosettes de café","café soluble","thé","thé noir","thé vert","infusions","tisanes","chocolat en poudre","sucre","sucre en poudre","sucre en morceaux","sucre glace","sucre vanillé","cassonade","stévia","miel","confiture","confiture de fraises","confiture d'abricots","marmelade","pâte à tartiner","pâte à tartiner noisette","chocolat","tablettes de chocolat","chocolat noir","chocolat au lait","chocolat blanc","chocolat pâtissier","biscuits","biscuits secs","cookies", "muffins","brownies","gaufres","crêpes","madeleines","financiers","boudoirs","biscuits petit beurre","céréales","céréales petit déjeuner","muesli","granola","flocons d'avoine","barres de céréales","bonbons","gummies","chewing-gums","sucettes","caramels","dragées","pâtisserie industrielle","quatre-quarts","pain d'épices","compotes","compotes en gourde","fruits au sirop","préparations gâteaux","levure chimique","levure boulangère","arôme vanille","pépites de chocolat"]
  },
  {
    id: "boissons",
    nom: "🥤 Boissons",
    ordre: 7,
    motscles: ["eau","jus","soda","coca","limonade","café","thé","vin","bière",
      "sirop","lait végétal","jus d'orange","boisson","boissons","eau","eau minérale","eau de source","eau gazeuse","eau pétillante","eau aromatisée","jus de fruits","jus d'orange","jus de pomme","jus multifruits","jus de pamplemousse","jus de raisin","jus de tomate","nectars","sirops", "sirop de grenadine","sirop de menthe","sirop de citron","sirop de fraise","sodas","colas","sodas sans sucre","limonades","boissons gazeuses","thé glacé","eaux aromatisées gazeuses","boissons énergisantes","boissons pour sportifs","bières","bière blonde","bière brune","bière ambrée","bière IPA","bière sans alcool","cidre","cidre doux","cidre brut","vins","vin rouge","vin blanc","vin rosé","vin bio","champagne","prosecco","mousseux","crémant","spiritueux","whisky","vodka","rhum","rhum blanc","rhum ambré","gin","tequila","liqueurs","apéritifs", "anisette","vermouth","cocktails prêts à boire"]
  },
  {
    id: "surgeles",
    nom: "🧊 Surgelés",
    ordre: 8,
    motscles: ["surgelé","glace","frites surgelées","pizza surgelée","légumes surgelés",
      "poisson pané","cordon bleu","surgelés","légumes surgelés","poêlées de légumes surgelées","frites surgelées","pommes noisettes","haricots verts surgelés","petits pois surgelés","épinards surgelés","fruits surgelés","fruits rouges surgelés","poissons surgelés","filets de cabillaud surgelés","pavés de saumon surgelés","bâtonnets de poisson pané","fruits de mer surgelés","crevettes surgelées","viandes surgelées","steaks hachés surgelés","volaille surgelée","nuggets de poulet surgelés","plats cuisinés surgelés","pizzas surgelées","pizza royale","pizza 4 fromages","quiches surgelées","tartes salées surgelées","lasagnes surgelées","paëlla surgelée","hachis parmentier surgelé","glaces","bâtonnets glacés","cônes glacés","bacs de glace","sorbets","vacherins glacés", "mystères","glaçons","glace pilée","pâtes feuilletées surgelées","viennoiseries surgelées","pains surgelés"]
  },
  {
    id: "hygiene-beaute",
    nom: "🧴 Hygiène & Beauté",
    ordre: 9,
    motscles: ["dentifrice","shampoing","savon","gel douche","déodorant","rasoir",
      "coton-tige","mouchoir","papier toilette","protection hygiénique","crème visage","hygiène", "beauté","soins du corps","gel douche","savon","savon de marseille","savon liquide", "déodorant","déodorant spray","déodorant bille","shampoing","après-shampoing","masque capillaire","soins des cheveux","coloration cheveux","gel coiffant","laque","soins du visage","crème hydratante","crème anti-rides","sérum visage","démaquillant","eau micellaire","nettoyant visage","baume à lèvres","hygiène dentaire","dentifrice","brosses à dents","brosses à dents électriques","fil dentaire","bain de bouche","rasage","rasoirs","rasoirs jetables","mousse à raser","gel à raser","après-rasage","épilation","bandes de cire","crème dépilatoire","hygiène féminine","serviettes hygiéniques","tampons","protège-slips","culottes menstruelles","coton","cotons-tiges","lingettes démaquillantes","papier toilette","mouchoirs en papier","préservatifs","lubrifiants","soins des mains","crème mains","gel hydroalcoolique"]
  },
  {
    id: "entretien-maison",
    nom: "🧽 Entretien & Maison",
    ordre: 10,
    motscles: ["lessive","liquide vaisselle","éponge","sac poubelle","essuie-tout",
      "papier essuie-tout","nettoyant","javel","adoucissant","ampoule","pile","entretien","maison","produits ménagers","lessive","lessive liquide","lessive en poudre","lessive en capsules","adoucissant","assouplissant","détachant","anti-décoloration","nettoyant multi-usages","nettoyant sol","produit vaisselle","liquide vaisselle","tablettes lave-vaisselle","sel régénérant","liquide de rinçage","nettoyant vitres","nettoyant salle de bain","anti-calcaire","eau de javel","déboucheur canalisations","désinfectant","spray désinfectant","éponges","éponges abrasives","lavettes microfibres","chiffons","balais","serpillières","seau","sacs poubelle","sacs poubelle recyclés","papier absorbant","essuie-tout","papier aluminium","film étirable","papier cuisson","sacs congélation","désodorisants","diffuseurs de parfum","bougies parfumées","ampoules","piles","piles AA","piles AAA","allumettes","briquets"]
  },
  {
    id: "bebe",
    nom: "👶 Bébé",
    ordre: 11,
    motscles: ["couche","lingette bébé","lait infantile","petit pot","compote bébé","bébé", "puériculture","couches","couches taille 1","couches taille 2","couches taille 3","couches taille 4","couches taille 5","couches-culottes","couches d'apprentissage","lingettes bébé","lingettes à l'eau","lait en poudre","lait bébé 1er âge","lait bébé 2ème âge","lait de croissance 3ème âge","petits pots","petits pots légumes","petits pots viande","petits pots fruits","gourdes de fruits bébé","assiettes bébé","céréales bébé","biberons","tétines","goupillons","sucettes","anneaux de dentition","soins bébé","liniment","eau nettoyante bébé","gel lavant bébé","shampoing bébé","crème change","coton bébé","mouchoirs bébé","mouche-bébé","bavoirs","transat bébé","poussettes","sièges auto"]
  },
  {
    id: "animaux",
    nom: "🐾 Animaux",
    ordre: 12,
    motscles: ["croquette","pâtée","litière","friandise chat","friandise chien","croquettes chien","croquettes chat","pâtée pour chien","pâtée pour chat","boîtes pour chien","boîtes pour chat","sachets fraîcheur chat","friandises chien","friandises chat","os à mâcher","litière chat","litières minérales","litières végétales","litières agglomérantes","accessoires animaux","colliers chien","laisses chien","harnais","jouets pour chien","jouets pour chat","arbre à chat","griffoir","gamelles","paniers chien","coussins chat","cages de transport","anti-puces","anti-tiques","vermifuges","shampoing chien","nourriture oiseaux","graines pour oiseaux","boules de graisse", "nourriture poissons","flocons poissons","nourriture rongeurs","foin rongeurs","paille","cage rongeurs"]
  },
  {
    id: "informatique",
    nom: "💻 Informatique",
    ordre: 13,
    motscles: ["ordinateur","souris","clavier","câble usb","cable usb","chargeur",
      "disque dur","clé usb","ecran","écran","imprimante","cartouche encre","chargeur 65Watt pour PC",
      "casque audio","webcam","batterie externe","adaptateur","high-tech","ordinateurs","ordinateurs portables","PC portable","MacBook","ordinateurs de bureau","PC gamer","écrans","moniteurs","claviers","claviers sans fil","claviers mécaniques","souris","souris sans fil","souris ergonomiques","tapis de souris","imprimantes","imprimantes jet d'encre","imprimantes laser","cartouches d'encre","toner","papier imprimante","disques durs externes","SSD externes","clés USB","cartes mémoire SD","cartes micro SD","casques audio","casques gamer","écouteurs sans fil","enceintes PC","webcams","microphones USB","routeurs Wi-Fi","répétiteurs Wi-Fi","câbles Ethernet","câbles HDMI","câbles USB-C","adaptateurs","multiprises","onduleurs","housses ordinateur","sacs à dos ordinateur"]
  },
  {
    id: "librairie",
    nom: "📚 Librairie",
    ordre: 14,
    motscles: ["livre","roman","bd","bande dessinée","magazine","cahier","carnet",
      "stylo","crayon","gomme","classeur","feutre","agenda","enveloppe",
      "papier","surligneur","calculatrice","librairie","livres","romans","romans policiers","thrillers","science-fiction","fantasy", "manga","bandes dessinées","comics","livres jeunesse","albums illustrés","livres pour enfants","livres ados","littérature française", "littérature étrangère","essais","biographies","livres d'histoire","livres de cuisine","livres de développement personnel","livres de santé et bien-être","livres d'art","guides de voyage","dictionnaires","bescherelle","manuels scolaires","cahiers de vacances","livres de poche","Ebooks","livres audio","papeterie","cahiers","bloc-notes","stylos","agendas","marque-pages"]
  },
  {
    id: "auto",
    nom: "🚗 Auto",
    ordre: 15,
    motscles: ["huile moteur","essuie-glace","liquide lave-glace","ampoule voiture",
      "antigel","chiffon","voiture","pneu","batterie voiture","recharge",
      "produit lavage auto","désodorisant voiture","entretien auto","accessoires auto","huile moteur","huile 5W30","huile 10W40","liquide de refroidissement","liquide de frein","lave-glace","lave-glace été","lave-glace hiver","antigel","balais d'essuie-glace","ampoules auto","fusibles auto","batteries auto","câbles de démarrage","chargeurs de batterie","nettoyant jantes","shampoing auto","efface-rayures","lustrant auto","nettoyant plastique","désodorisants auto","arbre magique","aspirateurs auto","housses de siège","tapis de sol auto","pare-soleil","supports téléphone auto","chargeurs allume-cigare","éthylotests","gilets jaunes","triangles de signalisation","extincteurs auto","pression pneu","gonfleurs pneu","bombes anti-crevaison","chaînes neige","chaussettes neige"]
  },
  {
    id: "vetements",
    nom: "👕 Vêtements",
    ordre: 16,
    motscles: ["t-shirt","tshirt","pantalon","chaussette","sous-vêtement",
      "pull","veste","chaussure","short","robe","jupe","manteau","legging",
      "collant","pyjama","maillot de bain","vêtements","mode","prêt-à-porter","habits","textile","vêtements homme","vêtements femme","vêtements enfant","vêtements bébé","mode éco-responsable","t-shirts","t-shirt col V","t-shirt col rond","débardeurs","chemises","chemisiers","polos","pulls","pulls en maille","gilets","sweats","sweats à capuche","vestes","vestes en jean","blazers","manteaux","doudounes","parkas","imperméables","pantalons","jeans","jeans slim","jeans droit","pantalons cargo","leggings","shorts","bermudas","jupes","jupes longues","jupes courtes","robes","robes d'été","robes de soirée","combinaisons","salopettes","sous-vêtements","lingerie","soutiens-gorge","culottes","boxers","slips","chaussettes","collants","pyjamas","chemises de nuit","peignoirs","vêtements de sport","survêtements","leggings de sport","maillots de bain","bikinis","shorts de bain","chaussures","baskets","sneakers","bottes","bottines","sandales","chaussons","ceintures","écharpes","bonnets","gants","chapeaux","casquettes"]
  },
  {
    id: "bricolage",
    nom: "🔧 Bricolage",
    ordre: 17,
    motscles: ["vis","clou","marteau","tournevis","perceuse","peinture",
      "pinceau","ruban adhésif","colle","ampoule","scie","mètre","cheville",
      "silicone","joint","bricolage", "outillage", "quincaillerie", "matériaux","travaux","rénovation","outils à main","marteaux","tournevis","pinces","pince multiprise","clé à molette","clés allen","scies à main","niveaux à bulle","mètres rubans","cutters","rabots","limes","outillage électroportatif","perceuses","perceuses visseuses","perforateurs","scies sauteuses", "scies circulaires","meuleuses","ponceuses","décapeurs thermiques","fer à souder","compresseurs","vis","vis à bois","vis à métaux","chevilles","clous","boulons","écrous","rondelles","charnières","serrures","verrous","crochets","équerres","pattes de fixation","peinture","peinture murale","peinture plafond","peinture bois","peinture fer","sous-couche","pinceaux","rouleaux de peinture","bacs à peinture","ruban de masquage","enduit de rebouchage","enduit de lissage","vernis","lasures","solvants","white spirit","plomberie","tuyaux PVC","raccords","joints","robinetterie","électricité","câbles électriques","gaines","prises électriques","interrupteurs","disjoncteurs","dominos","ampoules","rallonges","multiprises","silicone","mousse expansée","colles","colle forte","colle à bois","abrasifs","papier de verre","équipements de protection","gants de travail","masques de protection","lunettes de protection","casques anti-bruit","échelles","escabeaux"]
  },
  {
    id: "jeux-video",
    nom: "🎮 Jeux Vidéo",
    ordre: 18,
    motscles: ["jeu vidéo","jeu video","console","manette","playstation","xbox",
      "nintendo","switch","ps5","ps4","jeu pc","carte cadeau jeu","casque gaming","jeux vidéo","gaming","consoles","consoles de jeux","retrogaming","e-sport","accessoires gaming","PS5","PlayStation 5","PS4","PlayStation 4","Xbox Series X","Xbox Series S","Xbox One","Nintendo Switch","Nintendo Switch OLED","PC gamer","casques réalité virtuelle","casques VR","jeux PC","jeux PS5","jeux PS4","jeux Xbox","jeux Switch","jeux d'action","jeux d'aventure","RPG","jeux de rôle","FPS","jeux de tir","jeux de course","jeux de sport","jeux de simulation","jeux de stratégie","jeux de combat","jeux de plateforme","MMORPG","jeux d'horreur","jeux pour enfants","jeux de société vidéo","manettes","manette PS5 DualSense","manette Xbox","manettes Joy-Con","volants de course","pédaliers","casques gaming","claviers gamer","souris gamer","tapis de souris XXL","sièges gamer","chaises gaming","cartes prépayées","abonnements gaming","PlayStation Plus","Xbox Game Pass","cartes Nintendo eShop","recharges portefeuilles gaming"]
  },
  {
    id: "dvd-bluray",
    nom: "📀 DVD / Blu-Ray",
    ordre: 19,
    motscles: ["DVD","Blu-Ray","Blu-Ray 4K Ultra HD","4K UHD","cinéma","films","séries TV","séries","coffrets DVD","coffrets intégrales","éditions collector","éditions steelbook","nouveautés DVD","classiques du cinéma","films d'action","comédies","drames","science-fiction","fantastique","films d'animation","dessins animés","mangas d'animation","animes","thrillers","films d'horreur","documentaires","films policiers","films romantiques","films d'aventure","westerns","comédies musicales","films pour enfants","sagas","trilogies","spectacles humoristiques","concerts en DVD","opéras en DVD","cinéma français","cinéma international"]
  },
  {
    id: "musique",
    nom: "🎵 Musique",
    ordre: 20,
    motscles: ["cd","album","vinyle","disque vinyle","musique","enceinte",
      "casque audio musique","musique","CD audio","vinyles","disques vinyles","vinyles 33 tours","vinyles 45 tours","vinyles couleur","éditions limitées vinyles","coffrets collector","albums","singles","variété française","variété internationale","pop","pop-rock","rock","hard rock","metal","heavy metal","rap","rap français","rap US","hip-hop","R&B","musique classique","opéra","jazz","blues","electro","techno","house","dance","reggae","dub","soul","funk","disco","country","musique du monde","latino","bandes originales","musiques de films","BOF","comptines pour enfants","musiques de relaxation","platines vinyles","lecteurs CD","accessoires vinyles","pochettes de protection vinyles","nettoyant vinyle"]
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

