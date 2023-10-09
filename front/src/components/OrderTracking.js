import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import ordersData from '../data/orders.json';

function OrderTracking() {
  return (
    <div>
      <Container>
        <h2>Suivi de Commande</h2>
        <ListGroup>
          {ordersData.map((order, index) => (
            <ListGroup.Item key={index}>
              <strong>Commande #{order.orderId}</strong>
              <p>Plats commandés:</p>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.quantity} x {item.name} ({item.price} € chacun)
                  </li>
                ))}
              </ul>
              <p>Total de la commande : {order.orderTotal} €</p>
              <p>Statut : {order.status}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
}

export default OrderTracking;
