import React, { useState } from 'react';
import { QrCode, ArrowRight } from 'lucide-react';

const ClientLogin = ({ onLogin }) => {
  const [clientId, setClientId] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Cette logique sera remplacée par un appel API
    const mockClients = [
      { id: 1, reference: 'CLI001', nom: 'Dupont', prenom: 'Jean', adresse: '12 rue de la Paix', commune: 'Paris', rdv: { date: '2025-06-20', creneau: 'matin', statut: 'planifie' } },
      { id: 2, reference: 'CLI002', nom: 'Martin', prenom: 'Marie', adresse: '34 avenue Victor Hugo', commune: 'Lyon', rdv: { date: '2025-06-22', creneau: 'apres-midi', statut: 'planifie' } }
    ];
    
    const client = mockClients.find(c => c.reference === clientId);
    if (client) {
      onLogin(client);
    } else {
      setError('ID client non trouvé');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <QrCode className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Accès Client</h2>
          <p className="text-gray-600 mt-2">Consultez et modifiez votre rendez-vous</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID Client
            </label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="Entrez votre ID client (ex: CLI001)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2"
          >
            <span>Accéder à mon rendez-vous</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Scannez votre QR code ou utilisez votre identifiant</p>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;