import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminCommandes() {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    // Chargez les commandes en cours depuis l'API lors du chargement de la page
    axios.get('http://localhost:8000/commandes') // Utilisez l'URL complète avec le port 8000
      .then(response => {
        setCommandes(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des commandes en cours :', error);
      });
  }, []);

  const handleSupprimerCommande = (commandeId) => {
    // Envoyez une demande de suppression de commande à l'API
    axios.delete(`http://localhost:8000/commandes/${commandeId}`) // Utilisez l'URL complète avec le port 8000
      .then(response => {
        if (response.status === 200) {
          // Mettez à jour la liste des commandes après la suppression
          setCommandes(commandes.filter(commande => commande._id !== commandeId));
        }
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de la commande :', error);
      });
  };

  return (
    <div>
      <h2>Gestion des Commandes</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Commande ID</th>
            <th>Client</th>
            <th>Date de Commande</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map(commande => (
            <tr key={commande._id}>
              <td>{commande._id}</td>
              <td>{commande.clientId}</td>
              <td>{new Date(commande.dateCommande).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleSupprimerCommande(commande._id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCommandes;
