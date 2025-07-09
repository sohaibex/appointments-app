import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Edit3, CheckCircle } from 'lucide-react';
import Header from '../common/Header';
import TimeSlotSelector from './TimeSlotSelector';
import AppointmentView from './AppointmentView';

const ClientDashboard = ({ client, onModifyAppointment, onLogout }) => {
  const [showModification, setShowModification] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  
  useEffect(() => {
    // Simuler la récupération des créneaux disponibles
    const slots = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      slots.push({
        date: date.toISOString().split('T')[0],
        matin: Math.random() > 0.3,
        apresMidi: Math.random() > 0.3
      });
    }
    setAvailableSlots(slots);
  }, []);
  
  const handleModification = (date, creneau) => {
    onModifyAppointment(client.id, date, creneau);
    setShowModification(false);
  };
  
  return (
    <>
      <Header userType="client" onLogout={onLogout} />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Info client */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <User className="w-6 h-6 mr-2 text-blue-600" />
                Informations personnelles
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Référence client</p>
                  <p className="font-semibold">{client.reference}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nom complet</p>
                  <p className="font-semibold">{client.prenom} {client.nom}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Adresse</p>
                  <p className="font-semibold">{client.adresse}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Commune</p>
                  <p className="font-semibold">{client.commune}</p>
                </div>
              </div>
            </div>
            
            {/* Rendez-vous actuel */}
            <AppointmentView 
              appointment={client.rdv}
              onModify={() => setShowModification(true)}
            />
            
            {/* Section modification */}
            {showModification && (
              <TimeSlotSelector
                availableSlots={availableSlots}
                onSelect={handleModification}
                onCancel={() => setShowModification(false)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientDashboard;
