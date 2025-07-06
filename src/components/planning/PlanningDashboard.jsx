import React, { useState } from 'react';
import { Calendar, Clock, BarChart3, Upload, Edit3 } from 'lucide-react';
import Header from '../common/Header';
import ExcelUpload from './ExcelUpload';
import ManualEntry from './ManualEntry';
import AppointmentsList from './AppointmentsList';

const PlanningDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [appointments, setAppointments] = useState([
    { id: 1, reference: 'CLI001', nom: 'Dupont', prenom: 'Jean', adresse: '12 rue de la Paix', commune: 'Paris', rdv: { date: '2025-06-20', creneau: 'matin', statut: 'planifie' } },
    { id: 2, reference: 'CLI002', nom: 'Martin', prenom: 'Marie', adresse: '34 avenue Victor Hugo', commune: 'Lyon', rdv: { date: '2025-06-22', creneau: 'apres-midi', statut: 'planifie' } }
  ]);
  
  const handleNewAppointment = (newAppointment) => {
    setAppointments([...appointments, { 
      id: appointments.length + 1, 
      ...newAppointment,
      rdv: {
        date: newAppointment.date,
        creneau: newAppointment.creneau,
        statut: 'planifie'
      }
    }]);
  };
  
  return (
    <>
      <Header userType="planning" onLogout={onLogout} />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Navigation tabs */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="flex flex-wrap border-b">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-6 py-3 font-medium transition ${
                  activeTab === 'dashboard'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <BarChart3 className="w-5 h-5 inline mr-2" />
                Tableau de bord
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`px-6 py-3 font-medium transition ${
                  activeTab === 'appointments'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Calendar className="w-5 h-5 inline mr-2" />
                Rendez-vous
              </button>
              <button
                onClick={() => setActiveTab('import')}
                className={`px-6 py-3 font-medium transition ${
                  activeTab === 'import'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Upload className="w-5 h-5 inline mr-2" />
                Import Excel
              </button>
            </div>
          </div>
          
          {/* Contenu selon l'onglet actif */}
          {activeTab === 'dashboard' && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Total RDV</h3>
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{appointments.length}</p>
                <p className="text-sm text-gray-600 mt-2">Rendez-vous planifiés</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Aujourd'hui</h3>
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600 mt-2">RDV du jour</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Modifications</h3>
                  <Edit3 className="w-8 h-8 text-orange-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600 mt-2">RDV modifiés</p>
              </div>
            </div>
          )}
          
          {activeTab === 'appointments' && (
            <AppointmentsList 
              appointments={appointments}
              onNewAppointment={handleNewAppointment}
            />
          )}
          
          {activeTab === 'import' && (
            <ExcelUpload onImport={(data) => console.log('Import data:', data)} />
          )}
        </div>
      </div>
    </>
  );
};

export default PlanningDashboard;