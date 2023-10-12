import React from "react";

function MentionsLegales() {
    const randomData = {
        entreprise: {
            nom: "ExpressFood",
            adresse: "123 Rue de la Startup, 75000 Paris",
            telephone: "+33 1 23 45 67 89",
            email: "contact@expressfood.com",
        },
        directeur: {
            nom: "John Doe",
            email: "john.doe@example.com",
        },
        hebergeur: {
            nom: "Hosting Company",
            adresse: "456 Hosting Street, 12345 Hosting City",
        },
    };

    return (
        <div className="container mt-5">
            <h1 className="display-4">Mentions Légales</h1>
            <div className="row">
                <div className="col-lg-8">
                    <h2>Informations sur l'entreprise</h2>
                    <p>
                        {randomData.entreprise.nom} est une startup spécialisée dans la
                        livraison rapide de plats à domicile. Elle opère une application Web
                        basée sur Django, une base de données MongoDB sur Atlas, et un
                        front-end avec React JS.
                    </p>

                    <h2>Coordonnées</h2>
                    <ul>
                        <li>Raison sociale : {randomData.entreprise.nom}</li>
                        <li>Adresse : {randomData.entreprise.adresse}</li>
                        <li>Téléphone : {randomData.entreprise.telephone}</li>
                        <li>Email : {randomData.entreprise.email}</li>
                    </ul>

                    <h2>Directeur de la publication</h2>
                    <ul>
                        <li>Nom : {randomData.directeur.nom}</li>
                        <li>Email : {randomData.directeur.email}</li>
                    </ul>

                    <h2>Hébergement du site</h2>
                    <p>
                        Le site est hébergé par {randomData.hebergeur.nom} :<br />
                        Adresse : {randomData.hebergeur.adresse}
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8">
                    <h2>Collecte de données personnelles</h2>
                    <p>
                        {randomData.entreprise.nom} collecte des données personnelles de
                        ses clients conformément aux règles du RGPD (Règlement général sur
                        la protection des données). Les informations collectées sont utilisées
                        uniquement à des fins de gestion des commandes et de communication
                        avec les clients.
                    </p>

                    <h2>Propriété intellectuelle</h2>
                    <p>
                        Tous les éléments du site web, tels que les textes, les images, les
                        vidéos, les logos, et les designs, sont la propriété exclusive
                        d'{randomData.entreprise.nom} et sont protégés par les lois sur la
                        propriété intellectuelle.
                    </p>

                    <h2>Responsabilité</h2>
                    <p>
                        {randomData.entreprise.nom} ne saurait être tenu responsable des
                        erreurs présentes sur le site, des éventuelles interruptions de service,
                        ou de tout dommage résultant de l'utilisation du site ou de l'application.
                    </p>

                    <h2>Crédits</h2>
                    <p>
                        Ce site a été développé par Arnaud, Nadim, Rudy & Pierre-Antoine et utilise les
                        technologies suivantes : Node, MongoDB, React JS.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MentionsLegales;
