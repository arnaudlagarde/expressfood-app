import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Chargez la liste des utilisateurs depuis l'API lors du chargement de la page
    axios.get('http://localhost:8000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      });
  }, []);

  const handleSupprimerUtilisateur = (userId) => {
    // Envoyez une demande de suppression de l'utilisateur à l'API
    axios.delete(`http://localhost:8000/users/${userId}`)
      .then(response => {
        if (response.status === 200) {
          // Mettez à jour la liste des utilisateurs après la suppression
          setUsers(users.filter(user => user._id !== userId));
        }
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      });
  };

  return (
    <div>
      <h2>Gestion des Utilisateurs</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Utilisateur ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleSupprimerUtilisateur(user._id)}
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

export default AdminUsers;
