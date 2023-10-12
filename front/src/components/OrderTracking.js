import React, { useState, useEffect } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import axios from 'axios';

function OrderTracking() {
  const [clientOrders, setClientOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  useEffect(() => {
    const api = axios.create({
      baseURL: 'http://localhost:8000',
    });

    const calculateEstimatedArrivalTime = (order) => {
      const orderDate = new Date(order.dateCommande);
      const estimatedArrivalTime = new Date(orderDate);

      const randomMinutes = Math.floor(Math.random() * (45 - 20 + 1)) + 20;
      estimatedArrivalTime.setMinutes(estimatedArrivalTime.getMinutes() + randomMinutes);

      return estimatedArrivalTime;
    };

    api.get(`/orders?clientId=${userId}`)
      .then((response) => {
        const ordersWithEstimatedArrival = response.data.map((order) => ({
          ...order,
          estimatedArrivalTime: calculateEstimatedArrivalTime(order),
        }));
        setClientOrders(ordersWithEstimatedArrival);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des commandes du client :', error);
      });
  }, [userId]);

  useEffect(() => {
    const api = axios.create({
      baseURL: 'http://localhost:8000',
    });

    const updateOrderStatus = (order) => {
      const currentDate = new Date();
      const estimatedArrivalTime = new Date(order.estimatedArrivalTime);

      if (
        (currentDate > estimatedArrivalTime && order.statut === 'En cours') ||
        (currentDate.getDate() === estimatedArrivalTime.getDate() &&
          estimatedArrivalTime < currentDate && order.statut === 'En cours')
      ) {
        api.put(`/orders/${order._id}`, { statut: 'Livré' })
          .then(() => {
            const updatedOrders = clientOrders.map((o) => (o._id === order._id ? { ...o, statut: 'Livré' } : o));
            setClientOrders(updatedOrders);
          })
          .catch((error) => {
            console.error('Erreur lors de la mise à jour du statut de commande :', error);
          });
      }
    };

    const interval = setInterval(() => {
      clientOrders.forEach((order) => updateOrderStatus(order));
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [clientOrders]);

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
              <p>Heure d'arrivée estimée : {order.estimatedArrivalTime.toLocaleTimeString()}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
}

export default OrderTracking;
