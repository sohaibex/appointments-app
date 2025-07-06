import React, { useState } from 'react';

const UserManagement = () => {
  const [pendingAccounts, setPendingAccounts] = useState([
    { id: 1, email: 'planificateur1@example.com', commune: 'Paris', date: '2025-06-10' },
    { id: 2, email: 'planificateur2@example.com', commune: 'Lyon', date: '2025-06-11' }
  ]);
  
  const handleApproveAccount = (id) => {
    setPendingAccounts(pendingAccounts.filter(account => account.id !== id));
    alert('Compte approuvé avec succès');
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Comptes en attente d'approbation</h2>
      {pendingAccounts.length > 0 ? (
        <div className="space-y-4">
          {pendingAccounts.map(account => (
            <div key={account.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">{account.email}</p>
                <p className="text-sm text-gray-600">Commune : {account.commune} • Demande : {account.date}</p>
              </div>
              <button
                onClick={() => handleApproveAccount(account.id)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Approuver
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Aucun compte en attente</p>
      )}
    </div>
  );
};

export default UserManagement;