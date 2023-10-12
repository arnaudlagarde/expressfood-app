// Import des modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');

// Création de l'application Express
const app = express();


// Configuration de MongoDB
mongoose.connect("mongodb+srv://nadimhamimid:nadim1234@cluster0.gnbsw2l.mongodb.net/Restaurant", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connexion à la base de données MongoDB réussie");
}).catch((error) => {
    console.error("Erreur de connexion à la base de données MongoDB :", error);
});

// Modèle Clients
const clientSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    distance: Number
}, { collection: "Clients" });

const Client = mongoose.model("Client", clientSchema);

const platSchema = new mongoose.Schema({
    nom: String,
    type: String,
    description: String,
    prix: Number,
    image: String,
}, { collection: "Plats" });

const Plat = mongoose.model("Plat", platSchema);

//le modèle Livreur
const livreurSchema = new mongoose.Schema({
    nom: String,
    statut: String,
    latitude: Number,
    longitude: Number,
}, { collection: "Livreurs" });

const Livreur = mongoose.model("Livreur", livreurSchema);

//le modèle Commande
const commandeSchema = new mongoose.Schema({
    clientId: String,
    plats: [
        {
            platId: String,
            quantite: Number,
        },
    ],
    dateCommande: Date,
    statut: String,
    livreurId: String,
}, { collection: "Commandes" });

const Commande = mongoose.model("Commande", commandeSchema);

app.use(express.json());

// Middleware pour gérer les données JSON
app.use(bodyParser.json());

// Middleware pour autoriser les requêtes CORS
app.use(cors());

// Enregistrement d'un nouvel utilisateur (inscription)
app.post("/inscription", async (req, res) => {
    try {
        const newClient = new Client(req.body);
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de l'inscription" });
    }
});

// Connexion de l'utilisateur (vérification des informations)
app.post("/connexion", async (req, res) => {
    const { email, password } = req.body;

    try {
        const client = await Client.findOne({ email });

        if (!client) {
            return res.status(401).json({ error: "Adresse e-mail incorrecte" });
        }

        // Vous devrez ajouter la logique de hachage de mot de passe ici
        // Comparer le mot de passe reçu (req.body.password) avec le mot de passe stocké dans la base de données (client.password)

        if (password === client.password) {
            // Le mot de passe est correct, vous pouvez permettre la connexion
            return res.status(200).json(client);
        } else {
            return res.status(401).json({ error: "Mot de passe incorrect" });
        }
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de la connexion" });
    }
});

// Créez une nouvelle route pour gérer les commandes
app.post("/commandes", async (req, res) => {
    try {
        const nouvelleCommande = new Commande(req.body);
        nouvelleCommande.statut = "En cours"; // Par défaut, la commande est "En cours"

        await nouvelleCommande.save();

        res.status(201).json(nouvelleCommande);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création de la commande" });
    }
});


//route pour récupérer les commandes (avec id du client a mettre en paramètre cf. OrderTracking.js)
app.get('/orders', async (req, res) => {
    try {
        const clientId = req.query.clientId; // Récupérez l'ID du client à partir de la requête

        // Effectuez une requête pour obtenir les commandes pour ce client
        const clientOrders = await Commande.find({ clientId: clientId }).exec();

        res.status(200).json(clientOrders);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des commandes du client" });
    }
});



//route pour récupérer tous les livreurs
app.get("/livreurs", async (req, res) => {
    try {
        const livreurs = await Livreur.find().exec();
        res.status(200).json(livreurs);
    } catch (error) {
        console.error("Erreur lors de la récupération des livreurs :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des livreurs" });
    }
});


// Route pour obtenir la liste des livreurs avec le statut "libre"
app.get("/livreurs-libres", async (req, res) => {
    try {
        const livreursLibres = await Livreur.find({ statut: "libre" }).exec();
        res.status(200).json(livreursLibres);
    } catch (error) {
        console.error("Erreur lors de la récupération des livreurs libres :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des livreurs libres" });
    }
});


// Route pour obtenir les plats du jour
app.get("/plats_du_jour", async (req, res) => {
    try {
        // Requête pour récupérer tous les plats de type "Plat"
        const plats = await Plat.find({ type: "Plat" }).exec();

        // Requête pour récupérer tous les desserts de type "Dessert"
        const desserts = await Plat.find({ type: "Dessert" }).exec();

        // Sélectionnez aléatoirement 2 plats parmi tous les plats disponibles
        const platsAleatoires = _.sampleSize(plats, 2);

        // Sélectionnez aléatoirement 2 desserts parmi tous les desserts disponibles
        const dessertsAleatoires = _.sampleSize(desserts, 2);

        // Combiner les plats et les desserts aléatoires en une seule liste
        const menuDuJour = [...platsAleatoires, ...dessertsAleatoires];

        res.status(200).json(menuDuJour);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des plats du jour" });
    }
});

// Route pour obtenir tous les plats
app.get("/menu", async (req, res) => {
    try {
        // Requête pour récupérer tous les plats
        const tousLesPlats = await Plat.find().exec();

        res.status(200).json(tousLesPlats);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de tous les plats" });
    }
});

// Démarrage du serveur
const port = 8000;
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
