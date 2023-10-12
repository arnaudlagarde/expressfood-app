import React, { useState, useEffect } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import axios from 'axios';

//import ordersData from '../data/orders.json';

function OrderTracking() {
  const [clientOrders, setClientOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id

  useEffect(() => {
    const api = axios.create({
      baseURL: 'http://localhost:8000', // Assurez-vous que l'URL correspond à l'endroit où votre serveur Express est en cours d'exécution
    });

    api
      .get(`/orders?clientId=${userId}`)
      .then((response) => {
        setClientOrders(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des commandes du client :', error);
      });
  }, [userId]);

  // Fonction pour calculer l'heure d'arrivée estimée
  const calculateEstimatedArrivalTime = (order) => {
    const orderDate = new Date(order.dateCommande);
    const estimatedArrivalTime = new Date(orderDate);
    
    // Générer un nombre aléatoire entre 20 et 45 pour les minutes
    const randomMinutes = Math.floor(Math.random() * (45 - 20 + 1)) + 20;
    
    // Ajouter les minutes aléatoires à l'heure de commande
    estimatedArrivalTime.setMinutes(estimatedArrivalTime.getMinutes() + randomMinutes);
    
    return estimatedArrivalTime.toLocaleTimeString();
  };

  return (
    <div>
      <Container>
        <h2>Suivi de Commande</h2>
        <ListGroup>
          {clientOrders.map((order, index) => (
            <ListGroup.Item key={index}>
              <strong>Commande #{order._id}</strong>
              <p>Plats commandés:</p>
              <ul>
                {order.plats.map((item, i) => (
                  <li key={i}>
                    {item.quantite} x {item.platId}
                  </li>
                ))}
              </ul>
              <p>Statut : {order.statut}</p>
              <p>Heure d'arrivée estimée : {calculateEstimatedArrivalTime(order)}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
}

export default OrderTracking;
