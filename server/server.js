// Import des modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');

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

const clientSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    distance: Number,
    est_administrateur: Boolean
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


const livreurSchema = new mongoose.Schema({
    nom: String,
    statut: String,
    latitude: Number,
    longitude: Number,
}, { collection: "Livreurs" });

const Livreur = mongoose.model("Livreur", livreurSchema);

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

app.use(bodyParser.json());

app.use(cors());

app.post("/inscription", async (req, res) => {
    try {
        const newClientData = req.body;

        // Vérifiez si la case à cocher "Administrateur" est cochée
        newClientData.est_administrateur = req.body.est_administrateur === true;

        const newClient = new Client(newClientData);

        // Enregistrez le nouvel utilisateur dans la base de données
        await newClient.save();

        res.status(201).json(newClient);
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de l'inscription" });
    }
});

app.post("/connexion", async (req, res) => {
    const { email, password } = req.body;

    try {
        const client = await Client.findOne({ email });

        if (!client) {
            return res.status(401).json({ error: "Adresse e-mail incorrecte" });
        }


        if (password === client.password) {

            return res.status(200).json(client);
        } else {
            return res.status(401).json({ error: "Mot de passe incorrect" });
        }
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de la connexion" });
    }
});

app.post("/commandes", async (req, res) => {
    try {
        const nouvelleCommande = new Commande(req.body);
        nouvelleCommande.statut = "En cours";

        const livreurId = req.body.livreurId;

        await Livreur.findByIdAndUpdate(livreurId, { statut: "occupé" });

        await nouvelleCommande.save();

        res.status(201).json(nouvelleCommande);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création de la commande" });
    }
});


app.get('/orders', async (req, res) => {
    try {
        const clientId = req.query.clientId;

        const clientOrders = await Commande.find({ clientId: clientId }).exec();

        res.status(200).json(clientOrders);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des commandes du client" });
    }
});



app.get("/livreurs", async (req, res) => {
    try {
        const livreurs = await Livreur.find().exec();
        res.status(200).json(livreurs);
    } catch (error) {
        console.error("Erreur lors de la récupération des livreurs :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des livreurs" });
    }
});


app.get("/livreurs-libres", async (req, res) => {
    try {
        const livreursLibres = await Livreur.find({ statut: "libre" }).exec();
        res.status(200).json(livreursLibres);
    } catch (error) {
        console.error("Erreur lors de la récupération des livreurs libres :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des livreurs libres" });
    }
});


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

app.get("/menu", async (req, res) => {
    try {
        const tousLesPlats = await Plat.find().exec();

        res.status(200).json(tousLesPlats);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de tous les plats" });
    }
});

app.get("/commandes", async (req, res) => {
    try {
        const commandesEnCours = await Commande.find({ statut: "En cours" }).exec();
        res.status(200).json(commandesEnCours);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des commandes en cours" });
    }
});


app.put("/update-profile/:email", async (req, res) => {
    const { email } = req.params;
    const updatedData = req.body;

    try {
        const updatedUser = await Client.findOneAndUpdate(
            { email: email },
            updatedData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du profil" });
    }
});

app.put("/orders/:orderId", async (req, res) => {
    const { orderId } = req.params;
    const updatedStatus = req.body.statut;

    try {
        const updatedOrder = await Commande.findByIdAndUpdate(orderId, { statut: updatedStatus }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ error: "Commande non trouvée" });
        }


        if (updatedStatus === "Livré") {
            const livreurId = updatedOrder.livreurId;


            await Livreur.findByIdAndUpdate(livreurId, { statut: "libre" });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du statut de commande" });
    }
});



app.get("/profile/:email", async (req, res) => {
    const { email } = req.params;

    try {
        const user = await Client.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération du profil" });
    }
});

app.get("/plats_et_desserts_du_jour", async (req, res) => {
    try {
        const platsDuJour = await Plat.find({ type: "Plat" }).limit(2);
        const dessertsDuJour = await Plat.find({ type: "Dessert" }).limit(2);

        res.status(200).json({ plats: platsDuJour, desserts: dessertsDuJour });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des plats et desserts du jour" });
    }
});

app.delete("/commandes/:commandeId", async (req, res) => {
    try {
        const { commandeId } = req.params;

        const commande = await Commande.findById(commandeId).exec();

        if (!commande) {
            return res.status(404).json({ error: "Commande non trouvée" });
        }

        await Commande.findByIdAndRemove(commandeId).exec();

        res.status(200).json({ message: "Commande supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de la commande" });
    }
});

app.get("/users", async (req, res) => {
    try {
        const users = await Client.find().exec();
        res.status(200).json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
    }
});

app.delete("/users/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const deletedUser = await Client.findByIdAndRemove(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.status(200).json(deletedUser);
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" });
    }
});


app.use((req, res, next) => {
    res.status(404).send("Désolé, cette page n'existe pas !");
});



const port = 8000;
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
